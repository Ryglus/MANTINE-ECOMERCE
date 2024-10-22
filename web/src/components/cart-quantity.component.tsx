import {Text, useMantineTheme} from '@mantine/core';
import {IconShoppingCartFilled, IconX} from '@tabler/icons-react';

interface CartQuantityProps {
    quantity: number;
    size?: 'sm' | 'md';
    onRemove?: () => void;
}

export default function CartQuantity(
    {
        quantity,
        size = 'sm',
        onRemove
    }: CartQuantityProps) {

    const theme = useMantineTheme();

    if (quantity <= 0) return null
    return (
        <>
            {size === 'sm' && (
                <div className="relative inline-block w-[40px] h-[30px]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="absolute w-full h-full fill-current text-[#2b2033]"
                    >
                        <path
                            d="M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.29 28.71-64 64-64s64 28.71 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"
                        />
                    </svg>
                    <Text
                        size="xs"
                        fw="bold"
                        className="absolute flex items-center justify-center w-full h-full top-[4px] text-center"
                    >
                        {quantity}
                    </Text>
                </div>
            )}
            {size === 'md' && (
                <div
                    onClick={onRemove}
                    className={`relative group cursor-pointer flex justify-center items-center w-[60px] h-[60px] bg-[${theme.colors.bg[7]}] rounded-full mr-2 transition-all duration-200`}
                >
                    <IconShoppingCartFilled className="w-[80%] h-[80%] fill-[#2b2033]" />
                    <Text
                        fw="bold"
                        size="xl"
                        className="absolute flex items-center justify-center w-full h-full top-[-2px] text-center"
                    >
                        {quantity}
                    </Text>
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 rounded-full transition-opacity duration-200 group-hover:bg-opacity-50">
                        <IconX size={24} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                </div>
            )}
        </>
    );
}
