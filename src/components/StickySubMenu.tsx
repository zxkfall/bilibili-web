import React from 'react';
import Box from "@mui/material/Box";
import {StyledAppBar} from "@/components/Header";
import {Cyclone, KeyboardArrowDown, Whatshot} from "@mui/icons-material";
import {Button, Container, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import styles from "@/components/StickySubMenu.module.css";

const StickySubMenu = () => {
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
                    {['番剧', '电影', '国创', '电视剧', '综艺', '纪录片', '动画', '游戏', '鬼畜',
                        '专栏', '活动', '社区中心', '娱乐', '知识', '科技', '资讯', '美食', '生活',
                        '动物圈', '虚拟UP主', '汽车', '直播', '课堂', '新歌热榜', '搞笑', '公开课',
                        '运动', '单机游戏', '音乐', '舞蹈', '影视', 'VLOG', '综艺', '时尚']
                        .map((item, index) =>
                            <Button key={index} variant="text"
                                    size="small"
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
                                    }}>{item}</Button>
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