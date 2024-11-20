import Box from "@mui/material/Box";
import {
    Cyclone,
    Flag,
    Forum,
    LibraryMusic,
    SentimentSatisfied,
    TextSnippet,
    Videocam,
    Whatshot
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {Button, Container, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import * as React from "react";
import MoreOptions from "@/components/MoreOptions";
import styles from './SubMenu.module.css';

const SubMenu = ({urlTarget = '_blank'}: { urlTarget?: string }) => {

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

    return (<Container
        id="mySubMenuId"
        maxWidth="xl"
        sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: {
                xs: 0.5, sm: 1, md: 1, lg: 3
            },
            pt: 2,
            px: 3,
        }}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: {
                xs: 0.5, sm: 0.5, md: 2, lg: 2
            }
        }}>
            {[{icon: <Cyclone/>, value: '动态'}, {icon: <Whatshot/>, value: '热门'}]
                .map((item, index) =>
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: {
                                sx: 0.5,
                                md: 1,
                            },
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}>
                        <IconButton sx={{
                            borderRadius: '50%',
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            }
                        }}>
                            {item.icon}
                        </IconButton>
                        <Typography variant="caption">{item.value}</Typography>
                    </Box>)}
        </Box>
        <Box className={styles.itemContainer} sx={{
            display: {
                xs: 'flex',
                sm: 'grid',
                md: 'grid'
            },
            flexWrap: 'wrap',
            justifyContent: 'start',
        }}>
            {allCategories.map((item, index) =>
                <Button className={styles.itemSize + ' appCustomButton'} href={item.url} target={urlTarget} key={index}
                        variant="text">{item.value}</Button>
            )}
            <Button component="div" className={styles.hideInLarge + ' appCustomButton'} sx={{
                textAlign: 'center',
                cursor: 'default',
            }}>
                <MoreOptions urlTarget={urlTarget} text={'更多'} items={allCategories} sx={{cursor: 'default'}}/>
            </Button>
        </Box>
        <Divider orientation="vertical" flexItem sx={{xs: 0.2, mx: {sm: 0.5, md: 1, lg: 2}}}/>
        <Box sx={{
            display: {
                xs: 'flex',
                sm: 'grid',
                md: 'grid'
            },
            // flexDirection:'column',
            justifyItems: 'start',
            flexWrap: 'wrap',
            gap: '10px',
        }}>
            {[{icon: <TextSnippet className={styles.hideInSmall}/>, value: '专栏'}, {
                icon: <Videocam className={styles.hideInSmall}/>, value: '直播'
            },
                {icon: <Forum className={styles.hideInSmall}/>, value: '社区中心'}, {
                    icon: <SentimentSatisfied className={styles.hideInSmall}/>, value: '课堂'
                },
                {icon: <Flag className={styles.hideInSmall}/>, value: '活动'}, {
                    icon: <LibraryMusic className={styles.hideInSmall}/>, value: '新歌热榜'
                }]
                .map((item, index) =>
                    <Button key={index} className={'appCustomButton'} variant="text"
                            sx={{
                                gridColumn: `${(index % 3) + 1} / ${(index % 3) + 2}`,
                                gridRow: `${Math.ceil((index + 1) / 3)} / ${Math.ceil((index + 1) / 3) + 1}`,
                                flexWrap: 'nowrap',
                                width: {
                                    xs: 'fit-content', sm: 'fit-content', md: 'max-content', lg: 'max-content'
                                },
                                px: {
                                    xs: 0.5, sm: 0.5, md: 1, lg: 1
                                },
                                '&:hover': {
                                    color: 'turquoise',
                                    backgroundColor: 'transparent',
                                }
                            }}
                            startIcon={item.icon}

                    >{item.value}</Button>
                )}
        </Box>
    </Container>);
}

export default SubMenu;
