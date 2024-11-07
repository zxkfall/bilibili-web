"use client";
import * as React from 'react';
import IndexPageContainer from "@/components/IndexPageContainer";
import {CardData} from "@/app/api/cards/route";
import {ArticleInfo} from "@/app/api/articles/latested/route";
import CustomerThemeProvider from "@/providers/ThemeContext";
import {CarouselData} from "@/app/api/carousel/route";

interface SelfBlogProps {
    cardData: CardData[];
    latestData: ArticleInfo[];
    carouselData: CarouselData[];
}

const IndexPage = ({cardData, latestData, carouselData}: SelfBlogProps) => (
    <CustomerThemeProvider>
        <IndexPageContainer cardData={cardData} latestData={latestData} carouselData={carouselData}/>
    </CustomerThemeProvider>
);

export default IndexPage;
