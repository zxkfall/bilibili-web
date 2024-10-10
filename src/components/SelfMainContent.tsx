import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import {styled} from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import {CardData} from "@/app/api/cards/route";
import Author from "@/components/Author";

const SyledCard = styled(Card)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    '&:focus-visible': {
        outline: '3px solid',
        outlineColor: 'hsla(210, 98%, 48%, 0.5)',
        outlineOffset: '2px',
    },
}));

const SyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 16,
    flexGrow: 1,
    '&:last-child': {
        paddingBottom: 16,
    },
});

const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});


export const Search = () => (
    <FormControl sx={{width: {xs: '100%', md: '25ch'}}} variant="outlined">
        <OutlinedInput
            size="small"
            id="search"
            placeholder="Search…"
            sx={{flexGrow: 1}}
            startAdornment={
                <InputAdornment position="start" sx={{color: 'text.primary'}}>
                    <SearchRoundedIcon fontSize="small"/>
                </InputAdornment>
            }
            inputProps={{
                'aria-label': 'search',
            }}
        />
    </FormControl>
);

interface SelfMainContentProps {
    cardData: CardData[];
}

const SelfMainContent = ({cardData}: SelfMainContentProps) => {
    const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(
        null,
    );

    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    const [category, setCategory] = useState('All categories');

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setCategory(e.currentTarget.textContent || 'All categories');
        console.info('You clicked the filter chip.');
    };

    const chipNoSelect = {
        backgroundColor: 'transparent',
        border: 'none',
    };

    const categories = ["All categories", "Company", "Product", "Design", "Engineering"];
    const getStyledCard = (index: number = 1, has: boolean = true, hasImg: boolean = true) => <SyledCard
        variant="outlined"
        onFocus={() => handleFocus(index)}
        onBlur={handleBlur}
        tabIndex={0}
        className={focusedCardIndex === index ? 'Mui-focused' : ''}
        sx={has ? {} : {height: '100%'}}
    >
        {hasImg && <CardMedia
            component="img"
            alt="green iguana"
            image={cardData[index].img}
            aspect-ratio={has ? "16 / 9" : ""}
            sx={has ? {
                borderBottom: '1px solid',
                borderColor: 'divider',
            } : {
                height: {sm: 'auto', md: '50%'},
                aspectRatio: {sm: '16 / 9', md: ''},
            }}
        />}
        <SyledCardContent
            sx={hasImg ? {} : {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
            }}
        >
            <Typography gutterBottom variant="caption" component="div">
                {cardData[index].tag}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
                {cardData[index].title}
            </Typography>
            <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {cardData[index].description}
            </StyledTypography>
        </SyledCardContent>
        <Author authors={cardData[index].authors}/>
    </SyledCard>;

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 4}}>
            <div>
                <Typography variant="h1" gutterBottom>
                    Blog
                </Typography>
                <Typography>Stay in the loop with the latest about our products</Typography>
            </div>
            <Box
                sx={{
                    display: {xs: 'flex', sm: 'none'},
                    flexDirection: 'row',
                    gap: 1,
                    width: {xs: '100%', md: 'fit-content'},
                    overflow: 'auto',
                }}
            >
                <Search/>
                <IconButton size="small" aria-label="RSS feed">
                    <RssFeedRoundedIcon/>
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column-reverse', md: 'row'},
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: {xs: 'start', md: 'center'},
                    gap: 4,
                    overflow: 'auto',
                }}
            >
                <Box
                    sx={{
                        display: 'inline-flex',
                        flexDirection: 'row',
                        gap: 3,
                        overflow: 'auto',
                    }}
                >
                    {categories.map((item) => (
                        <Chip
                            key={item}
                            onClick={handleClick}
                            size="medium"
                            label={item}
                            sx={category === item ? {} : chipNoSelect}
                        />
                    ))}
                </Box>
                <Box
                    sx={{
                        display: {xs: 'none', sm: 'flex'},
                        flexDirection: 'row',
                        gap: 1,
                        width: {xs: '100%', md: 'fit-content'},
                        overflow: 'auto',
                    }}
                >
                    <Search/>
                    <IconButton size="small" aria-label="RSS feed">
                        <RssFeedRoundedIcon/>
                    </IconButton>
                </Box>
            </Box>
            {cardData?.length > 0 && (
                <Grid container spacing={2} columns={12}>
                    <Grid size={{xs: 12, md: 6}}>
                        {getStyledCard(0)}
                    </Grid>
                    <Grid size={{xs: 12, md: 6}}>
                        {getStyledCard(1)}
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
                        {getStyledCard(2, false)}
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, height: '100%'}}>
                            {getStyledCard(3, false, false)}
                            {getStyledCard(4, false, false)}
                        </Box>
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
                        {getStyledCard(5, false)}
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default SelfMainContent;
