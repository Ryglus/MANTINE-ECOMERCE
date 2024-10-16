import {useCallback, useEffect, useState} from 'react';
import {Carousel, Embla} from '@mantine/carousel';
import FsCarouselNavigation from "./fs-carousel-navigation.component";
import SlideView1 from "./_slides/slide-1.component";
import SlideView2 from "./_slides/slide-2.component";
import SlideView3 from "./_slides/slide-3.component";

export default function FsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [embla, setEmbla] = useState<Embla | null>(null);
    const [dragOffset, setDragOffset] = useState(0);
    const [canScrollNext, setCanScrollNext] = useState(true);
    const [canScrollPrev, setCanScrollPrev] = useState(false);

    const slides = [
        {
            id: 1,
            src: '/slides/slide3.webp',
            alt: 'Slide 1',
            content: (
                <SlideView1 index={0} dragOffset={dragOffset} />
            ),
        },
        {
            id: 2,
            src: '/slides/slide2.webp',
            alt: 'Slide 2',
            content: (
                <SlideView2 index={0.5} dragOffset={dragOffset} />
            ),
        },
        {
            id: 3,
            src: '/slides/slide6.webp',
            alt: 'Slide 3',
            content: (
                <SlideView3 index={1} dragOffset={dragOffset} />
            ),
        },
    ];

    const handleScroll = useCallback(() => {
        if (!embla) return;
        const progress = embla.scrollProgress();
        requestAnimationFrame(() => {
            setDragOffset(progress);
        });
    }, [embla]);

    const updateButtonStates = useCallback(() => {
        if (!embla) return;
        setCanScrollNext(embla.canScrollNext());
        setCanScrollPrev(embla.canScrollPrev());
    }, [embla]);

    useEffect(() => {
        if (embla) {
            embla.on('select', updateButtonStates);
            embla.on('pointerUp', () => document.body.style.cursor = 'default');
            embla.on('pointerDown', () => document.body.style.cursor = 'grabbing');
            embla.on('scroll', handleScroll);
            updateButtonStates();
        }
    }, [embla, updateButtonStates]);

    return (
        <div className="relative w-full h-screen">
            <Carousel
                height="100%"
                slideSize="100%"
                withControls={false}
                getEmblaApi={setEmbla}
                onSlideChange={(index) => setCurrentIndex(index)}
            >
                {slides.map((slide) => (
                    <Carousel.Slide
                        key={slide.id}
                        className="relative w-full h-full"
                        style={{
                            height: '100vh',
                            backgroundImage: `url(${slide.src})`,
                            backgroundSize: 'cover',
                            objectFit: 'cover',
                            backgroundPosition: 'top center',
                        }}
                    >
                        {slide.content}
                    </Carousel.Slide>
                ))}
            </Carousel>
            <FsCarouselNavigation embla={embla} canScrollNext={canScrollNext} canScrollPrev={canScrollPrev} currentIndex={currentIndex} slides={slides.length} />
        </div>
    );
}
