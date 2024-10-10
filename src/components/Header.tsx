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
import React, {useEffect, useState} from "react";
import {useCustomTheme} from "@/providers/ThemeContext";
import CardMedia from "@mui/material/CardMedia";
import Sitemark from "@/components/icons/SitemarkIcon";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";

const StyledAppBar = styled(AppBar)(({theme}) => ({
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
    const [open, setOpen] = useState(false);

    const {themeType, setThemeType, mode, setMode, theme} = useCustomTheme();

    const themeRef = React.useRef(theme);
    const headerRef = React.useRef<HTMLDivElement>(null);

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
            if (window.scrollY > headerElement.clientHeight) {
                headerElement.style.position = 'fixed';
                headerElement.style.backgroundColor = 'transparent';
                headerElement.style.backdropFilter = 'blur(24px)';
            } else {
                headerElement.style.position = 'absolute';
                headerElement.style.backgroundColor = themeRef.current.palette.background.paper;
                headerElement.style.backdropFilter = 'none';
            }
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
            <StyledAppBar ref={headerRef}>
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
                        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                            <Button variant="text" color="info" size="small">
                                Features
                            </Button>
                            <Button variant="text" color="info" size="small">
                                Testimonials
                            </Button>
                            <Button variant="text" color="info" size="small">
                                Highlights
                            </Button>
                            <Button variant="text" color="info" size="small">
                                Pricing
                            </Button>
                            <Button variant="text" color="info" size="small" sx={{minWidth: 0}}>
                                FAQ
                            </Button>
                            <Button variant="text" color="info" size="small" sx={{minWidth: 0}}>
                                Blog
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                display: {xs: 'none', md: 'flex'},
                                gap: 1,
                                alignItems: 'center',
                            }}
                        >
                            <Button color="primary" variant="text" size="small">
                                Sign in
                            </Button>
                            <Button color="primary" variant="contained" size="small">
                                Sign up
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', gap: 1}}>
                        <FormControl variant="outlined" sx={{minWidth: {lg: 180, md: 160}}}>
                            <Select
                                size="small"
                                labelId="theme-select-label"
                                id="theme-select"
                                value={themeType === 'custom' ? 'custom' : 'material'}
                                onChange={handleChange}
                                label="Design Language"
                                variant="outlined"
                                sx={{backgroundColor: 'transparent'}}
                            >
                                <MenuItem value="custom">Custom Theme</MenuItem>
                                <MenuItem value="material">Material Design 2</MenuItem>
                            </Select>
                        </FormControl>
                        <ToggleColorMode
                            data-screenshot="toggle-mode"
                            mode={mode}
                            toggleColorMode={toggleColorMode}
                            sx={{backgroundColor: 'transparent'}}
                        />
                        <Box sx={{display: {sm: 'flex', md: 'none'}}}>
                            <IconButton aria-label="Menu button" onClick={toggleDrawer(!open)} size="small"
                                        sx={{backgroundColor: 'transparent'}}>
                                <MenuIcon/>
                            </IconButton>
                            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
                                <Box sx={{p: 2, backgroundColor: 'background.default', mt: 7}}>
                                    <MenuItem>Features</MenuItem>
                                    <MenuItem>Testimonials</MenuItem>
                                    <MenuItem>Highlights</MenuItem>
                                    <MenuItem>Pricing</MenuItem>
                                    <MenuItem>FAQ</MenuItem>
                                    <MenuItem>Blog</MenuItem>
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
            <Box>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    image={"https://picsum.photos/800/450?random=1"}
                    aspect-ratio={"16 / 9"}
                    sx={{
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}
                />
            </Box>
        </>
    )
}

export default Header;