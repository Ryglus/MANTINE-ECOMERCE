import {Button, Paper} from '@mantine/core';
import {IconChevronLeft, IconChevronRight} from '@tabler/icons-react';
import {EmblaCarouselType} from "embla-carousel-react";

interface SlideNavigationProps {
    embla: EmblaCarouselType | null;
    canScrollPrev: boolean;
    canScrollNext: boolean;
    currentIndex: number;
    slides: number;
}

export default function FsCarouselNavigation(
    {
        embla,
        canScrollPrev,
        canScrollNext,
        currentIndex,
        slides,
    }: SlideNavigationProps) {

    const slideIndicators = Array.from({ length: slides });
    return (
        <div
            className="absolute bottom-5 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex z-10 gap-3 items-center">
            <Button
                className={`p-2 rounded-full ${canScrollPrev ? 'cursor-pointer' : ''}`}
                aria-label="Previous Slide"
                bg="none"
                onClick={() => embla?.scrollPrev()}
                disabled={!canScrollPrev}
                c="white"
                opacity={canScrollPrev ? 1 : 0.5}
            >
                <IconChevronLeft size={24}/>
            </Button>

            <Paper
                className="py-2.5 px-5 rounded-full flex gap-2 opacity-80" bg="bg.7"
            >
                {slideIndicators.map((_, index) => (
                    <Paper
                        key={index}
                        className={`w-2 h-2 mx-0.5 rounded-full ${index !== currentIndex ? 'cursor-pointer' : ''}`}
                        onClick={() => embla?.scrollTo(index)}
                        bg={index === currentIndex ? "bg.9" : "bg.0"}
                    />
                ))}
            </Paper>

            <Button
                className={`p-2 rounded-full ${canScrollNext ? 'cursor-pointer' : ''}`}
                aria-label="Next Slide"
                bg="none"
                onClick={() => embla?.scrollNext()}
                disabled={!canScrollNext}
                c="white"
                opacity={canScrollNext ? 1 : 0.5}
            >
                <IconChevronRight size={24}/>
            </Button>
        </div>
    );
}
