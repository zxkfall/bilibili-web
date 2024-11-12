import React, {ReactNode} from 'react';
import styles from './HoverPopup.module.css';
import Box from "@mui/material/Box";

const HoverPopup = ({children, popupContent}: { children: ReactNode, popupContent: ReactNode }) => {
    return (
        <Box className={styles.container}>
            <Box className={styles.triggerButton}>
                {children}
            </Box>
            <Box className={styles.popup}>
                {popupContent}
            </Box>
        </Box>
    );
};

export default HoverPopup;