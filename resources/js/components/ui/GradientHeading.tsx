import { motion } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

type GradientHeadingProps = {
    text: string;
    className?: string;
};

export default function GradientHeading({ text, className = '' }: GradientHeadingProps) {
    const ref = useRef<HTMLHeadingElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className={`${className} animate-gradient-text`}
            style={{
                backgroundImage: 'linear-gradient(90deg, #ffffff 0%, #a78bfa 30%, #7c3aed 55%, #c4b5fd 75%, #ffffff 100%)',
                backgroundSize: '300% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
            }}
        >
            {text}
        </motion.h2>
    );
}
