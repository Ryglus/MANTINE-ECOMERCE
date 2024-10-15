import {Button, Container, Stack, Text, Title} from '@mantine/core';
import {SlideViewProps} from "./slide.types";

export default function SlideView3({ dragOffset, index }: SlideViewProps) {
    const subtleFactor = 0.2;
    const basePosition = (-index) * window.innerWidth * subtleFactor;
    const translateX = basePosition + dragOffset * window.innerWidth * subtleFactor;

    return (
        <div className="absolute inset-0 bg-opacity-20 bg-[#4a4066] flex justify-start items-end pb-32">
            <Container
                size="lg"
                className="text-left"
                style={{
                    transform: `translateX(${translateX}px)`,
                    transition: 'transform 0.2s ease-out', // Smooth transition for the parallax effect
                }}
            >
                <Stack gap="md">
                    <Title order={1} size={42} className="font-bold text-[#edeff4]">
                        Discover Unique Styles
                    </Title>
                    <Text size="lg" className="text-[#c0c7d8]">
                        Find your signature look with our exclusive, handpicked collection designed for your taste.
                    </Text>
                    <Button
                        size="lg"
                        radius="xl"
                        variant="filled"
                        className="bg-[#8968a1] text-white px-8 py-3 transition-transform duration-200 hover:bg-[#72629d]"
                    >
                        Browse Collection
                    </Button>
                </Stack>
            </Container>
        </div>
    );
}
