import { useState } from 'react';
import { Image } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

// @ts-ignore
import slide1 from '../assets/images/slide1.webp'
// @ts-ignore
import slide2 from '../assets/images/slide2.webp'
// @ts-ignore
import slide3 from '../assets/images/slide3.webp'

export default function FullScreenCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        { id: 1, src: slide1, alt: 'Slide 1' },
        { id: 2, src: slide2, alt: 'Slide 2' },
        { id: 3, src: slide3, alt: 'Slide 3' },
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Slides */}
            <div
                className="absolute inset-0 flex transition-transform duration-700"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="w-full h-full flex-shrink-0">
                        <Image
                            src={slide.src}
                            alt={slide.alt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Controls */}
            <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
                onClick={prevSlide}
                aria-label="Previous Slide"
            >
                <IconChevronLeft size={24} />
            </button>
            <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
                onClick={nextSlide}
                aria-label="Next Slide"
            >
                <IconChevronRight size={24} />
            </button>

            {/* Improved Indicators */}
            <div className="absolute bottom-14 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex z-10 gap-2 items-center">
                {/* Previous Arrow */}
                <button
                    className="p-2 cursor-pointer rounded-full"
                    onClick={prevSlide}
                    aria-label="Previous Slide"
                >
                    <IconChevronLeft size={24} />
                </button>

                {/* Indicators */}
                <div className="py-2.5 px-6 rounded-full bg-opacity-50 bg-white flex gap-2">
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={`w-3 h-3 rounded-full ${
                                index === currentIndex ? 'bg-gray-900' : 'bg-gray-400'
                            }`}
                        />
                    ))}
                </div>

                {/* Next Arrow */}
                <button
                    className="p-2 cursor-pointer rounded-full"
                    onClick={nextSlide}
                    aria-label="Next Slide"
                >
                    <IconChevronRight size={24} />
                </button>
            </div>
        </div>
    );
}
