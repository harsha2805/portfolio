import { motion } from 'motion/react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle({ className = '' }: { className?: string }) {
    const { isDark, toggle } = useTheme();

    return (
        <button
            onClick={toggle}
            className={`relative w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                isDark
                    ? 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15] hover:bg-white/[0.06]'
                    : 'border-black/[0.08] bg-black/[0.03] hover:border-black/[0.15] hover:bg-black/[0.06]'
            } ${className}`}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? 0 : 180, scale: [1, 0.8, 1] }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                {isDark ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                    </svg>
                )}
            </motion.div>
        </button>
    );
}
