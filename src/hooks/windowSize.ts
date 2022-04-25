import { useEffect, useState } from 'react';

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
        width: 640,
        height: 480,
    });
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };
            window.addEventListener('resize', handleResize);
            handleResize();
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
};
