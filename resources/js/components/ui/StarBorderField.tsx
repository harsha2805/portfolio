import React, { useState } from 'react';

interface StarBorderFieldProps {
    children: React.ReactElement<React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>>;
    color?: string;
    speed?: string;
}

export default function StarBorderField({
    children,
    color = '#a855f7',
    speed = '4s',
}: StarBorderFieldProps) {
    const [focused, setFocused] = useState(false);

    const child = children as React.ReactElement<{
        onFocus?: React.FocusEventHandler;
        onBlur?: React.FocusEventHandler;
    }>;

    return (
        <div
            className="relative overflow-hidden rounded-xl"
            style={{
                padding: '1px',
                background: focused ? 'transparent' : 'rgba(255,255,255,0.1)',
                transition: 'background 0.3s ease',
            }}
        >
            {/* Bottom travelling star */}
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: '300%',
                    height: '50%',
                    bottom: '-11px',
                    right: '-250%',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    opacity: focused ? 0.85 : 0,
                    transition: 'opacity 0.3s ease',
                    animation: `star-movement-bottom ${speed} linear infinite alternate`,
                }}
            />

            {/* Top travelling star */}
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: '300%',
                    height: '50%',
                    top: '-11px',
                    left: '-250%',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    opacity: focused ? 0.85 : 0,
                    transition: 'opacity 0.3s ease',
                    animation: `star-movement-top ${speed} linear infinite alternate`,
                }}
            />

            {/* Field */}
            <div className="relative z-10">
                {/* @ts-expect-error — cloneElement across input/textarea union */}
                {React.cloneElement(child, {
                    onFocus: (e: React.FocusEvent) => {
                        setFocused(true);
                        child.props.onFocus?.(e as never);
                    },
                    onBlur: (e: React.FocusEvent) => {
                        setFocused(false);
                        child.props.onBlur?.(e as never);
                    },
                })}
            </div>
        </div>
    );
}
