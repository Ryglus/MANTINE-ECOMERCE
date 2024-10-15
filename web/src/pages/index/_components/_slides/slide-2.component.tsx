import {Button, Container, Stack, Text, Title} from '@mantine/core';
import {SlideViewProps} from "./slide.types";

export default function SlideView2({ dragOffset, index }: SlideViewProps) {
    const subtleFactor = 0.2;

    // Calculate the base starting position for each slide based on its index
    const basePosition = (-index) * window.innerWidth * subtleFactor;

    // Apply the dragOffset to move the element from its base position
    const translateX = basePosition + dragOffset * window.innerWidth * subtleFactor;

    return (
        <div className="absolute inset-0 bg-[#4a4066] bg-opacity-40 flex items-start justify-start pt-32">
            <Container
                size="lg"
                className="text-left"
                style={{
                    transform: `translateX(${translateX}px)`,
                    transition: 'transform 0.2s ease-out', // Smooth transition for the parallax effect
                }}
            >
                <Stack gap="md">
                    {/* Title - Left aligned */}
                    <Title order={1} size={48} className="font-bold text-[#edeff4]">
                        Unveil Your Style
                    </Title>

                    {/* Subtitle */}
                    <Text size="lg" className="text-[#c0c7d8]">
                        Discover the latest trends and timeless designs crafted for the modern individual.
                    </Text>

                    {/* CTA Button */}
                    <Button
                        size="lg"
                        radius="xl"
                        variant="outline"
                        className="border-white text-white px-8 py-3 transition-transform duration-200 hover:bg-[#72629d]"
                    >
                        Explore Collection
                    </Button>
                </Stack>
            </Container>
        </div>
    );
}
