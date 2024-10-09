import React, {useState} from 'react';
import {Carousel} from '@mantine/carousel';
import {AspectRatio, Divider, Image, Transition} from '@mantine/core';
import ThumbnailCard from './_cards/thumbnail.card';
import {useImageBackgroundColor} from "../../../../../hooks/useImageBackgroundColor";

interface ProductDetailCarouselProps {
    images: string[];
}

const ProductDetailCarousel: React.FC<ProductDetailCarouselProps> = ({ images }) => {
    const [selectedSlide, setSelectedSlide] = useState(0);

    // Handle duplicating images for testing when only one image is provided
    const duplicatedImages = images.length === 1 ? Array(3).fill(images[0]) : images;

    const backgroundColor = useImageBackgroundColor(duplicatedImages[selectedSlide]);

    return (
        <>
            <AspectRatio ratio={ 1 } className="rounded-xl overflow-hidden">
                <div
                    className="relative flex items-center justify-center w-full h-full"
                    style={{ background: backgroundColor || '#f5f5f5' }}
                >
                    {duplicatedImages.map((image, index) => (
                        <Transition
                            key={index}
                            mounted={selectedSlide === index}
                            transition="fade"
                            duration={500}
                            timingFunction="ease"
                        >
                            {(styles) => (
                                <Image
                                    src={image}
                                    alt={`Product Image ${index + 1}`}
                                    fit="contain"
                                    className="object-contain h-full w-full absolute"
                                    style={styles}
                                />
                            )}
                        </Transition>
                    ))}
                </div>
            </AspectRatio>

            <Divider className="my-2" />

            <Carousel
                slideSize="20%"
                withControls
                align="start"
                loop={false}
                className="rounded-md"

            >
                {duplicatedImages.map((image, index) => (
                    <Carousel.Slide key={index}>
                        <ThumbnailCard
                            image={image}
                            isActive={selectedSlide === index}
                            onClick={() => setSelectedSlide(index)}
                        />
                    </Carousel.Slide>
                ))}
            </Carousel>
        </>
    );
};

export default ProductDetailCarousel;
