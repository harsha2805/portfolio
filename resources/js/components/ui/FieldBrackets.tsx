import { motion } from 'motion/react';
import React, { cloneElement, useState } from 'react';

interface FieldBracketsProps {
    children: React.ReactElement;
    color?: string;
    size?: number;
}

const lineTransition = { duration: 0.2, ease: 'easeOut' as const };
const THICKNESS = 1.5;
const OFFSET = -4;

const corners = [
    // top-left ┌
    { container: { top: OFFSET, left: OFFSET }, h: { top: 0, left: 0 }, v: { top: 0, left: 0 } },
    // top-right ┐
    { container: { top: OFFSET, right: OFFSET }, h: { top: 0, right: 0 }, v: { top: 0, right: 0 } },
    // bottom-left └
    { container: { bottom: OFFSET, left: OFFSET }, h: { bottom: 0, left: 0 }, v: { bottom: 0, left: 0 } },
    // bottom-right ┘
    { container: { bottom: OFFSET, right: OFFSET }, h: { bottom: 0, right: 0 }, v: { bottom: 0, right: 0 } },
] as const;

export default function FieldBrackets({ children, color = '#a855f7', size = 14 }: FieldBracketsProps) {
    const [focused, setFocused] = useState(false);

    const child = children as React.ReactElement<{
        onFocus?: React.FocusEventHandler;
        onBlur?: React.FocusEventHandler;
    }>;

    return (
        <div className="relative">
            {corners.map((corner, i) => (
                <div key={i} className="absolute pointer-events-none z-10" style={corner.container}>
                    {/* Horizontal arm */}
                    <motion.div
                        className="absolute"
                        style={{ ...corner.h, height: THICKNESS, background: color }}
                        initial={{ width: 0, opacity: 0 }}
                        animate={focused ? { width: size, opacity: 1 } : { width: 0, opacity: 0 }}
                        transition={lineTransition}
                    />
                    {/* Vertical arm */}
                    <motion.div
                        className="absolute"
                        style={{ ...corner.v, width: THICKNESS, background: color }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={focused ? { height: size, opacity: 1 } : { height: 0, opacity: 0 }}
                        transition={{ ...lineTransition, delay: 0.05 }}
                    />
                </div>
            ))}

            {cloneElement(child, {
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
    );
}
