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

    const handleClick = () => {
        console.info('You clicked the filter chip.');
    };

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
                    <Chip onClick={handleClick} size="medium" label="All categories"/>
                    <Chip
                        onClick={handleClick}
                        size="medium"
                        label="Company"
                        sx={{
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}
                    />
                    <Chip
                        onClick={handleClick}
                        size="medium"
                        label="Product"
                        sx={{
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}
                    />
                    <Chip
                        onClick={handleClick}
                        size="medium"
                        label="Design"
                        sx={{
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}
                    />
                    <Chip
                        onClick={handleClick}
                        size="medium"
                        label="Engineering"
                        sx={{
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}
                    />
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
                        <SyledCard
                            variant="outlined"
                            onFocus={() => handleFocus(0)}
                            onBlur={handleBlur}
                            tabIndex={0}
                            className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
                        >
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                image={cardData[0].img}
                                aspect-ratio="16 / 9"
                                sx={{
                                    borderBottom: '1px solid',
                                    borderColor: 'divider',
                                }}
                            />
                            <SyledCardContent>
                                <Typography gutterBottom variant="caption" component="div">
                                    {cardData[0].tag}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    {cardData[0].title}
                                </Typography>
                                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                    {cardData[0].description}
                                </StyledTypography>
                            </SyledCardContent>
                            <Author authors={cardData[0].authors}/>
                        </SyledCard>
                    </Grid>
                    <Grid size={{xs: 12, md: 6}}>
                        <SyledCard
                            variant="outlined"
                            onFocus={() => handleFocus(1)}
                            onBlur={handleBlur}
                            tabIndex={0}
                            className={focusedCardIndex === 1 ? 'Mui-focused' : ''}
                        >
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                image={cardData[1].img}
                                aspect-ratio="16 / 9"
                                sx={{
                                    borderBottom: '1px solid',
                                    borderColor: 'divider',
                                }}
                            />
                            <SyledCardContent>
                                <Typography gutterBottom variant="caption" component="div">
                                    {cardData[1].tag}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    {cardData[1].title}
                                </Typography>
                                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                    {cardData[1].description}
                                </StyledTypography>
                            </SyledCardContent>
                            <Author authors={cardData[1].authors}/>
                        </SyledCard>
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
                        <SyledCard
                            variant="outlined"
                            onFocus={() => handleFocus(2)}
                            onBlur={handleBlur}
                            tabIndex={0}
                            className={focusedCardIndex === 2 ? 'Mui-focused' : ''}
                            sx={{height: '100%'}}
                        >
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                image={cardData[2].img}
                                sx={{
                                    height: {sm: 'auto', md: '50%'},
                                    aspectRatio: {sm: '16 / 9', md: ''},
                                }}
                            />
                            <SyledCardContent>
                                <Typography gutterBottom variant="caption" component="div">
                                    {cardData[2].tag}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    {cardData[2].title}
                                </Typography>
                                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                    {cardData[2].description}
                                </StyledTypography>
                            </SyledCardContent>
                            <Author authors={cardData[2].authors}/>
                        </SyledCard>
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
                        <Box
                            sx={{display: 'flex', flexDirection: 'column', gap: 2, height: '100%'}}
                        >
                            <SyledCard
                                variant="outlined"
                                onFocus={() => handleFocus(3)}
                                onBlur={handleBlur}
                                tabIndex={0}
                                className={focusedCardIndex === 3 ? 'Mui-focused' : ''}
                                sx={{height: '100%'}}
                            >
                                <SyledCardContent
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        height: '100%',
                                    }}
                                >
                                    <div>
                                        <Typography gutterBottom variant="caption" component="div">
                                            {cardData[3].tag}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {cardData[3].title}
                                        </Typography>
                                        <StyledTypography
                                            variant="body2"
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            {cardData[3].description}
                                        </StyledTypography>
                                    </div>
                                </SyledCardContent>
                                <Author authors={cardData[3].authors}/>
                            </SyledCard>
                            <SyledCard
                                variant="outlined"
                                onFocus={() => handleFocus(4)}
                                onBlur={handleBlur}
                                tabIndex={0}
                                className={focusedCardIndex === 4 ? 'Mui-focused' : ''}
                                sx={{height: '100%'}}
                            >
                                <SyledCardContent
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        height: '100%',
                                    }}
                                >
                                    <div>
                                        <Typography gutterBottom variant="caption" component="div">
                                            {cardData[4].tag}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {cardData[4].title}
                                        </Typography>
                                        <StyledTypography
                                            variant="body2"
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            {cardData[4].description}
                                        </StyledTypography>
                                    </div>
                                </SyledCardContent>
                                <Author authors={cardData[4].authors}/>
                            </SyledCard>
                        </Box>
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
                        <SyledCard
                            variant="outlined"
                            onFocus={() => handleFocus(5)}
                            onBlur={handleBlur}
                            tabIndex={0}
                            className={focusedCardIndex === 5 ? 'Mui-focused' : ''}
                            sx={{height: '100%'}}
                        >
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                image={cardData[5].img}
                                sx={{
                                    height: {sm: 'auto', md: '50%'},
                                    aspectRatio: {sm: '16 / 9', md: ''},
                                }}
                            />
                            <SyledCardContent>
                                <Typography gutterBottom variant="caption" component="div">
                                    {cardData[5].tag}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    {cardData[5].title}
                                </Typography>
                                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                    {cardData[5].description}
                                </StyledTypography>
                            </SyledCardContent>
                            <Author authors={cardData[5].authors}/>
                        </SyledCard>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default SelfMainContent;
