import React from 'react';
import Box from "@mui/material/Box";
import {StyledAppBar} from "@/components/Header";
import {Cyclone, KeyboardArrowDown, Whatshot} from "@mui/icons-material";
import {Button, Container, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import styles from "@/components/StickySubMenu.module.css";

const StickySubMenu = () => {

    const allCategories = [
        {url: 'anime', value: '番剧'},
        {url: 'movie', value: '电影'},
        {url: 'domestic-animation', value: '国创'},
        {url: 'tv-drama', value: '电视剧'},
        {url: 'variety-show', value: '综艺'},
        {url: 'documentary', value: '纪录片'},
        {url: 'animation', value: '动画'},
        {url: 'game', value: '游戏'},
        {url: 'funny', value: '鬼畜'},
        {url: 'music', value: '音乐'},
        {url: 'dance', value: '舞蹈'},
        {url: 'film-review', value: '影视'},
        {url: 'entertainment', value: '娱乐'},
        {url: 'knowledge', value: '知识'},
        {url: 'technology', value: '科技'},
        {url: 'news', value: '资讯'},
        {url: 'food', value: '美食'},
        {url: 'life', value: '生活'},
        {url: 'cars', value: '汽车'},
        {url: 'fashion', value: '时尚'},
        {url: 'sports', value: '运动'},
        {url: 'animals', value: '动物圈'},
        {url: 'vlog', value: 'VLOG'},
        {url: 'funny', value: '搞笑'},
        {url: 'single-player-games', value: '单机游戏'},
        {url: 'virtual-up', value: '虚拟UP主'},
        {url: 'love', value: '公益'},
        {url: 'open-class', value: '公开课'},
    ];

    return (
        <Box sx={{
            position: 'fixed',
            zIndex: 999,
            top: '52px',
            width: '100%',
        }}><StyledAppBar>
            <Container
                className={styles.container}
                id="mySubMenuId"
                maxWidth="xl"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: 3,
                    p: 1,
                    px: 3,
                    maxHeight: '52px',
                    overflow: 'hidden',
                    transition: 'max-height 0.5s ease',
                    '&:hover': {
                        maxHeight: '256px'
                    },
                }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2
                }}>
                    {[{icon: <Cyclone/>, value: '动态'}, {icon: <Whatshot/>, value: '热门'}]
                        .map((item, index) =>
                            <Button
                                key={index}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 0.5,
                                }}>
                                <Box sx={{
                                    border: 'none',
                                    color: grey[700],
                                }}>
                                    {item.icon}
                                </Box>
                                <Typography variant="caption" sx={{
                                    color: 'text.primary',
                                    textWrap: 'nowrap',
                                }}>{item.value}</Typography>
                            </Button>)}
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '0.8%',
                    rowGap: 1,
                    mt: 1,
                }}>
                    {allCategories.map((item, index) =>
                        <Button key={index} variant="text"
                                size="small"
                                href={item.url}
                                target={'_blank'}
                                sx={{
                                    backgroundColor: grey[300],
                                    flexBasis: '7.6%',
                                    pt: 0.25,
                                    pb: 0.25,
                                    px: 1,
                                    borderRadius: 0.5,
                                    fontSize: '14px',
                                    height: 'fit-content',
                                    textWrap: 'nowrap',
                                    '&:hover': {
                                        backgroundColor: grey[500],
                                    },
                                }}>{item.value}</Button>
                    )
                    }
                </Box>

                <KeyboardArrowDown fontSize={"small"} className={styles.arrowIcon} sx={{
                    color: 'text.primary',
                    mt: 1,
                    borderRadius: 0.5,
                    '&:hover': {
                        backgroundColor: grey[300],
                    },
                }}/>
            </Container>
        </StyledAppBar>
        </Box>
    );
};

export default StickySubMenu;