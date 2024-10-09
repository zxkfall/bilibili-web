import {styled} from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ToggleColorMode from "@/components/ToggleColorMode";
import * as React from "react";
import {useCustomTheme} from "@/providers/ThemeContext";

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

    const {themeType, setThemeType, mode, setMode} = useCustomTheme();
    const toggleColorMode = () => {
        const newMode = mode === 'dark' ? 'light' : 'dark';
        setMode(newMode);
        localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
    };

    const handleChange = (event: SelectChangeEvent<"custom" | "material">) => {
        setThemeType(event.target.value);
    };

    return (
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
                            value={themeType === 'custom' ? 'custom' : 'material'}
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
    )
}

export default Header;