import React, {useEffect, useRef, useState} from 'react';
import {Box, IconButton, Link, Typography} from '@mui/material';
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material';
import styles from './Carousel.module.css'
import {CarouselData} from "@/app/api/carousel/route";
import {useRouter} from "next/navigation";

const Carousel = ({images, onCarouselClick, enableTimer = true, timerInterval = 4000}: {
    images: CarouselData[],
    onCarouselClick: (curIndex: number, curImage: CarouselData) => void,
    enableTimer?: boolean,
    timerInterval?: number,
}) => {
    const newImages = images.length ? [images.at(-1), ...images, images[0]] as CarouselData[] : [];
    const carouselId = 'carouselId';
    const carouselDesBgId = 'carouselBackgroundDescriptionId';

    const [currentIndex, setCurrentIndex] = useState(1);
    const [showAn, setShowAn] = useState(true);
    const currentIndexRef = useRef(currentIndex);
    const [transitionEnded, setTransitionEnded] = useState(true);
    const transitionEndedRef = useRef(transitionEnded);
    const preIndexRef = useRef(1);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const router = useRouter();

    useEffect(() => {
        currentIndexRef.current = currentIndex;
        getBottomColor().then((color) => {
            const cd = document.getElementById(carouselDesBgId)!;
            cd.style.backgroundColor = color.rgb;
            cd.style.boxShadow = `0 -12px 12px ${color.rgb},0 -24px 24px ${color.rgb}, 0 -32px 32px ${color.rgb}`;
        })
    }, [currentIndex]);

    useEffect(() => {
        console.log(currentIndex, preIndexRef.current, new Date())
        preIndexRef.current = currentIndex;
    });

    useEffect(() => {
        const sliderContainer = document.getElementById(carouselId)!
        const transitionEndListener = () => {
            const curIndex = currentIndexRef.current;
            if (curIndex === images.length + 1) {
                setShowAn(() => false);
                setCurrentIndex(1);
            }
            if (curIndex === 0) {
                setShowAn(() => false);
                setCurrentIndex(images.length);
            }
            setTransitionEnded(() => {
                transitionEndedRef.current = true;
                return true;
            })
        };
        sliderContainer.addEventListener('transitionend', transitionEndListener);
        return () => {
            sliderContainer.removeEventListener('transitionend', transitionEndListener);
        }
    }, []);


    useEffect(() => {
        if (enableTimer) {
            startTimer();
            return () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current); // 清理定时器
                    timeoutRef.current = null;
                }
            };
        }
    }, [enableTimer, timerInterval]);

    const startTimer = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        const triggerNext = () => {
            handleNext();
            if (enableTimer) {
                timeoutRef.current = setTimeout(triggerNext, timerInterval);
            }
        };

        timeoutRef.current = setTimeout(triggerNext, timerInterval);
    };

    const handleNextWithResetTimer = () => {
        startTimer();
        handleNext();
    };

    const handleNext = () => {
        if (transitionEndedRef.current) {
            setTransitionEnded(() => {
                transitionEndedRef.current = false;
                return false;
            })
            setShowAn(true)
            setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length + 2));
        }
    };

    const handlePreWithResetTimer = () => {
        startTimer();
        handlePrev();
    };

    const handlePrev = () => {
        if (transitionEnded) {
            startTimer();
            setTransitionEnded(() => false)
            setShowAn(true)
            setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length + 2) % (images.length + 2));
        }
    };

    const handleDotClick = (index: number) => {
        startTimer();
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

    const getBottomColor = (): Promise<{
        r: number,
        g: number,
        b: number,
        rgb: string
    }> => new Promise((resolve, reject) => {
        // 创建一个 Image 对象
        let curNumber = currentIndex;
        if (currentIndex === images.length + 1 && preIndexRef.current === images.length) {
            curNumber = 1
        }
        if (currentIndex === 0 && preIndexRef.current === 1) {
            curNumber = images.length
        }
        const carouselSlideImg = document.querySelector(`img[alt="Slide ${curNumber}"]`);
        if (!carouselSlideImg) return;
        const img = new Image();

        img.src = carouselSlideImg.getAttribute('src') as string;
        img.crossOrigin = 'anonymous'; // 允许跨域请求

        img.onload = () => {
            // 创建一个 Canvas 元素来处理图片
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject('Canvas context not found');
                return;
            }

            // 设置 Canvas 尺寸为图片的尺寸
            canvas.width = img.width;
            canvas.height = img.height;

            // 将图片绘制到 Canvas 上
            ctx.drawImage(img, 0, 0, img.width, img.height);

            // 获取底部区域的像素数据（可以根据需要调整底部区域的高度）
            const bottomHeight = 100; // 取图片底部 100 像素
            const imageData = ctx.getImageData(0, img.height - bottomHeight, img.width, bottomHeight);

            // 获取像素数据
            const pixels = imageData.data;
            const color = getDominantColor(pixels);

            resolve(color);
        };

        img.onerror = (error) => {
            reject(error);
        };
    });

    const getDominantColor = (pixels: Uint8ClampedArray): { r: number, g: number, b: number, rgb: string } => {
        let r = 0, g = 0, b = 0;
        const length = pixels.length / 4;

        // 累加所有像素的 RGB 值
        for (let i = 0; i < pixels.length; i += 4) {
            r += pixels[i];     // Red
            g += pixels[i + 1]; // Green
            b += pixels[i + 2]; // Blue
        }

        // 计算平均颜色
        r = Math.floor(r / length);
        g = Math.floor(g / length);
        b = Math.floor(b / length);

        // 返回 RGB 字符串
        return {r, g, b, rgb: `rgb(${r}, ${g}, ${b})`};
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: 1,
        }}>
            <Box sx={{position: 'relative', width: '100%', overflow: 'hidden', cursor: 'pointer'}}>
                <Box
                    id={carouselId}
                    sx={{
                        display: 'flex',
                        transition: showAn ? 'transform 0.5s ease' : '',
                        transform: `translateX(-${(currentIndex) * 100}%)`,
                    }}
                    onClick={() => {
                        if (onCarouselClick) {
                            onCarouselClick(currentIndex, newImages[currentIndex]);
                        } else if (newImages[currentIndex]) {
                            router.push(newImages[currentIndex].url);
                        }
                    }}>
                    {newImages.map((image, index) => (
                        <Box
                            component="img"
                            key={index}
                            src={image?.imageUrl}
                            alt={`Slide ${index}`}
                            sx={{width: '100%', height: 'auto', flexShrink: 0}}
                        />
                    ))}
                </Box>

            </Box>
            <Box
                sx={{
                    position: 'relative',
                    zIndex: '1',
                    overflowX: 'clip',
                }}
            >
                <Box
                    id={carouselDesBgId}
                    sx={{
                        position: 'absolute',
                        zIndex: -100,
                        width: '100%',
                        height: '100%',
                    }}/>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    pt: 1.5,
                    px: 1,
                    backgroundColor: 'transparent',
                }}>
                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        gap: 2,
                    }}>
                        <Typography sx={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                        }}
                                    variant={'subtitle1'}
                        >
                            <Link underline='none' sx={{
                                backgroundColor: 'transparent',
                                '&:before': {
                                    backgroundColor: 'transparent'
                                },
                                cursor: 'pointer',
                            }}
                                  onClick={() => {
                                      if (onCarouselClick) {
                                          onCarouselClick(currentIndex, newImages[currentIndex]);
                                      } else if (newImages[currentIndex]) {
                                          router.push(newImages[currentIndex].url);
                                      }
                                  }}
                            >
                                {newImages[currentIndex]?.description}
                            </Link>
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 1,

                        }}>
                            <IconButton
                                size={"small"}
                                onClick={handlePreWithResetTimer}
                                sx={{height: '24px', width: '24px'}}
                            >
                                <ArrowBackIos fontSize={"small"} sx={{
                                    ml: 0.5
                                }}/>
                            </IconButton>
                            <IconButton
                                size={"small"}
                                onClick={handleNextWithResetTimer}
                                sx={{height: '24px', width: '24px'}}
                            >
                                <ArrowForwardIos fontSize={"small"}/>
                            </IconButton>
                        </Box>

                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 1,
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
                                mr: 1,
                                mb: 2,
                                pl: 0.2,
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
                </Box>

            </Box>
        </Box>
    );
};

export default Carousel;
