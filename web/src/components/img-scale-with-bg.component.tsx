import {useImageBackgroundColor} from "../hooks/useImageBackgroundColor";
import {ComponentProps} from "react";

interface ImgProps extends ComponentProps<'img'> {
    img: string;
    alt: string;
}

export default function ImgScaleWithBg({ img, alt, ...rest }: ImgProps) {
    const backgroundColor = useImageBackgroundColor(img);

    return (
        <div style={{background: backgroundColor || '#f5f5f5'}} {...rest}>
            <img
                {...rest}
                src={img}
                alt={alt}
                className="object-contain h-full w-full"
            />
        </div>
    );
}
