import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from "@mui/material/CssBaseline";
import Header from "@/components/Header";
import Container from "@mui/material/Container";
import SelfMainContent from "@/components/SelfMainContent";
import Latest from "@/components/Latest";
import Footer from "@/components/Footer";
import {CardData} from "@/app/api/cards/route";
import {ArticleInfo} from "@/app/api/articles/latested/route";

interface IndexPageContainerProps {
    cardData: CardData[];
    latestData: ArticleInfo[];
}

export default function IndexPageContainer({cardData, latestData}: IndexPageContainerProps) {

    return (
        <Box sx={{height: '100dvh', display: 'flex', flexDirection: 'column'}}>
            <Header/>
            <Box sx={{flex: '1 1', overflow: 'visible'}}>
                <CssBaseline enableColorScheme/>
                <Container
                    maxWidth="lg"
                    component="main"
                    sx={{display: 'flex', flexDirection: 'column', mb: 16, mt: 4, gap: 4}}
                >
                    <SelfMainContent cardData={cardData}/>
                    <Latest articleInfo={latestData}/>
                </Container>
            </Box>
            <Footer/>
        </Box>
    );
}
