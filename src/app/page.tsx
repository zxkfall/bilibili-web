"use client";
import {useEffect} from "react";

export default function Home() {

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                });
        }
    }, []);


    return (
        <video controls={true} autoPlay={true} src={'/api/video-segment'} preload={'auto'}/>
    );
}

