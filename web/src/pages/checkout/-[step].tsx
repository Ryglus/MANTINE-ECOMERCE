import {useParams} from '../../router';
import {Button, Container, Group, Title} from '@mantine/core';
import {Suspense, useEffect} from 'react';
import MainLayout from '../../layouts/index-layout';
import DeliveryStep from './_steps/delivery-step.component';
import PaymentStep from './_steps/payment-step.component';
import ReviewStep from './_steps/review-step.component';
import ConfirmationStep from './_steps/confirmation-step.component';
import {useCartStore} from '../../store/cart-store';
import {useNavigate} from 'react-router-dom';

const steps = {
    delivery: DeliveryStep,
    payment: PaymentStep,
    review: ReviewStep,
    confirmation: ConfirmationStep,
};

const stepOrder = ['delivery', 'payment', 'review', 'confirmation'];

export default function CheckoutPage() {
    const { step } = useParams('/checkout/:step?');
    const navigate = useNavigate();
    const cartItems = useCartStore((state) => state.items);
    const uniqueItemsCount = cartItems.length;

    const currentStep = step || stepOrder[0];
    const currentStepIndex = stepOrder.indexOf(currentStep);

    useEffect(() => {
        if (uniqueItemsCount < 1) {
            navigate('/cart');
        }
    }, [navigate, uniqueItemsCount]);

    const StepComponent = steps[currentStep as keyof typeof steps];

    const handleContinue = () => {
        if (currentStepIndex < stepOrder.length - 1) {
            navigate(`/checkout/${stepOrder[currentStepIndex + 1]}`);
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            navigate(`/checkout/${stepOrder[currentStepIndex - 1]}`);
        }
    };

    return (
        <MainLayout>
            <Container size="xl">
                <Title>Checkout - {currentStep.toUpperCase()}</Title>
                <Suspense fallback={<div>Loading...</div>}>
                    <StepComponent />
                </Suspense>
                <Group p="apart" mt="md">
                    <Button onClick={handleBack} disabled={currentStepIndex === 0}>
                        Back
                    </Button>
                    <Button onClick={handleContinue} disabled={currentStepIndex === stepOrder.length - 1}>
                        Continue
                    </Button>
                </Group>
            </Container>
        </MainLayout>
    );
}
