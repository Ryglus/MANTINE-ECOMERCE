import {Box} from '@mantine/core';
import ImgScaleWithBg from "../../../../../../components/common/img-scale-with-bg.component";
import React from "react";

interface ThumbnailCardProps {
    image: string;
    isActive: boolean;
    onClick: () => void;
}

const ThumbnailCard: React.FC<ThumbnailCardProps> = ({ image, isActive, onClick }) => {
    return (
        <Box
            onClick={onClick}
            className={`relative cursor-pointer overflow-hidden ${isActive ? 'border-2 border-purple-700' : ''}`}
            style={{
                aspectRatio: '1 / 1'
            }}
        >
            <div className="flex items-center justify-center w-full h-full">
                <ImgScaleWithBg
                    img={image}
                    alt={image}
                    className="h-full w-full object-contain"
                />
            </div>
        </Box>
    );
};

export default ThumbnailCard;
