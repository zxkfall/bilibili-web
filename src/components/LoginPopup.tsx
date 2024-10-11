import {Theme} from "@mui/material/styles";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {Cloud, CommentBank, Star, Tv} from "@mui/icons-material";

const LoginPopup = ({theme}: { theme: Theme }) => {
    const [loginOpen, setLoginOpen] = useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const boxRef = React.useRef<HTMLDivElement>(null);
    return (
        <>
            <Button
                sx={{
                    display: {xs: 'none', md: 'flex'},
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    minWidth: 32,
                    minHeight: 32,
                    padding: 0,
                    lineHeight: 1,
                    '&:hover': {
                        backgroundColor: 'primary.dark',
                    },
                }}
                ref={buttonRef}
                onMouseOver={() => {
                    setLoginOpen(true);
                }}
                onMouseOut={() => {
                    setLoginOpen(false);
                }}
            >
                Sign in
            </Button>
            <Box
                ref={boxRef}
                sx={{
                    display: 'flex',
                    visibility: loginOpen ? 'visible' : 'hidden',
                    position: 'fixed',
                    left: buttonRef.current && boxRef.current ? buttonRef.current.getBoundingClientRect()?.left + buttonRef.current?.clientWidth / 2 - boxRef.current.clientWidth / 2 : 0,
                    top: buttonRef.current ? buttonRef.current.clientHeight + buttonRef.current.getBoundingClientRect()?.top : 52,
                    height: 'fit-content',
                    width: 'fit-content',
                    color: theme.palette.text.primary,
                    transition: 'visibility 0s, opacity 0.5s linear',
                }}
                onMouseOver={() => {
                    setLoginOpen(true);
                }}
                onMouseOut={() => {
                    setLoginOpen(false);
                }}
            >
                <Box sx={{
                    display: 'flex',
                    mt: 1,
                    p: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 1,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: 1,
                }}>
                    <Typography variant="caption">登陆后你可以</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: 3}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                            <Box sx={{textWrap: 'nowrap'}}><Star sx={{mr: 1}}/> 收藏</Box>
                            <Box sx={{textWrap: 'nowrap'}}><Tv sx={{mr: 1}}/>高清视频</Box>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                            <Box sx={{textWrap: 'nowrap'}}><Cloud sx={{mr: 1}}/>多端同步</Box>
                            <Box sx={{textWrap: 'nowrap'}}><CommentBank sx={{mr: 1}}/>评论</Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            gap: 1,
                            alignItems: 'center',
                            backgroundColor: 'background.default',
                            display: 'flex',
                            flexDirection: 'column',
                            mt: 1,
                        }}
                    >
                        <Button color="primary" variant="contained" size="small" fullWidth>
                            Sign in
                        </Button>
                        <Box>
                            <Typography variant="caption" color="primary">没有账号？</Typography>
                            <Button color="primary" variant="text" size="small">
                                Click me to Sign up
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box></>);
}

export default LoginPopup;