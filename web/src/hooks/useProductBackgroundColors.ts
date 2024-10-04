import { useState, useEffect } from "react";

import {Product} from "../lib/api/dto/product.dto";
import {getImageBackgroundColor} from "../utils/getImageBackgroundColor";

export const useProductBackgroundColors = (products: Product[] | undefined) => {
    const [backgroundColors, setBackgroundColors] = useState<Record<number, string>>({});

    useEffect(() => {
        if (products) {
            const colorPromises = products.map(async (product) => {
                const bgColor = await getImageBackgroundColor(product.image);
                setBackgroundColors((prev) => ({
                    ...prev,
                    [product.id]: bgColor,
                }));
            });

            Promise.all(colorPromises);
        }
    }, [products]);

    return backgroundColors;
};
