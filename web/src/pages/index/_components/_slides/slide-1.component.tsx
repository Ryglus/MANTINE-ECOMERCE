import {Button, Container, Stack, Text, Title} from '@mantine/core';
import {SlideViewProps} from "./slide.types";
import {Link} from "react-router-dom";

export default function SlideView2({ dragOffset, index, subtleFactor = 0.2 }: SlideViewProps) {
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
                        component={Link} to="/products/women's clothing"
                    >
                        Shop Now
                    </Button>
                </Stack>
            </Container>
        </div>
    );
}
