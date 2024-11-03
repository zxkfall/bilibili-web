import React, {useEffect, useRef, useState} from 'react';
import {Box, IconButton} from '@mui/material';
import {ArrowForward, ArrowBack} from '@mui/icons-material';

const Carousel = () => {
    const images = [
        'https://picsum.photos/800/450?random=1',
        'https://picsum.photos/800/450?random=2',
        'https://picsum.photos/800/450?random=3',
    ];

    const carouselId = 'carouselId'

    const [currentIndex, setCurrentIndex] = useState(1);
    const [showAn, setShowAn] = useState(true)
    const currentIndexRef = useRef(currentIndex);
    const [transitionEnded, setTransitionEnded] = useState(true)

    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    useEffect(() => {
        const sliderContainer = document.getElementById(carouselId)!

        const listener = () => {
            const curIndex = currentIndexRef.current;
            if (curIndex === images.length + 1) {
                setShowAn(() => false)
                setCurrentIndex(1)
            }
            if (curIndex === 0) {
                setShowAn(() => false)
                setCurrentIndex(images.length)
            }
            setTransitionEnded(() => true)
        };
        sliderContainer.addEventListener('transitionend', listener)
        return () => {
            sliderContainer.removeEventListener('transitionend', listener)
        }
    }, []);


    const handleNext = () => {
        if (transitionEnded) {
            setTransitionEnded(() => false)
            setShowAn(true)
            setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length + 2));
        }
    };

    const handlePrev = () => {
        if (transitionEnded) {
            setTransitionEnded(() => false)
            setShowAn(true)
            setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length + 2) % (images.length + 2));
        }
    };


    return (
        <Box sx={{position: 'relative', width: '100%', overflow: 'hidden'}}>
            <Box
                id={carouselId}
                sx={{
                    display: 'flex',
                    transition: showAn ? 'transform 0.5s ease' : '',
                    transform: `translateX(-${(currentIndex) * 100}%)`,
                }}

            >
                <Box
                    component="img"
                    src={images[images.length - 1]}
                    alt={`Slide 0`}
                    sx={{width: '100%', height: 'auto', flexShrink: 0}}
                />
                {images.map((image, index) => (
                    <Box
                        component="img"
                        key={index}
                        src={image}
                        alt={`Slide ${index}`}
                        sx={{width: '100%', height: 'auto', flexShrink: 0}}
                    />
                ))}
                <Box
                    component="img"
                    src={images[0]}
                    alt={`Slide 0`}
                    sx={{width: '100%', height: 'auto', flexShrink: 0}}
                />
            </Box>
            <IconButton
                onClick={handlePrev}
                sx={{position: 'absolute', top: '50%', left: '10%', zIndex: 10}}
            >
                <ArrowBack/>
            </IconButton>
            <IconButton
                onClick={handleNext}
                sx={{position: 'absolute', top: '50%', right: '10%', zIndex: 10}}
            >
                <ArrowForward/>
            </IconButton>
        </Box>
    );
};

export default Carousel;
