import {Button, Container, Stack, Text, Title} from '@mantine/core';
import {SlideViewProps} from "./slide.types";

export default function SlideView1({ dragOffset,index }: SlideViewProps) {
    const subtleFactor = 0.2;
    const basePosition = (-index) * window.innerWidth * subtleFactor;
    const translateX = basePosition + dragOffset * window.innerWidth * subtleFactor;

    return (
        <div className="absolute inset-0 bg-[#4a4066] bg-opacity-40 flex justify-center items-center">
            <Container
                size="lg"
                className="text-center"
                style={{
                    transform: `translateX(${translateX}px)`,
                    transition: 'transform 0.2s ease-out',
                }}
            >
                <Stack gap="md">
                    <Title order={1} size={48} className="font-bold">
                        Welcome to VelvetCove
                    </Title>

                    <Text size="lg" className="text-[#c0c7d8]">
                        Explore our exclusive collection of timeless clothing designed for elegance, comfort, and modern style.
                    </Text>

                    <Button
                        size="lg"
                        radius="xl"
                        variant="filled"
                        className="bg-[#72629d] text-white px-8 py-3 transition-transform duration-200 hover:scale-105"
                    >
                        Shop Now
                    </Button>
                </Stack>
            </Container>
        </div>
    );
}
