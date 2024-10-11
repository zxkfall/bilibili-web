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
import {Button, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import * as React from "react";

const SubMenu = () => {
    return (<Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        pt: 2,
        px: 3,
    }}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2
        }}>
            {[{icon: <Cyclone/>, value: '动态'}, {icon: <Whatshot/>, value: '热门'}]
                .map((item, index) =>
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
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
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
        }}>
            {['番剧', '电影', '国创', '电视剧', '综艺', '纪录片', '动画', '游戏', '鬼畜',
                '音乐', '舞蹈', '影视', '娱乐', '知识', '科技', '资讯', '美食', '更多']
                .map((item, index) =>
                    <Button key={index} variant="text" sx={{color: 'text.primary'}}>{item}</Button>
                )
            }
        </Box>
        <Divider orientation="vertical" flexItem sx={{mx: 2}}/>
        <Box sx={{
            display: 'grid',
            justifyItems: 'start',
        }}>
            {[{icon: <TextSnippet/>, value: '专栏'}, {icon: <Videocam/>, value: '直播'},
                {icon: <Forum/>, value: '社区中心'}, {icon: <SentimentSatisfied/>, value: '课堂'},
                {icon: <Flag/>, value: '活动'}, {icon: <LibraryMusic/>, value: '新歌热榜'}]
                .map((item, index) =>
                    <Button key={index} variant="text"
                            sx={{
                                color: 'text.primary',
                                gridColumn: `${(index % 3) + 1} / ${(index % 3) + 2}`,
                                gridRow: `${Math.ceil((index + 1) / 3)} / ${Math.ceil((index + 1) / 3) + 1}`,
                                textWrap: 'nowrap',
                                flexWrap: 'nowrap',
                                width: 'max-content',
                            }}
                            startIcon={item.icon}

                    >{item.value}</Button>
                )}
        </Box>
    </Box>);
}

export default SubMenu;
