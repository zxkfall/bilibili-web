import Box from "@mui/material/Box";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import * as React from "react";

const Author = ({authors}: { authors: { name: string; avatar: string }[] }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4px',
        }}
    >
        <Box
            sx={{display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center'}}
        >
            <AvatarGroup max={3}>
                {authors.map((author, index) => (
                    <Avatar
                        key={index}
                        alt={author.name}
                        src={author.avatar}
                        sx={{width: 16, height: 16}}
                    />
                ))}
            </AvatarGroup>
            <Typography variant="caption">
                {authors.map((author) => author.name).join(', ')}
            </Typography>
        </Box>
        <Typography variant="caption">July 14, 2021</Typography>
    </Box>
);

export default Author;