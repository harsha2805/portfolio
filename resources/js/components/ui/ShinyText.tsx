import React, { useState, useCallback } from 'react';

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
    color?: string;
    shineColor?: string;
    spread?: number;
    pauseOnHover?: boolean;
    direction?: 'left' | 'right';
}

const ShinyText: React.FC<ShinyTextProps> = ({
    text,
    disabled = false,
    speed = 2,
    className = '',
    color = '#b5b5b5',
    shineColor = '#ffffff',
    spread = 120,
    pauseOnHover = false,
    direction = 'left',
}) => {
    const [isPaused, setIsPaused] = useState(false);

    const handleMouseEnter = useCallback(() => {
        if (pauseOnHover) setIsPaused(true);
    }, [pauseOnHover]);

    const handleMouseLeave = useCallback(() => {
        if (pauseOnHover) setIsPaused(false);
    }, [pauseOnHover]);

    const style: React.CSSProperties = {
        backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: disabled || isPaused
            ? 'none'
            : `shiny-text-sweep ${speed}s linear infinite`,
        animationDirection: direction === 'right' ? 'reverse' : 'normal',
    };

    return (
        <span
            className={`inline-block ${className}`}
            style={style}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {text}
        </span>
    );
};

export default ShinyText;
