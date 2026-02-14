import type { HTMLAttributes } from 'react';
import { useEffect, useMemo, useState } from 'react';
import './RotatingText.css';

type StaggerFrom = 'first' | 'last' | 'center' | 'random' | number;

interface RotatingTextProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    texts: string[];
    mainClassName?: string;
    splitLevelClassName?: string;
    elementLevelClassName?: string;
    staggerFrom?: StaggerFrom;
    staggerDuration?: number;
    rotationInterval?: number;
}

function classNames(...items: Array<string | undefined | false>) {
    return items.filter(Boolean).join(' ');
}

export default function RotatingText({
    texts,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    staggerFrom = 'first',
    staggerDuration = 0,
    rotationInterval = 2000,
    className,
    ...rest
}: RotatingTextProps) {
    const safeTexts = texts.length > 0 ? texts : [''];
    const [index, setIndex] = useState(0);
    const currentText = safeTexts[index];

    useEffect(() => {
        if (safeTexts.length <= 1) return;

        const id = window.setInterval(() => {
            setIndex((prev) => (prev + 1) % safeTexts.length);
        }, rotationInterval);

        return () => window.clearInterval(id);
    }, [rotationInterval, safeTexts.length]);

    const characters = useMemo(() => Array.from(currentText), [currentText]);

    const getDelay = (charIndex: number, total: number) => {
        if (staggerDuration <= 0) return 0;
        if (staggerFrom === 'first') return charIndex * staggerDuration;
        if (staggerFrom === 'last') return (total - 1 - charIndex) * staggerDuration;
        if (staggerFrom === 'center') {
            const center = Math.floor(total / 2);
            return Math.abs(center - charIndex) * staggerDuration;
        }
        if (staggerFrom === 'random') return Math.random() * total * staggerDuration;
        if (typeof staggerFrom === 'number') return Math.abs(staggerFrom - charIndex) * staggerDuration;
        return charIndex * staggerDuration;
    };

    return (
        <span className={classNames('text-rotate', className, mainClassName)} {...rest}>
            <span className="text-rotate-sr-only">{currentText}</span>
            <span className={classNames('text-rotate-word', splitLevelClassName)} aria-hidden="true" key={index}>
                {characters.map((char, charIndex) => (
                    <span
                        key={`${index}-${charIndex}-${char}`}
                        className={classNames('text-rotate-element', elementLevelClassName)}
                        style={{
                            animationDelay: `${getDelay(charIndex, characters.length)}s`
                        }}
                    >
                        {char}
                    </span>
                ))}
            </span>
        </span>
    );
}
