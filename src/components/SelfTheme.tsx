import * as React from 'react';
import {useEffect, useState} from 'react';
import {createTheme, PaletteMode, styled, ThemeProvider,} from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import getBlogTheme from "@/components/theme/getBlogTheme";
import ToggleColorMode from "@/components/ToggleColorMode";
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "@/components/AppAppBar";

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

interface TemplateFrameProps {
    children: React.ReactNode;
}

export default function SelfTheme({
                                      children,
                                  }: TemplateFrameProps) {


    const [mode, setMode] = useState<PaletteMode>('light');
    const [showCustomTheme, setShowCustomTheme] = useState(true);

    const blogTheme = createTheme(getBlogTheme(mode));
    const defaultTheme = createTheme({palette: {mode}});


    useEffect(() => {
        // Check if there is a preferred mode in localStorage
        const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
        if (savedMode) {
            setMode(savedMode);
        } else {
            // If no preference is found, it uses system preference
            const systemPrefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)',
            ).matches;
            setMode(systemPrefersDark ? 'dark' : 'light');
        }
    }, []);

    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };

    const toggleColorMode = () => {
        const newMode = mode === 'dark' ? 'light' : 'dark';
        setMode(newMode);
        localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
    };

    const handleChange = () => {
        console.log('toggle')
        toggleCustomTheme();
    };

    return (
        <ThemeProvider theme={blogTheme}>
            <Box sx={{height: '100dvh', display: 'flex', flexDirection: 'column'}}>
                <StyledAppBar>
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
                            aria-label="Back to templates"
                            startIcon={<ArrowBackRoundedIcon/>}
                            component="a"
                            href="/material-ui/getting-started/templates/"
                            sx={{display: {xs: 'none', sm: 'flex'}}}
                        >
                            Back to templates
                        </Button>
                        <IconButton
                            size="small"
                            aria-label="Back to templates"
                            component="a"
                            href="/material-ui/getting-started/templates/"
                            sx={{display: {xs: 'auto', sm: 'none'}}}
                        >
                            <ArrowBackRoundedIcon/>
                        </IconButton>
                        <Box sx={{display: 'flex', gap: 1}}>
                            <FormControl variant="outlined" sx={{minWidth: 180}}>
                                <Select
                                    size="small"
                                    labelId="theme-select-label"
                                    id="theme-select"
                                    value={showCustomTheme ? 'custom' : 'material'}
                                    onChange={handleChange}
                                    label="Design Language"
                                    variant="outlined"
                                >
                                    <MenuItem value="custom">Custom Theme</MenuItem>
                                    <MenuItem value="material">Material Design 2</MenuItem>
                                </Select>
                            </FormControl>
                            <ToggleColorMode
                                data-screenshot="toggle-mode"
                                mode={mode}
                                toggleColorMode={toggleColorMode}
                            />
                        </Box>
                    </Toolbar>
                </StyledAppBar>
                <Box sx={{flex: '1 1', overflow: 'auto'}}>

                    <ThemeProvider theme={showCustomTheme ? blogTheme : defaultTheme}>
                        <CssBaseline enableColorScheme/>

                        <AppAppBar/>
                        {children}
                    </ThemeProvider>

                </Box>
            </Box>
        </ThemeProvider>
    );
}
