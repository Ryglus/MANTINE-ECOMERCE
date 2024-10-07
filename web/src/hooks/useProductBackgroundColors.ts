import { useState, useEffect } from "react";
import { getImageBackgroundColor } from "../utils/getImageBackgroundColor";

export const useImageBackgroundColor = (imageUrl: string) => {
    const [backgroundColor, setBackgroundColor] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        getImageBackgroundColor(imageUrl).then((color) => {
            if (isMounted) {
                setBackgroundColor(color);
            }
        }).catch(() => {
            if (isMounted) {
                setBackgroundColor('#f5f5f5');
            }
        });

        return () => {
            isMounted = false;
        };
    }, [imageUrl]);

    return backgroundColor;
};
