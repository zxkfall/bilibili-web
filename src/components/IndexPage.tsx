"use client";
import * as React from 'react';
import IndexPageContainer from "@/components/IndexPageContainer";
import {CardData} from "@/app/api/cards/route";
import {ArticleInfo} from "@/app/api/articles/latested/route";
import CustomerThemeProvider from "@/providers/ThemeContext";

interface SelfBlogProps {
    cardData: CardData[];
    latestData: ArticleInfo[];
}

const IndexPage = ({cardData, latestData}: SelfBlogProps) => (
    <CustomerThemeProvider>
        <IndexPageContainer cardData={cardData} latestData={latestData}/>
    </CustomerThemeProvider>
);

export default IndexPage;
