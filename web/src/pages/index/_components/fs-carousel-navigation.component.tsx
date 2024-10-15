import {useMantineTheme} from '@mantine/core';
import {IconChevronLeft, IconChevronRight} from '@tabler/icons-react';
import {EmblaCarouselType} from "embla-carousel-react";

interface SlideNavigationProps {
    embla: EmblaCarouselType | null;
    canScrollPrev: boolean;
    canScrollNext: boolean;
    currentIndex: number;
    slides: number;
}

export default function FsCarouselNavigation({
                                            embla,
                                            canScrollPrev,
                                            canScrollNext,
                                            currentIndex,
                                            slides,
                                        }: SlideNavigationProps) {
    const theme = useMantineTheme();
    const slideIndicators = Array.from({ length: slides });
    return (
        <div
            className="absolute bottom-5 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex z-10 gap-3 items-center">
            <button
                className={`p-2 rounded-full ${canScrollPrev ? 'cursor-pointer' : ''}`}
                aria-label="Previous Slide"
                onClick={() => embla?.scrollPrev()}
                disabled={!canScrollPrev}
                style={{
                    opacity: canScrollPrev ? 1 : 0.5,
                    color: theme.white,
                }}
            >
                <IconChevronLeft size={24}/>
            </button>

            <div
                className="py-2.5 px-5 rounded-full flex gap-2"
                style={{
                    backgroundColor: theme.colors.bg[7],
                    opacity: 0.8,
                }}
            >
                {slideIndicators.map((_, index) => (
                    <span
                        key={index}
                        className={`w-2 h-2 mx-0.5 rounded-full ${index !== currentIndex ? 'cursor-pointer' : ''}`}
                        onClick={() => embla?.scrollTo(index)}
                        style={{
                            backgroundColor:
                                index === currentIndex
                                    ? theme.colors.bg[9]
                                    : theme.colors.bg[0],
                        }}
                    />
                ))}
            </div>

            <button
                className={`p-2 rounded-full ${canScrollNext ? 'cursor-pointer' : ''}`}
                aria-label="Next Slide"
                onClick={() => embla?.scrollNext()}
                disabled={!canScrollNext}
                style={{
                    opacity: canScrollNext ? 1 : 0.5,
                    color: theme.white,
                }}
            >
                <IconChevronRight size={24}/>
            </button>
        </div>
    );
}
