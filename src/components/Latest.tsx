import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import {ArticleInfo} from "@/app/api/articles/latested/route";

const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

const TitleTypography = styled(Typography)(({theme}) => ({
    position: 'relative',
    textDecoration: 'none',
    '&:hover': {cursor: 'pointer'},
    '& .arrow': {
        visibility: 'hidden',
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
    },
    '&:hover .arrow': {
        visibility: 'visible',
        opacity: 0.7,
    },
    '&:focus-visible': {
        outline: '3px solid',
        outlineColor: 'hsla(210, 98%, 48%, 0.5)',
        outlineOffset: '3px',
        borderRadius: '8px',
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        width: 0,
        height: '1px',
        bottom: 0,
        left: 0,
        backgroundColor: theme.palette.text.primary,
        opacity: 0.3,
        transition: 'width 0.3s ease, opacity 0.3s ease',
    },
    '&:hover::before': {
        width: '100%',
    },
}));

function Author({authors}: { authors: { name: string; avatar: string }[] }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'space-between',
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
                            sx={{width: 24, height: 24}}
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
}

interface LatestProps {
    articleInfo: ArticleInfo[];
}

export default function Latest({articleInfo}: LatestProps) {
    const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
        null,
    );

    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    return (
        <div>
            <Typography variant="h2" gutterBottom>
                Latest
            </Typography>
            <Grid container spacing={8} columns={12} sx={{my: 4}}>
                {articleInfo.map((article, index) => (
                    <Grid key={index} size={{xs: 12, sm: 6}}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                gap: 1,
                                height: '100%',
                            }}
                        >
                            <Typography gutterBottom variant="caption" component="div">
                                {article.tag}
                            </Typography>
                            <TitleTypography
                                gutterBottom
                                variant="h6"
                                onFocus={() => handleFocus(index)}
                                onBlur={handleBlur}
                                tabIndex={0}
                                className={focusedCardIndex === index ? 'Mui-focused' : ''}
                            >
                                {article.title}
                                <NavigateNextRoundedIcon
                                    className="arrow"
                                    sx={{fontSize: '1rem'}}
                                />
                            </TitleTypography>
                            <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                {article.description}
                            </StyledTypography>

                            <Author authors={article.authors}/>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{display: 'flex', flexDirection: 'row', pt: 4}}>
                <Pagination hidePrevButton hideNextButton count={10} boundaryCount={10}/>
            </Box>
        </div>
    );
}
