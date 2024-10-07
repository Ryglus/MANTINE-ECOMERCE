import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollManager = () => {
    const [wasScrolled, setWasScrolled] = useState(false);
    const [isScrolled, setIsScrolled] = useState(wasScrolled);

    const location = useLocation();

    const handleScroll = () => {
        if (window.scrollY > 150) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };
    
    useEffect(() => {
        setWasScrolled(isScrolled);
        
        setIsScrolled(window.scrollY > 150);
        
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isScrolled, location]);

    return { isScrolled };
};
