import {styled} from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ToggleColorMode from "@/components/ToggleColorMode";
import React, {useEffect, useRef, useState} from "react";
import {useCustomTheme} from "@/providers/ThemeContext";
import CardMedia from "@mui/material/CardMedia";
import Sitemark from "@/components/icons/SitemarkIcon";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import {Search} from "@/components/SelfMainContent";
import HoverPopup from "@/components/HoverPopup";
import {Typography} from "@mui/material";
import {Cloud, CommentBank, Star, Tv} from "@mui/icons-material";
import StickySubMenu from "@/components/StickySubMenu";

export const StyledAppBar = styled(AppBar)(({theme}) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderBottom: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    backgroundImage: 'none',
    zIndex: theme.zIndex.drawer + 1,
    flex: '0 0 auto',
}));

const Header = () => {
    const menuItems = ["番剧", "直播", "游戏中心", "会员购", "漫画", "赛事"];

    const [open, setOpen] = useState(false);

    const {themeType, setThemeType, mode, setMode, theme} = useCustomTheme();
    const themeRef = React.useRef(theme);
    const headerRef = React.useRef<HTMLDivElement>(null);
    const [showStickySubMenu, setShowStickySubMenu] = useState(false);
    const [showFixedHeader, setShowFixedHeader] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const toggleColorMode = () => {
        const newMode = mode === 'dark' ? 'light' : 'dark';
        setMode(newMode);
        localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage

    };
    const handleChange = (event: SelectChangeEvent<"custom" | "material">) => {
        setThemeType(event.target.value);
    };

    const changeHeaderStyle = () => {
        const headerElement = headerRef.current;
        if (headerElement) {
            setShowFixedHeader(window.scrollY > headerElement.clientHeight);
        }

        const mySubMenu = document.getElementById('mySubMenuId');
        if (mySubMenu) {
            setShowStickySubMenu(window.scrollY > (mySubMenu.clientHeight + mySubMenu.offsetHeight + 128));
        }
    }

    useEffect(() => {
        themeRef.current = theme;
        changeHeaderStyle();
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            changeHeaderStyle()
        };

        const handleResize = () => {
            if (window.innerWidth >= themeRef.current.breakpoints.values.md) {
                setOpen(false);
            }
        }

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <StyledAppBar ref={headerRef} sx={showFixedHeader ? {
                position: 'fixed',
                backgroundColor: theme.palette.background.paper,
            } : {
                position: 'absolute',
                backgroundColor: 'transparent',
                borderBottom: 'none',
                backdropFilter: 'none',
            }}>
                <Toolbar
                    variant="dense"
                    disableGutters
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        p: '8px 12px',
                    }}
                >
                    <Button
                        variant="text"
                        size="small"
                        aria-label="Back to Index"
                        component="a"
                        href="/"
                        sx={{display: {sm: 'flex'}}}
                    >
                        <Sitemark/>
                    </Button>
                    <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center', px: 0}}>
                        <Box sx={{display: {xs: 'none', md: 'flex', minWidth: 'fit-content'}}}>
                            {menuItems.map((item, index) => (
                                <Button key={index} variant="text" color="info" size="small"
                                        sx={{px: 1, minWidth: 'fit-content'}}>
                                    {item}
                                </Button>
                            ))}
                        </Box>
                        <Search/>
                    </Box>
                    <Box sx={{display: 'flex', gap: 1, alignItems: 'center', ml: 1}}>
                        <HoverPopup popupContent={<Box
                            sx={{color: theme.palette.text.primary,}}
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
                        </Box>}>
                            <Box
                                sx={{
                                    display: {xs: 'none', md: 'flex'},
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'primary.main',
                                    color: 'primary.contrastText',
                                    borderRadius: '50%',
                                    width: 32,
                                    height: 32,
                                    lineHeight: 1,
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    },
                                }}
                            >
                                Sign in
                            </Box>
                        </HoverPopup>
                        <FormControl variant="outlined" sx={{minWidth: {lg: 180, md: 160}}}>
                            <Select
                                size="small"
                                labelId="theme-select-label"
                                id="theme-select"
                                value={themeType === 'custom' ? 'custom' : 'material'}
                                onChange={handleChange}
                                label="Design Language"
                                variant="outlined"
                                sx={{
                                    backgroundColor: 'transparent', ...(showFixedHeader ? {} : {
                                        border: 'none',
                                        boxShadow: 'none',
                                    })
                                }}
                            >
                                <MenuItem value="custom">Custom Theme</MenuItem>
                                <MenuItem value="material">Material Design 2</MenuItem>
                            </Select>
                        </FormControl>
                        <ToggleColorMode
                            data-screenshot="toggle-mode"
                            mode={mode}
                            toggleColorMode={toggleColorMode}
                            sx={{backgroundColor: 'transparent', ...(showFixedHeader ? {} : {border: 'none'})}}
                        />
                        <Box sx={{display: {sm: 'flex', md: 'none'}}}>
                            <IconButton aria-label="Menu button" onClick={toggleDrawer(!open)} size="small"
                                        sx={{backgroundColor: 'transparent'}}>
                                <MenuIcon/>
                            </IconButton>
                            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
                                <Box sx={{p: 2, backgroundColor: 'background.default', mt: 7}}>
                                    {menuItems.map((item, index) => (
                                        <MenuItem key={index}>{item}</MenuItem>
                                    ))}
                                    <MenuItem>
                                        <Button color="primary" variant="contained" fullWidth>
                                            Sign up
                                        </Button>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button color="primary" variant="outlined" fullWidth>
                                            Sign in
                                        </Button>
                                    </MenuItem>
                                </Box>
                            </Drawer>
                        </Box>
                    </Box>
                </Toolbar>
            </StyledAppBar>
            {showStickySubMenu && <StickySubMenu/>}
            {/*<StickySubMenu/>*/}
            <Box>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    image={"https://picsum.photos/800/450?random=1"}
                    aspect-ratio={"16 / 9"}
                    sx={{
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        height: '192px',
                        objectFit: 'cover',
                    }}
                />
            </Box>
        </>
    )
}

export default Header;