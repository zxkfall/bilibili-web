import React, {useEffect, useRef, useState} from 'react';
import {Box, IconButton} from '@mui/material';
import {ArrowForward, ArrowBack} from '@mui/icons-material';
import styles from './Carousel.module.css'

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
    const preIndexRef = useRef(1)

    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    useEffect(() => {
        console.log(currentIndex, preIndexRef.current)
        preIndexRef.current = currentIndex;
    });

    useEffect(() => {
        const sliderContainer = document.getElementById(carouselId)!
        const transitionEndListener = () => {
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
        sliderContainer.addEventListener('transitionend', transitionEndListener)
        return () => {
            sliderContainer.removeEventListener('transitionend', transitionEndListener)
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

    const handleDotClick = (index: number) => {
        setShowAn(true)
        setCurrentIndex(index + 1); // +1 因为我们有一个前置和后置的图片
    };

    const getMouthAnClass = (index: number, curIndex: number, preIndex: number, leftMouth: string, rightMouth: string): string => {
        const rightEndToStartByManual = curIndex === images.length + 1 && preIndex === images.length && index === 0;
        const leftStartToEndManual = curIndex === 0 && preIndex === 1 && index === images.length - 1;
        const rightEndToStartAuto = curIndex === 1 && preIndex === images.length + 1 && index === 0;
        const leftStartToEndAuto = curIndex === images.length && preIndex === 0 && index === images.length - 1;

        if (rightEndToStartByManual) {
            return rightMouth;
        }
        if (leftStartToEndManual) {
            return leftMouth;

        }
        if (rightEndToStartAuto || leftStartToEndAuto) {
            return '';
        }

        if (curIndex === index + 1) {
            return (curIndex > preIndex && rightMouth || curIndex < preIndex && leftMouth) as string
        }

        return '';

    }

    const getBgColor = (curIndex: number, index: number) => {
        const activeColor = 'lightblue';
        const notSelectedColor = 'grey';

        const rightEndToStartManual = curIndex === images.length + 1 && preIndexRef.current === images.length && index === 0;
        const leftStartToEndManual = curIndex === 0 && preIndexRef.current === 1 && index === images.length - 1;
        if (rightEndToStartManual || leftStartToEndManual) {
            return activeColor;
        }

        return curIndex === index + 1 ? activeColor : notSelectedColor
    }

    const getShrunk = (curIndex: number, index: number): string => {
        const rightEndToStartManual = curIndex === images.length + 1 && preIndexRef.current === images.length && index === 0;
        const leftStartToEndManual = curIndex === 0 && preIndexRef.current === 1 && index === images.length - 1;
        if (rightEndToStartManual || leftStartToEndManual) {
            return styles.shrunkSizeAn;
        }
        return (curIndex === index + 1) ? styles.shrunkSizeAn : styles.clearAn
    }

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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            >
                {images.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={getShrunk(currentIndex, index)} sx={{
                        width: 'var(--circle-diameter)',
                        height: 'var(--circle-diameter)',
                        borderRadius: '50%',
                        backgroundColor: 'transparent',
                        m: 1,
                        mb: 2,
                        cursor: 'pointer',
                    }}
                    >
                        <Box
                            className={`${getMouthAnClass(index, currentIndex, preIndexRef.current, styles.topCircleAnL, styles.topCircleAnR)} 
                            ${styles.halfCircle} 
                            ${styles.halfCircleTop}`}
                            sx={{
                                backgroundColor: getBgColor(currentIndex, index),
                            }}></Box>
                        <Box
                            className={`${getMouthAnClass(index, currentIndex, preIndexRef.current, styles.bottomCircleAnL, styles.bottomCircleAnR)}
                            ${styles.halfCircle}
                            ${styles.halfCircleBottom}`}
                            sx={{
                                backgroundColor: getBgColor(currentIndex, index),
                            }}></Box>
                    </Box>
                ))}

            </Box>

            <Box sx={{
                width: 'var(--circle-diameter)',
                height: 'var(--circle-diameter)',
            }}>
                <div className={styles.topHalfCircle}></div>
                <div className={styles.bottomHalfCircle}></div>
            </Box>
        </Box>
    );
};

export default Carousel;
