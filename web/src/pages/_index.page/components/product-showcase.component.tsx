import {Button, Container, Group} from "@mantine/core";


export default function ProductShowcase() {
    return (
        <Container className="mt-5 min-h-dvh">
           <Group>
               <Button>Popular</Button>
               <Button>Newcommers</Button>
               <Button>On sale</Button>
               <Button>who knows</Button>
           </Group>
        </Container>
    );
}
