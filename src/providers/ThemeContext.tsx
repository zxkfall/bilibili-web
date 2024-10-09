import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {createTheme, PaletteMode, Theme, ThemeProvider} from "@mui/material/styles";
import getBlogTheme from "@/components/theme/getBlogTheme";

export interface ThemeContextProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    mode: PaletteMode;
    setMode: (mode: PaletteMode) => void;
    themeType?: string;
    setThemeType: (themeType: string) => void;
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

const CustomerThemeProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [mode, setMode] = useState<PaletteMode>('light');
    const [themeType, setThemeType] = useState<string | undefined>("custom");

    const customTheme = createTheme(getBlogTheme(mode));
    const defaultTheme = createTheme({palette: {mode}});

    const [theme, setTheme] = useState<Theme>(customTheme);

    useEffect(() => {
        const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
        if (savedMode) {
            setMode(savedMode);
        } else {
            const systemPrefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)',
            ).matches;
            setMode(systemPrefersDark ? 'dark' : 'light');
        }
    }, []);

    useEffect(() => {
        console.log('mode', mode)
        if (themeType === "custom") {
            setTheme(customTheme);
        } else {
            setTheme(defaultTheme);
        }
    }, [mode, themeType]);

    return (
        <ThemeContext.Provider value={{
            theme: theme,
            setTheme: setTheme,
            mode: mode,
            setMode: setMode,
            themeType: themeType,
            setThemeType: setThemeType
        }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export const useCustomTheme = () => useContext(ThemeContext);

export default CustomerThemeProvider;

