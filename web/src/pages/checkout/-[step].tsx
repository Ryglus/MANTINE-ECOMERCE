import {useParams} from '../../router';
import {Button, Container, Group, LoadingOverlay, Stepper, Title} from '@mantine/core';
import {Suspense, useEffect, useState} from 'react';
import MainLayout from '../../layouts/index-layout';
import {useCartStore} from '../../store/cart-store';
import {useNavigate} from 'react-router-dom';
import {DeliveryData, PaymentData, StepData} from "../../lib/api/dto/checkout.dto";
import {ConfirmationStep, DeliveryStep, PaymentStep, ReviewStep} from "./_steps";
import SvgPageBg from "../../components/ui/svg-page-bg.component";

const steps = {
    delivery: {
        component: DeliveryStep,
        nextButtonLabel: 'Continue',
        backButtonLabel: 'Back',
        onNext: (navigate: (path: string) => void) => navigate('/checkout/payment'),
    },
    payment: {
        component: PaymentStep,
        nextButtonLabel: 'Continue',
        backButtonLabel: 'Back',
        onNext: (navigate: (path: string) => void) => navigate('/checkout/review'),
    },
    review: {
        component: ReviewStep,
        nextButtonLabel: 'Confirm',
        backButtonLabel: 'Back',
        onNext: (navigate: (path: string) => void) => navigate('/checkout/confirmation'),
    },
    confirmation: {
        component: ConfirmationStep,
        nextButtonLabel: 'Return to Shopping',
        backButtonLabel: 'Back',
        onNext: (navigate: (path: string) => void) => navigate('/products'),
    }
};

const stepOrder = Object.keys(steps);

export default function CheckoutPage() {
    const { step } = useParams('/checkout/:step?');
    const navigate = useNavigate();
    const cartItems = useCartStore((state) => state.items);
    const uniqueItemsCount = cartItems.length;

    const [activeStep, setActiveStep] = useState(0);
    const [stepData, setStepData] = useState<StepData>({
        delivery: null, payment: null, review: null, confirmation: null
    });
    const [isStepValid, setIsStepValid] = useState(false);

    const currentStep = step || stepOrder[0];
    const currentStepIndex = stepOrder.indexOf(currentStep);

    useEffect(() => {
        if (uniqueItemsCount < 1 && activeStep < stepOrder.length-1) {
            navigate('/cart');
        } else {
            setActiveStep(currentStepIndex);
        }
    }, [currentStepIndex]);

    const handleStepMove = (toPageIndex: number) => {
        setActiveStep(currentStepIndex);
        navigate(`/checkout/${stepOrder[toPageIndex]}`);
    };

    const handleStepValidation = <T extends keyof StepData>(isValid: boolean, step: T, data: StepData[T]) => {
        setIsStepValid(isValid);
        setStepData((prev) => ({
            ...prev,
            [step]: data,
        }));
    };

    const { component: StepComponent, nextButtonLabel, backButtonLabel, onNext } = steps[currentStep as keyof typeof steps];

    return (
        <SvgPageBg>
            <MainLayout>
                <Container size="xl">
                    <Title>Checkout</Title>

                    <Stepper active={activeStep} onStepClick={(value) => { handleStepMove(value); }} allowNextStepsSelect={false} size="md" mt="md" mb="lg">
                        {stepOrder.map((step, index) => (
                            <Stepper.Step key={index} label={step.toUpperCase()} />
                        ))}
                    </Stepper>

                    <Suspense fallback={<LoadingOverlay/>}>
                        <StepComponent
                            data={stepData}
                            onValidChange={(isValid: boolean, data: DeliveryData | PaymentData | null) =>
                                handleStepValidation(isValid, currentStep as keyof StepData, data)
                            }
                        />
                    </Suspense>

                    <Group p="apart" mt="md">
                        <Button onClick={() => { handleStepMove(currentStepIndex - 1); }} disabled={currentStepIndex === 0}>
                            {backButtonLabel}
                        </Button>

                        <Button onClick={() => onNext(navigate)} disabled={!isStepValid}>
                            {nextButtonLabel}
                        </Button>
                    </Group>
                </Container>
            </MainLayout>
        </SvgPageBg>
    );
}
