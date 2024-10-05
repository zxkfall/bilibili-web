"use client";
import React, {useEffect, useRef} from "react";

export const MSEVideoPlayer = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const fetchVideoSegment = async (url: string): Promise<ArrayBuffer> => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch video segment: ${response.statusText}`);
        }
        return response.arrayBuffer();
    };

    const fetchVideo = async () => {
        const videoElement = videoRef.current;

        if (!videoElement) {
            console.error("Video element not found");
            return;
        }

        // const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
        // const mimeCodec = 'video/mp4; codecs="avc1.640032, mp4a.40.2"';
        const mimeCodec = 'video/mp4; codecs="avc1.42C01E, mp4a.40.2"';
        if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
            const mediaSource = new MediaSource();
            mediaSource.addEventListener('sourceopen', async () => {
                const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
                const data = await fetchVideoSegment('/api/video-segment');
                // 获取视频片段
                sourceBuffer.appendBuffer(data);
                // 当视频片段缓冲结束时，关闭 MediaSource
                sourceBuffer.addEventListener('updateend', async () => {
                    try {
                        console.log(mediaSource.readyState)
                        mediaSource.endOfStream();
                        // await videoElement.play();
                    } catch (e) {
                        console.log('error', e);
                    }
                });
            });

            videoElement.src = URL.createObjectURL(mediaSource);

        } else {
            console.error('MSE is not supported in this browser');
        }
    }

    useEffect(() => {
        fetchVideo().catch(console.error);
    }, []);

    return <video ref={videoRef} controls width="600"/>;
};
