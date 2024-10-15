import {Button, Container} from "@mantine/core";
import {useInViewport} from '@mantine/hooks';

const buttons = ['Popular', 'New Releases', 'On Sale', 'Who Knows'];

export default function ProductShowcaseButtonGroup() {
    const { ref, inViewport } = useInViewport();

    return (
        <Container size="xl">
            <div
                ref={ref}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 my-5 lg:my-10"
            >
                {buttons.map((label, index) => (
                    <Button
                        key={label}
                        size="lg"
                        fullWidth
                        variant="filled"
                        color="bg"
                        className={`transition-all duration-700 ease-in-out transform ${
                            inViewport ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        style={{
                            transitionProperty: 'transform, opacity',
                            transition: `background-color 200ms ease, transform ${700+ index * 500}ms ease, opacity ${700+ index * 500}ms ease`,
                        }}
                    >
                        {label}
                    </Button>
                ))}
            </div>
        </Container>
    );
}
