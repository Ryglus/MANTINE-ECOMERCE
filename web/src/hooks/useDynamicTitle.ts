import {useEffect} from 'react';

export default function useDynamicTitle(
    title: string
) {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = "VelvetCove | "+title;
        return () => {
            document.title = previousTitle;
        };
    }, [title]);
};
