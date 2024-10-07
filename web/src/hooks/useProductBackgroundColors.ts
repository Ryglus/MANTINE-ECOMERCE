import { useState, useEffect } from "react";
import {getImageBackgroundColor} from "../utils/getImageBackgroundColor";

export const useProductBackgroundColors = (images: string[] | undefined) => {
    const [backgroundColors, setBackgroundColors] = useState<Record<number, string>>({});

    useEffect(() => {
        if (images) {
            const colorPromises = images.map(async (imageUrl, index) => {
                const bgColor = await getImageBackgroundColor(imageUrl);
                setBackgroundColors((prev) => ({
                    ...prev,
                    [index]: bgColor,
                }));
            });

            Promise.all(colorPromises);
        }
    }, [images]);

    return backgroundColors;
};
