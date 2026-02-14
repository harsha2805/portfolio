import { useEffect, useState } from 'react';

export default function Loader() {
    const [isVisible, setIsVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1500); // Loader visible for 1.5 seconds

        const removalTimer = setTimeout(() => {
            setShouldRender(false);
        }, 2000); // Wait for transition to finish before unmounting

        return () => {
            clearTimeout(timer);
            clearTimeout(removalTimer);
        };
    }, []);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-500 will-change-transform ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            <div className="flex flex-col items-center justify-center space-y-4">
                {/* Rockstar-style Logo/Text */}
                <div className="animate-pulse">
                    <h1 className="text-4xl font-bold tracking-[0.2em] text-white uppercase sm:text-6xl md:text-8xl font-sans" style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
                        PORTFOLIO
                    </h1>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                    <div className="h-1 w-1 rounded-full bg-white opacity-50 animate-bounce delay-75"></div>
                    <div className="h-1 w-1 rounded-full bg-white opacity-50 animate-bounce delay-150"></div>
                    <div className="h-1 w-1 rounded-full bg-white opacity-50 animate-bounce delay-300"></div>
                </div>
                <p className="mt-8 text-xs tracking-widest text-neutral-500 uppercase">
                    EST. 2026
                </p>
            </div>
        </div>
    );
}
