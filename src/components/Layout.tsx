"use client"
import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Fab } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            const fab = document.getElementById('back-to-top');
            if (fab) {
                if (window.scrollY > 300) {
                    fab.style.display = 'block';
                } else {
                    fab.style.display = 'none';
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        我的主页
                    </Typography>
                    <Button color="inherit">登录</Button>
                    <Button color="inherit">注册</Button>
                </Toolbar>
            </AppBar>
            <Container sx={{ marginTop: 4 }}>{children}</Container>
            <Fab
                id="back-to-top"
                onClick={scrollToTop}
                color="primary"
                aria-label="回到顶部"
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    display: 'none',
                }}
            >
                <KeyboardArrowUp />
            </Fab>
        </>
    );
};

export default Layout;
