"use client";
import React, {useEffect, useRef} from "react";

export const MSEVideoPlayer = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const chunkSize = 1024 * 1024;
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
            sourceBuffer = mediaSource?.addSourceBuffer(mimeCodec);

            await fetchVideoChunks(videUrl);
        });
    }


    const fetchVideoChunks = async (url: string) => {
        let start = 0;
        let isEnded = false;
        while (!isEnded) {
            const chunk = await fetchChunk(url, start, start + chunkSize - 1)
            console.log("chunks--------", chunk, start, totalSize);
            if (chunk) {
                if (!sourceBuffer?.updating) {
                    sourceBuffer?.appendBuffer(chunk);
                } else {
                    sourceBuffer?.addEventListener('updateend', () => {
                        sourceBuffer?.appendBuffer(chunk);
                    });
                }
                start += chunkSize;
            } else {
                console.log('is end')
                isEnded = true;
                sourceBuffer?.addEventListener('updateend', () => {
                    console.log("endOfStream");
                    mediaSource?.endOfStream();
                });
            }
        }
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

    return <video ref={videoRef} controls width="600"/>;
};
