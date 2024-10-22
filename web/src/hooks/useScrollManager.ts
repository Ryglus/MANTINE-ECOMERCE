import {useState} from 'react';
import {useHeadroom} from '@mantine/hooks';

export default function useScrollManager() {
    const [isScrolled, setIsScrolled] = useState(false);

    useHeadroom({
        fixedAt: 150,
        onFix: () => setIsScrolled(false),
        onRelease: () => setIsScrolled(true),
    });

    return { isScrolled };
}
