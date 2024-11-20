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
        <Box component="button" sx={{
            cursor: 'default',
            ...sx,
        }}
             className={styles.container + ' appCustomButton'}>
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
                    <Button className={'appCustomButton'} key={index} href={item.url} target="_blank"
                            variant="text">{item.value}</Button>
                )
                }</Box>
            </Box>
        </Box>
    );
};

export default MoreOptions;