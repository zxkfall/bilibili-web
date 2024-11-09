import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import {styled} from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {CardData} from "@/app/api/cards/route";
import Author from "@/components/Author";
import Carousel from "@/components/Carousel";
import {CarouselData} from "@/app/api/carousel/route";
import styles from './SelfMainContent.module.css';

const SyledCard = styled(Card)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
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
    gap: 2,
    padding: 4,
    flexGrow: 1,
    '&:last-child': {
        paddingBottom: 4,
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
    <FormControl sx={{width: {xs: '100%', md: '100%'}}} variant="outlined">
        <OutlinedInput
            size="small"
            id="search"
            placeholder="Search…"
            sx={{flexGrow: 1}}
            endAdornment={
                <InputAdornment position="start" sx={{color: 'text.primary'}}>
                    <IconButton size="small" aria-label="search" sx={{
                        border: 'none',
                        backgroundColor: 'transparent',
                        height: '24px',
                        width: '24px',
                    }}>
                        <SearchRoundedIcon fontSize="small"/>
                    </IconButton>
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
    carouselData: CarouselData[];
}

const SelfMainContent = ({cardData, carouselData}: SelfMainContentProps) => {
    const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(
        null,
    );

    const mainContainerRef = useRef<HTMLDivElement>();

    const [cusCardData, setCusCardData] = useState(cardData);

    const cusCardDataRef = useRef(cusCardData);

    useEffect(() => {
        cusCardDataRef.current = cusCardData;
    }, [cusCardData]);

    useEffect(() => {
        const infiniteLoadImage = () => {
            const mainContainer = mainContainerRef.current!;
            // console.log(window.scrollY, mainContainer?.clientHeight, cusCardDataRef.current.length)
            if ((window.scrollY + 256 > mainContainer?.clientHeight || window.innerHeight > mainContainer.clientHeight - window.scrollY + 256) && cusCardDataRef.current.length < 100 - 4) {
                setCusCardData((prevState) => prevState.concat(cardData))
            }
        };
        window.addEventListener('scroll', infiniteLoadImage);
        window.addEventListener('resize', infiniteLoadImage);
        return () => {
            window.removeEventListener('scroll', infiniteLoadImage);
            window.removeEventListener('resize', infiniteLoadImage);
        };
    }, []);

    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    const getStyledCard = (index: number = 1) => <SyledCard
        variant="outlined"
        onFocus={() => handleFocus(index)}
        onBlur={handleBlur}
        tabIndex={0}
        className={focusedCardIndex === index ? 'Mui-focused' : ''}
    >
        <CardMedia
            component="img"
            alt="green iguana"
            image={cusCardData[index].img}
            aspect-ratio={"16 / 9"}
            sx={{
                height: {sm: 'auto', md: '50%'},
                aspectRatio: {sm: '16 / 9', md: ''},
            }}
        />

        <SyledCardContent
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '64px',
            }}
        >
            <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {cusCardData[index].description}
            </StyledTypography>
            <Author authors={cusCardData[index].authors}/>
        </SyledCardContent>
    </SyledCard>;

    return (
        <Box ref={mainContainerRef} className={styles.mainContentLayout}>
            <Box sx={{
                // minWidth: '512px',
                gridColumn: 'span 2',
                gridRow: 'span 2',
            }}>
                <Carousel images={carouselData} onCarouselClick={(curIndex, curImage) => {
                    //index will be
                    // 0 1 2 3 4 5
                    // 4 1 2 3 4 1
                    window.open(curImage.imageUrl)
                }}/>
            </Box>
            {cusCardData.map((card, index) => (
                <Box key={index}>
                    {getStyledCard(index)}
                </Box>
            ))}
            {/*{cusCardData.map((card, index) => (*/}
            {/*    <Box key={index}>*/}
            {/*        {getStyledCard(index)}*/}
            {/*    </Box>*/}
            {/*))}*/}
        </Box>

    );
};

export default SelfMainContent;
