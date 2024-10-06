"use client";
import React, {useEffect, useRef} from "react";

export const MSEVideoPlayer = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const chunkSize = 20 * 1024 * 1024;
    const videUrl = '/api/video-segment';
    let mediaSource: MediaSource | null = null;
    let videoElement: HTMLVideoElement | null = null;
    let sourceBuffer: SourceBuffer | undefined = undefined;
    let totalSize = 0;
    let isLoaded = false;

    const handleSourceOpen = async () => {
        const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
        if (!('MediaSource' in window) || !MediaSource.isTypeSupported(mimeCodec)) {
            console.error('Unsupported MIME type or codec: ', mimeCodec);
            return;
        }
        videoElement = videoRef.current;
        if (!videoElement) {
            console.error('Video element not found');
            return;
        }
        mediaSource = new MediaSource();
        videoElement.src = URL.createObjectURL(mediaSource);
        mediaSource.addEventListener('sourceopen', async () => {
            console.log('MediaSource opened');
            sourceBuffer = mediaSource?.addSourceBuffer(mimeCodec);

            await fetchVideoChunks(videUrl);
        });
    }


    const fetchVideoChunks = async (url: string) => {

        const chunk = await fetchChunk(url, 0, chunkSize*2 - 1);
        if (chunk) {
            if (!sourceBuffer?.updating) {
                console.log(videoElement?.error)
                sourceBuffer?.appendBuffer(chunk);
            } else {
                sourceBuffer?.addEventListener('updateend', () => {
                    sourceBuffer?.appendBuffer(chunk);
                });
            }
        }
        let loadedDataLength = chunkSize;

        let isProcessing = false;

        const loadChunks = async () => {
            console.log("loadChunks")
            if (isProcessing) return;
            isProcessing = true;
            try {
                const percent = videoElement?.currentTime / videoElement?.duration;
                const currentLocation = Math.floor(totalSize * percent);


                // loadedDataLength = totalSize % chunkSize === 0 ? totalSize : Math.floor(totalSize / chunkSize) * chunkSize;
                console.log("current", currentLocation, "loaded", loadedDataLength, loadedDataLength < currentLocation * 1.4)
                const current = Math.floor(currentLocation / chunkSize) * chunkSize;

                if (loadedDataLength < currentLocation * 1.4) {
                    console.log("remove before", loadedDataLength, currentLocation, loadedDataLength < currentLocation * 1.2);

                    const chunk = await fetchChunk(url, current, current + chunkSize - 1)
                    console.log("remove await", loadedDataLength, currentLocation, loadedDataLength < currentLocation * 1.2);

                    if (chunk) {
                        if (!sourceBuffer?.updating) {
                            console.log(videoElement?.error)
                            sourceBuffer?.appendBuffer(chunk);
                        } else {
                            sourceBuffer?.addEventListener('updateend', () => {
                                sourceBuffer?.appendBuffer(chunk);
                            }, {once: true});
                        }

                        const removedTime = Math.min(videoElement?.currentTime, sourceBuffer.buffered.end(0)) - 4;
                        const removedStartTime = sourceBuffer.buffered.start(0);
                        console.log("time", removedStartTime, removedTime)

                        if (!sourceBuffer?.updating) {

                            sourceBuffer?.remove(0, removedTime);
                        } else {
                            sourceBuffer?.addEventListener('updateend', () => {
                                sourceBuffer?.remove(0, removedTime);
                            }, {once: true});
                        }
                        loadedDataLength = current + chunkSize;
                        console.log("remove after loadedDataLength", loadedDataLength, currentLocation, loadedDataLength < currentLocation * 1.2);
                    }
                }

            } catch (e) {
                console.error(e);
            } finally {
                isProcessing = false;
            }
        };
        // videoElement?.addEventListener("timeupdate", loadChunks)
        // videoElement?.addEventListener("seeking", loadChunks)
    };


    const fetchChunk = async (url: string, start: number, end: number): Promise<ArrayBuffer | null> => {
        if (start >= totalSize && isLoaded) {
            return null;
        }

        const response = await fetch(url, {
            headers: {
                Range: `bytes=${start}-${end}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch video segment: ${response.statusText}`);
        }

        const contentRange = response.headers.get('Content-Range');
        totalSize = contentRange ? parseInt(contentRange.split('/')[1]) : 0;
        isLoaded = true;

        return await response.arrayBuffer();
    };

    useEffect(() => {
        handleSourceOpen().catch(console.error);
    }, []);

    const handleClick = () => {
        console.log("remove", sourceBuffer?.buffered.start(0), sourceBuffer?.buffered.end(0), sourceBuffer?.mode);
        sourceBuffer?.remove(3, videoElement?.currentTime);
    }

    // const handleAppend = async () => {
    //     const percent = videoElement?.currentTime / videoElement?.duration;
    //     const currentLocation = Math.floor(totalSize * percent);
    //     const current = Math.floor(currentLocation / chunkSize) * chunkSize;
    //     // console.log("append", sourceBuffer?.buffered.start(0), sourceBuffer?.buffered.end(0), videoElement?.error, current);
    //
    //     sourceBuffer?.remove(sourceBuffer?.buffered.start(0), sourceBuffer?.buffered.end(0));
    //
    //     const trunk = await fetchChunk(videUrl, 3*chunkSize, 6*chunkSize + chunkSize - 1);
    //     console.log(sourceBuffer?.mode)
    //     if (trunk) {
    //         sourceBuffer?.appendBuffer(trunk);
    //         sourceBuffer?.addEventListener('updateend', () => {
    //             // console.log('append', sourceBuffer?.buffered.start(0), sourceBuffer?.buffered.end(0), videoElement?.error, current);
    //         })
    //     }
    //     sourceBuffer?.addEventListener("error", (e) => {
    //         console.log("error", e)
    //     })
    // }

    const handleAppend = async () => {
        const trunk = await fetchChunk(videUrl, chunkSize*3, 6*chunkSize - 1);
        if (trunk) {
            sourceBuffer?.appendBuffer(trunk);
        }
        sourceBuffer?.appendWindowStart = 16;
    }


    return (<>
        <video ref={videoRef} controls width="600"/>
        <button onClick={handleClick}> remove</button>
        <button onClick={handleAppend}> append</button>
    </>);
};
