import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from "@mui/material/CssBaseline";
import Header from "@/components/Header";
import Container from "@mui/material/Container";
import SelfMainContent from "@/components/SelfMainContent";
import Footer from "@/components/Footer";
import {CardData} from "@/app/api/cards/route";
import {ArticleInfo} from "@/app/api/articles/latested/route";
import SubMenu from "@/components/SubMenu";
import {CarouselData} from "@/app/api/carousel/route";
import {useEffect} from "react";

export default function IndexPageContainer({cardData, carouselData}: {
    cardData: CardData[];
    latestData: ArticleInfo[];
    carouselData: CarouselData[];
}) {

    useEffect(() => {
        scrollTo(0, 0);
    }, []);

    return (
        <Box sx={{height: '100dvh', display: 'flex', flexDirection: 'column'}}>
            <Header/>
            <SubMenu/>
            <Box sx={{flex: '1 1', overflow: 'visible'}}>
                <CssBaseline enableColorScheme/>
                <Container
                    maxWidth="xl"
                    component="main"
                    sx={{display: 'flex', flexDirection: 'column', mb: 16, mt: 3, gap: 4}}
                >
                    <SelfMainContent cardData={cardData} carouselData={carouselData}/>
                </Container>
            </Box>
            <Footer/>
        </Box>
    );
}
