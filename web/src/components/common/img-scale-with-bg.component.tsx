import {Box, BoxProps, Image, ImageProps} from '@mantine/core';
import useImageBackgroundColor from '../../hooks/useImageBackgroundColor';

interface ImgProps extends ImageProps, BoxProps {
    img: string;
    alt: string;
    loading?: "lazy" | "eager" | undefined
}

export default function ImgScaleWithBg({
                                           img,
                                           alt,
                                           loading,
                                           ...rest
                                       }: ImgProps) {
    const backgroundColor = useImageBackgroundColor(img);

    return (
        <Box
            bg={backgroundColor || 'gray.1'}
            className="relative w-full h-full"
            {...rest}
        >
            <Image
                src={img}
                alt={alt}
                className="object-contain h-full w-full"
                fit="contain"
                loading={loading}
                {...rest}
            />
        </Box>
    );
}
