import {Button, Container, Stack, Text, Title} from '@mantine/core';
import {SlideViewProps} from "./slide.types";
import {Link} from "react-router-dom";

export default function SlideView2({ dragOffset, index, subtleFactor=0.2 }: SlideViewProps) {
    const basePosition = (-index) * window.innerWidth * subtleFactor;
    const translateX = basePosition + dragOffset * window.innerWidth * subtleFactor;

    return (
        <div className="absolute inset-0 bg-[#4a4066] bg-opacity-40 flex items-start justify-start pt-32">
            <Container
                size="lg"
                className="text-left"
                style={{
                    transform: `translateX(${translateX}px)`,
                    transition: 'transform 0.2s ease-out',
                }}
            >
                <Stack gap="md">
                    <Title order={1} size={48} className="font-bold text-[#edeff4]">
                        Unveil Your Style
                    </Title>
                    <Text size="lg" className="text-[#c0c7d8]">
                        Discover the latest trends and timeless designs crafted for the modern individual.
                    </Text>
                    <Button
                        size="lg"
                        radius="xl"
                        variant="outline"
                        className="border-white text-white px-8 py-3 transition-transform duration-200 hover:bg-[#72629d]"
                        component={Link} to="/products/jewelery"
                    >
                        Explore Collection
                    </Button>
                </Stack>
            </Container>
        </div>
    );
}
