import { useState, useEffect, useRef } from 'react';
import { Button, Container } from "@mantine/core";

export default function ProductShowcaseButtonGroup() {
    const [isVisible, setIsVisible] = useState(false);
    const buttonGroupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            { threshold: 0.2 }
        );

        if (buttonGroupRef.current) {
            observer.observe(buttonGroupRef.current);
        }

        return () => {
            if (buttonGroupRef.current) {
                observer.unobserve(buttonGroupRef.current);
            }
        };
    }, []);

    return (
        <Container>
            <div
                ref={buttonGroupRef}
                className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 ease-in-out transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
                <Button size="lg" fullWidth>
                    Popular
                </Button>
                <Button size="lg" fullWidth>
                    New Releases
                </Button>
                <Button size="lg" fullWidth>
                    On Sale
                </Button>
                <Button size="lg" fullWidth>
                    Who Knows
                </Button>
            </div>
        </Container>
    );
}
