import {useCallback, useEffect, useState} from "react";
import {Carousel, Embla} from "@mantine/carousel";
import {IconChevronLeft, IconChevronRight} from "@tabler/icons-react";

// @ts-ignore
import slide1 from '../_assets/images/slide1.webp';
// @ts-ignore
import slide2 from '../_assets/images/slide2.webp';
// @ts-ignore
import slide3 from '../_assets/images/slide3.webp';


export default function FsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [embla, setEmbla] = useState<Embla | null>(null);
    const [dragOffset, setDragOffset] = useState(0);
    const [canScrollNext, setCanScrollNext] = useState(true);
    const [canScrollPrev, setCanScrollPrev] = useState(false);

    //TODO:ADD LINKS TO SLIDES + responsivity
    const slides = [
        {
            id: 1,
            src: slide1,
            alt: 'Slide 1',
            content: (
                <div
                    className="absolute inset-0 flex items-center p-10 text-white select-none"
                    style={{ transform: `translateX(${dragOffset / 3}px)` }}
                >
                    <div className="w-full max-w-lg lg:max-w-2xl bg-white bg-opacity-30 p-8 rounded-xl shadow-xl backdrop-blur-lg space-y-6">
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-500 p-6 rounded-xl shadow-lg">
                                <h1 className="text-3xl lg:text-5xl font-extrabold tracking-wide text-center">
                                    Discover Fashion that Speaks
                                </h1>
                            </div>

                            <div className="bg-black bg-opacity-60 p-4 rounded-lg shadow-md">
                                <p className="text-md lg:text-lg font-medium text-center">
                                    Elevate your wardrobe with exclusive styles that define every moment.
                                    From casual fits to luxurious formalwear, our collection has it all.
                                </p>
                            </div>

                            <div className="bg-purple-500 bg-opacity-80 p-3 rounded-lg shadow-md flex items-center space-x-3">
                                <IconChevronRight size={28} className="text-white" />
                                <p className="text-white text-lg font-semibold tracking-wide">
                                    New arrivals every week, just for you!
                                </p>
                            </div>
                        </div>

                        <button
                            className="mt-6 w-full bg-white text-purple-500 hover:bg-purple-500 hover:text-white transition duration-300 ease-in-out p-3 px-6 rounded-full font-bold text-lg shadow-lg"
                        >
                            Shop the Collection
                        </button>
                    </div>
                </div>
            ),
        },
        {
            id: 2,
            src: slide2,
            alt: 'Slide 2',
            content: (
                <div
                    className="absolute inset-0 flex items-center justify-center p-10 text-white select-none"
                    style={{ transform: `translateX(${(dragOffset/currentIndex) / 2}px)` }}
                >
                    <div className="w-full max-w-lg lg:max-w-2xl bg-white bg-opacity-30 p-8 rounded-xl shadow-xl backdrop-blur-lg space-y-6">
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-green-600 to-blue-500 p-6 rounded-xl shadow-lg">
                                <h1 className="text-3xl lg:text-5xl font-extrabold tracking-wide text-center">
                                    Sustainability Meets Comfort
                                </h1>
                            </div>

                            <div className="bg-black bg-opacity-60 p-4 rounded-lg shadow-md">
                                <p className="text-md lg:text-lg font-medium text-center">
                                    Embrace the future of fashion with eco-friendly fabrics and designs that
                                    provide unmatched comfort for your everyday adventures.
                                </p>
                            </div>

                            <div className="bg-green-500 bg-opacity-80 p-3 rounded-lg shadow-md flex items-center space-x-3">
                                <IconChevronRight size={28} className="text-white" />
                                <p className="text-white text-lg font-semibold tracking-wide">
                                    Discover sustainable pieces that feel as good as they look.
                                </p>
                            </div>
                        </div>

                        <button
                            className="mt-6 w-full bg-white text-green-500 hover:bg-green-500 hover:text-white transition duration-300 ease-in-out p-3 px-6 rounded-full font-bold text-lg shadow-lg"
                        >
                            Explore Sustainable Collection
                        </button>
                    </div>
                </div>
            ),
        },
        {
            id: 3,
            src: slide3,
            alt: 'Slide 3',
            content: (
                <div
                    className="absolute inset-0 flex items-center justify-center p-10 text-white select-none"
                    style={{ transform: `translateX(${(dragOffset/currentIndex) / 3}px)` }}
                >
                    <div className="w-full max-w-lg lg:max-w-2xl bg-white bg-opacity-30 p-8 rounded-xl shadow-xl backdrop-blur-lg space-y-6">
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 rounded-xl shadow-lg">
                                <h1 className="text-3xl lg:text-5xl font-extrabold tracking-wide text-center">
                                    Modern Trends & Style
                                </h1>
                            </div>

                            <div className="bg-black bg-opacity-60 p-4 rounded-lg shadow-md">
                                <p className="text-md lg:text-lg font-medium text-center">
                                    Stay ahead of the fashion curve with our bold, trendy designs for every season.
                                    Dress to impress with the latest styles that define your unique personality.
                                </p>
                            </div>

                            <div className="bg-pink-500 bg-opacity-80 p-3 rounded-lg shadow-md flex items-center space-x-3">
                                <IconChevronRight size={28} className="text-white" />
                                <p className="text-white text-lg font-semibold tracking-wide">
                                    Shop the latest trends and create your signature look.
                                </p>
                            </div>
                        </div>

                        <button
                            className="mt-6 w-full bg-white text-pink-500 hover:bg-pink-500 hover:text-white transition duration-300 ease-in-out p-3 px-6 rounded-full font-bold text-lg shadow-lg"
                        >
                            Explore Trendy Collection
                        </button>
                    </div>
                </div>
            ),
        },

    ];

    const handleScroll = useCallback(() => {
        if (!embla) return;
        const progress = embla.scrollProgress();
        setDragOffset(progress * window.innerWidth);
    }, [embla]);

    const updateButtonStates = useCallback(() => {
        if (!embla) return;
        setCanScrollNext(embla.canScrollNext());
        setCanScrollPrev(embla.canScrollPrev());
    }, [embla]);

    useEffect(() => {
        if (embla) {
            embla.on('scroll', handleScroll);
            embla.on('select', updateButtonStates);
            embla.on('pointerUp', () => {
                document.body.style.cursor = 'default';
            });
            embla.on('pointerDown', () => {
                document.body.style.cursor = 'grabbing';
            });
            updateButtonStates();
        }
    }, [embla, handleScroll, updateButtonStates]);

    return (
        <div className="relative w-full h-screen">
            <Carousel
                height="100%"
                slideSize="100%"
                withControls={false}
                getEmblaApi={setEmbla}
                onSlideChange={(index) => setCurrentIndex(index)}
                styles={{
                    control: {
                        background: 'rgba(255, 255, 255, 0.5)',
                        color: 'black',
                        borderRadius: '50%',
                        border: 'none',
                        width: '40px',
                        height: '40px',
                    },
                }}
            >
                {slides.map((slide) => (
                    <Carousel.Slide
                        key={slide.id}
                        className="relative w-full h-full"
                        style={{
                            height: "100vh",
                            backgroundImage: `url(${slide.src})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {slide.content}
                    </Carousel.Slide>
                ))}
            </Carousel>

            <div className="absolute bottom-14 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex z-10 gap-4 items-center">
                <button
                    className={`p-2 rounded-full ${canScrollPrev ? 'cursor-pointer' : ''}`}
                    aria-label="Previous Slide"
                    onClick={() => embla?.scrollPrev()}
                    disabled={!canScrollPrev}
                    style={{ opacity: canScrollPrev ? 1 : 0.5 }}
                >
                    <IconChevronLeft size={24} />
                </button>
                <div className="py-3 px-5 rounded-full bg-opacity-50 bg-white flex gap-2">
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={`w-2 h-2 mx-0.5 rounded-full ${index === currentIndex ? 'bg-gray-900' : 'bg-gray-400'}`}
                        />
                    ))}
                </div>
                <button
                    className={`p-2 rounded-full ${canScrollNext ? 'cursor-pointer' : ''}`}
                    aria-label="Next Slide"
                    onClick={() => embla?.scrollNext()}
                    disabled={!canScrollNext}
                    style={{ opacity: canScrollNext ? 1 : 0.5 }}
                >
                    <IconChevronRight size={24} />
                </button>
            </div>
        </div>
    );
}
