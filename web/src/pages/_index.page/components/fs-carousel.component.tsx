import { useState, useRef } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

// @ts-ignore
import slide1 from '../assets/images/slide1.webp'
// @ts-ignore
import slide2 from '../assets/images/slide2.webp'
// @ts-ignore
import slide3 from '../assets/images/slide3.webp'

export default function FullScreenCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dragStart, setDragStart] = useState<number | null>(null);
    const [dragOffset, setDragOffset] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const slides = [
        {
            id: 1,
            src: slide1,
            alt: 'Slide 1',
            content: (
                <div className="absolute inset-0 flex flex-col items-start justify-center p-10 text-white select-none">
                    <div
                        className="bg-red-500 bg-opacity-75 p-4 rounded"
                        style={{ transform: `translateX(${dragOffset / 3}px)` }}
                    >
                        <h1 className="text-3xl font-bold">Luxurious Velvet Fabrics</h1>
                    </div>
                    <div
                        className="bg-black bg-opacity-50 p-2 rounded mt-4"
                        style={{ transform: `translateX(${dragOffset / 5}px)` }}
                    >
                        <p>Feel the texture of our finest materials.</p>
                    </div>
                </div>
            ),
        },
        {
            id: 2,
            src: slide2,
            alt: 'Slide 2',
            content: (
                <div className="absolute inset-0 flex flex-col items-start justify-center p-10 text-white select-none">
                    <div
                        className="bg-blue-500 bg-opacity-75 p-4 rounded"
                        style={{ transform: `translateX(${dragOffset / 3}px)` }}
                    >
                        <h1 className="text-3xl font-bold">Elegant Silk Textures</h1>
                    </div>
                    <div
                        className="bg-black bg-opacity-50 p-2 rounded mt-4"
                        style={{ transform: `translateX(${dragOffset / 5}px)` }}
                    >
                        <p>Elegant designs for every occasion.</p>
                    </div>
                </div>
            ),
        },
        {
            id: 3,
            src: slide3,
            alt: 'Slide 3',
            content: (
                <div className="absolute inset-0 flex flex-col items-start justify-center p-10 text-white select-none">
                    <div
                        className="bg-green-500 bg-opacity-75 p-4 rounded"
                        style={{ transform: `translateX(${dragOffset / 3}px)` }}
                    >
                        <h1 className="text-3xl font-bold">Modern Casual Outfits</h1>
                    </div>
                    <div
                        className="bg-black bg-opacity-50 p-2 rounded mt-4"
                        style={{ transform: `translateX(${dragOffset / 5}px)` }}
                    >
                        <p>Outfits that blend style and comfort.</p>
                    </div>
                </div>
            ),
        },
    ];

    const resetDrag = () => {
        setDragStart(null);
        setDragOffset(0);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
        resetDrag();
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
        resetDrag();
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setDragStart(e.clientX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (dragStart !== null) {
            setDragOffset(e.clientX - dragStart);
        }
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (dragStart !== null) {
            const dragDistance = e.clientX - dragStart;
            if (dragDistance > 50) {
                prevSlide();
            } else if (dragDistance < -50) {
                nextSlide();
            } else {
                resetDrag();
            }
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden cursor-grab select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div
                className="absolute inset-0 flex transition-transform duration-300 ease-out"
                style={{
                    transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
                }}
            >
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="w-full h-full flex-shrink-0 relative"
                        style={{
                            backgroundImage: `url(${slide.src})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {slide.content}
                    </div>
                ))}
            </div>

            <div className="absolute bottom-14 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex z-10 gap-2 items-center">
                <button className="p-2 cursor-pointer rounded-full" onClick={prevSlide} aria-label="Previous Slide">
                    <IconChevronLeft size={24} />
                </button>
                <div className="py-2.5 px-6 rounded-full bg-opacity-50 bg-white flex gap-2">
                    {slides.map((_, index) => (
                        <span key={index}
                            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-gray-900' : 'bg-gray-400'}`}
                        />
                    ))}
                </div>
                <button className="p-2 cursor-pointer rounded-full" onClick={nextSlide} aria-label="Next Slide">
                    <IconChevronRight size={24} />
                </button>
            </div>
        </div>
    );
}
