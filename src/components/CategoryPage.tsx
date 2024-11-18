"use client";
import React from 'react';
import CustomerThemeProvider from "@/providers/ThemeContext";
import CustomCategoryPageContainer from "@/components/CustomCategoryPageContainer";

const CategoryPage = ({category}: { category: string }) => {
    return (
        <CustomerThemeProvider>
            <CustomCategoryPageContainer category={category}/>
        </CustomerThemeProvider>
    );
};

export default CategoryPage;