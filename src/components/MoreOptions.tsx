import React from 'react';
import styles from './MoreOptions.module.css';
import Box from "@mui/material/Box";
import {Button, SxProps, Typography} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";
import {Theme} from "@mui/material/styles";
import {grey} from "@mui/material/colors";

const MoreOptions = ({text, items, sx}: {
    text: string,
    items: { url: string, value: string }[],
    sx?: SxProps<Theme>,
}) => {
    return (
        <Button component="div" variant="text" sx={{
            color: 'text.primary', cursor: 'default', ...sx,
            '&:active': {
                backgroundColor: grey[100],
            },
        }}
                className={styles.container}>
            <Box className={styles.box1}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography>
                        {text}
                    </Typography>
                    <KeyboardArrowDown fontSize={"small"} className={styles.arrowIcon}/>
                </Box>
            </Box>
            <Box className={styles.box2} sx={{}}>
                <Box className={styles.popUp} sx={{
                    borderRadius: 1,
                    border: '1px solid #ddd',
                    backgroundColor: 'white',
                    mt: 1,
                    p: 1,
                    gap: 1,
                }}>{items.map((item, index) =>
                    <Button key={index} href={item.url} target="_blank" variant="text"
                            sx={{color: 'text.primary', p: 0}}>{item.value}</Button>
                )
                }</Box>
            </Box>
        </Button>
    );
};

export default MoreOptions;