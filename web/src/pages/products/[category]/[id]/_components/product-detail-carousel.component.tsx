import React from 'react';
import { Carousel } from '@mantine/carousel';
import { Image, Card } from '@mantine/core';
import {useProductBackgroundColors} from "../../../../../hooks/useProductBackgroundColors";


interface ProductDetailCarouselProps {
    images: string[];
}

const ProductDetailCarousel: React.FC<ProductDetailCarouselProps> = ({ images }) => {
    const backgroundColors = useProductBackgroundColors(images);

    return (
        <Card shadow="md" radius="md" withBorder p="lg">
            <Carousel
                slideSize="100%"
                height={400}
                withIndicators
                loop
                className="product-carousel"
            >
                {images.map((image, index) => (
                    <Carousel.Slide key={index}>
                        <div
                            className="relative flex items-center justify-center overflow-hidden rounded-md"
                            style={{
                                background: backgroundColors[index] || '#f5f5f5',
                                padding: '1rem',
                            }}
                        >
                            <Image
                                src={image}
                                alt={`Product Image ${index + 1}`}
                                fit="contain"
                                className="object-contain h-full w-full"
                                style={{
                                    aspectRatio: '16 / 9',
                                }}
                            />
                        </div>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Card>
    );
};

export default ProductDetailCarousel;
