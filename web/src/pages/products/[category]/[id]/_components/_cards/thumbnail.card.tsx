import { Box } from '@mantine/core';
import {useImageBackgroundColor} from "../../../../../../hooks/useImageBackgroundColor";


interface ThumbnailCardProps {
    image: string;
    isActive: boolean;
    onClick: () => void;
}

const ThumbnailCard: React.FC<ThumbnailCardProps> = ({ image, isActive, onClick }) => {
    const backgroundColor = useImageBackgroundColor(image);

    return (
        <Box
            onClick={onClick}
            style={(theme) => ({
                cursor: 'pointer',
                border: isActive ? `2px solid ${theme.colors.blue[6]}` : 'none',
                borderRadius: theme.radius.sm,
                overflow: 'hidden',
                aspectRatio: '1 / 1'
            })}
        >
            <div
                className="flex items-center justify-center"
                style={{
                    background: backgroundColor || '#f5f5f5',
                }}
            >
                <img
                    src={image}
                    alt={"thumbnail"}
                    className="object-contain h-full w-full"
                />
            </div>
        </Box>
    );
};

export default ThumbnailCard;
