import React, {useEffect, useRef, useState} from 'react';
import {Box, IconButton, keyframes} from '@mui/material';
import {ArrowForward, ArrowBack} from '@mui/icons-material';

const CarouselNew = () => {
    const images = [
        'https://picsum.photos/800/450?random=1',
        'https://picsum.photos/800/450?random=2',
        'https://picsum.photos/800/450?random=3',
    ];

    const [currentIndex, setCurrentIndex] = useState(1);
    const [showNext, setShowNext] = useState(true);
    const [showAn, setShowAn] = useState(true)
    const currentIndexRef = useRef(currentIndex);
    const [transitionended, setTransitionended] = useState(true)

    useEffect(() => {
        currentIndexRef.current = currentIndex;
        console.log('caefawefawf',currentIndex)
    }, [currentIndex]);

    useEffect(() => {
        const sliderContainer = document.getElementById('container')!

        const listener = () => {
            const curIndex = currentIndexRef.current;
            console.log('listened', 'curInex', curIndex)

            if (curIndex === images.length + 1) {
                console.log('notshow', curIndex)
                setShowAn(() => false)
                setCurrentIndex(1)
            }
            setTransitionended(() => true)
            console.log('cccc',curIndex)
        };
        sliderContainer.addEventListener('transitionend', listener)
        return () => {
            sliderContainer.removeEventListener('transitionend', listener)
        }
    }, []);


    const handleNext = () => {
        if (transitionended) {
            setTransitionended(() => false)
            setShowAn(true)
            setCurrentIndex((prevIndex) => {
                    // if (prevIndex + 1 === 5) {
                    //     console.log('get1')
                    //     return 1;
                    // } else {
                    //     console.log('getooo')
                    // }
                return (prevIndex + 1) % (images.length + 2)

                }
            );
            console.log(currentIndex)
        }
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };


    return (
        <Box sx={{position: 'relative', width: '100%', overflow: 'hidden'}}>
            <Box
                id={'container'}
                sx={{
                    display: 'flex',
                    transition: showAn ? 'transform 0.5s ease' : '',
                    transform: `translateX(-${currentIndex * 100}%)`, // 向左滑动
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
                {/* 后一张虚拟图片 */}
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

export default CarouselNew;
