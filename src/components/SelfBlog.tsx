"use client";
import * as React from 'react';
import Container from '@mui/material/Container';
import Latest from "@/components/Latest";
import Footer from "@/components/Footer";
import SelfTheme from "@/components/SelfTheme";
import SelfMainContent from "@/components/SelfMainContent";
import {CardData} from "@/app/api/cards/route";
import {ArticleInfo} from "@/app/api/articles/latested/route";

interface SelfBlogProps {
    cardData: CardData[];
    latestData: ArticleInfo[];
}

const SelfBlog = ({cardData, latestData}: SelfBlogProps) => (
    <SelfTheme>
        <Container
            maxWidth="lg"
            component="main"
            sx={{display: 'flex', flexDirection: 'column', my: 16, gap: 4}}
        >
            <SelfMainContent cardData={cardData}/>
            <Latest articleInfo={latestData}/>
        </Container>
        <Footer/>
    </SelfTheme>
);

export default SelfBlog;
