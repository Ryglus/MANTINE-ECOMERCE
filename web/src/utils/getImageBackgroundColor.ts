export const getImageBackgroundColor = (imageSrc: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imageSrc;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
                resolve(`rgb(${r}, ${g}, ${b})`);
            } else {
                reject('Could not get context');
            }
        };

        img.onerror = () => reject('Image load failed');
    });
};
