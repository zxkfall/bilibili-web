import React, {useEffect, useRef} from 'react';
import Box from "@mui/material/Box";
import Header from "@/components/Header";
import SubMenu from "@/components/SubMenu";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Footer from "@/components/Footer";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import Hls from "hls.js";
import * as dashjs from "dashjs";

const CustomCategoryPageContainer = ({category}: { category: string }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        // const videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
        const videoSrc = 'http://localhost:3000/output.m3u8';
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(videoRef.current!);
        }
            // HLS.js is not supported on platforms that do not have Media Source
            // Extensions (MSE) enabled.
            //
            // When the browser has built-in HLS support (check using `canPlayType`),
            // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
            // element through the `src` property. This is using the built-in support
        // of the plain video element, without using HLS.js.
        else if (videoRef.current!.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current!.src = videoSrc;
        }
    }, [])

    const dashVideoRef = useRef<HTMLVideoElement | null>(null);
    useEffect(() => {
        // const url = "https://dash.akamaized.net/envivio/Envivio-dash2/manifest.mpd";
        const url = "http://localhost:3000/output-dash.mpd";
        const player = dashjs.MediaPlayer().create();

        player.initialize(dashVideoRef.current as HTMLMediaElement, url, true);
        // const version = player.getVersion();
        // document.getElementById('version-output').innerText = `Version ${version}`;
    }, []);

    return (
        <Box sx={{height: '100dvh', display: 'flex', flexDirection: 'column'}}>
            <CssBaseline enableColorScheme/>
            <Header/>
            <SubMenu urlTarget={'_self'}/>
            <Box sx={{flex: '1 1', overflow: 'visible'}}>
                <Container
                    maxWidth="xl"
                    component="main"
                    sx={{display: 'flex', flexDirection: 'column', mb: 16, mt: 3, gap: 4}}
                >
                    This is {category} page, show some content
                    <video src={'example.mp4'} controls={true}/>
                    <Card>
                        <CardMedia component={'video'} src={'example.mp4'} controls/>
                    </Card>
                    <video controls src={'output.m3u8'}>
                        {/*<source src={'output.m3u8'} type="application/x-mpegURL"/>*/}
                    </video>
                    <video controls>
                        <source src={"my_video_manifest.mpd"}/>
                        <source src={"video_160x90_250k.webm"}/>
                        <source src={"video_320x180_500k.webm"}/>
                        <source src={"video_640x360_750k.webm"}/>
                        <source src={"video_640x360_1000k.webm"}/>
                        <source src={"video_1280x720_1500k.webm"}/>
                    </video>
                    <video controls>
                        <source src={"output-dash.mpd"}/>
                    </video>
                    <video ref={videoRef} controls/>

                    <video ref={dashVideoRef} controls>
                    </video>
                </Container>
            </Box>
            <Footer/>
        </Box>
    );
};

export default CustomCategoryPageContainer;