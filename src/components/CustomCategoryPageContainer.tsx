import React from 'react';
import Box from "@mui/material/Box";
import Header from "@/components/Header";
import SubMenu from "@/components/SubMenu";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Footer from "@/components/Footer";

const CustomCategoryPageContainer = ({category}: { category: string }) => {
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
                    dsfasfawerfawsfwaefawefwaefwasef {category}
                </Container>
            </Box>
            <Footer/>
        </Box>
    );
};

export default CustomCategoryPageContainer;