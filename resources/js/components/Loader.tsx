import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const LOAD_DURATION = 2400; // ms to reach 100%
const EXIT_DELAY = 350;     // ms pause at 100% before splitting
const SPLIT_DURATION = 900; // ms for panels to slide away

export default function Loader({ onDone }: { onDone: () => void }) {
    const [progress, setProgress] = useState(0);
    const [exiting, setExiting] = useState(false);
    const doneRef = useRef(false);

    useEffect(() => {
        let raf: number;
        let start: number | null = null;

        const tick = (ts: number) => {
            if (!start) start = ts;
            const t = Math.min((ts - start) / LOAD_DURATION, 1);
            // ease-in-out cubic: fast start → slow near 100
            const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            setProgress(Math.floor(eased * 100));

            if (t < 1) {
                raf = requestAnimationFrame(tick);
            } else if (!doneRef.current) {
                doneRef.current = true;
                setTimeout(() => {
                    setExiting(true);
                    setTimeout(onDone, SPLIT_DURATION);
                }, EXIT_DELAY);
            }
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [onDone]);

    const panelTransition = {
        duration: SPLIT_DURATION / 1000,
        ease: [0.76, 0, 0.24, 1] as const,
    };

    return (
        <>
            {/* ── Top panel ── */}
            <motion.div
                className="fixed top-0 inset-x-0 z-[9997] bg-[#030303]"
                style={{ height: '50vh' }}
                animate={exiting ? { y: '-100%' } : { y: '0%' }}
                transition={panelTransition}
            />

            {/* ── Bottom panel ── */}
            <motion.div
                className="fixed bottom-0 inset-x-0 z-[9997] bg-[#030303]"
                style={{ height: '50vh' }}
                animate={exiting ? { y: '100%' } : { y: '0%' }}
                transition={panelTransition}
            />

            {/* ── Content ── */}
            <motion.div
                className="fixed inset-0 z-[9998] flex flex-col items-center justify-center pointer-events-none select-none"
                animate={exiting ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.25 }}
            >
                {/* Scanlines */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)',
                    }}
                />

                {/* Vignette */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
                    }}
                />

                {/* Monogram */}
                <motion.div
                    className="relative text-center"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                >
                    <div
                        className="font-bold leading-none tracking-tighter"
                        style={{
                            fontSize: 'clamp(5rem, 14vw, 10rem)',
                            background: 'linear-gradient(135deg, #ffffff 0%, #c4b5fd 40%, #7c3aed 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        HS
                    </div>
                    <p className="text-xs font-mono tracking-[0.45em] text-white/25 uppercase mt-3">
                        Holostack
                    </p>
                </motion.div>

                {/* Progress bar — pinned to bottom */}
                <motion.div
                    className="absolute bottom-10 inset-x-0 px-10 md:px-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="flex justify-between items-center mb-2.5">
                        <span className="text-[10px] font-mono tracking-[0.3em] text-white/20 uppercase">
                            Loading
                        </span>
                        <span className="text-[10px] font-mono text-white/35 tabular-nums">
                            {String(progress).padStart(3, '0')}%
                        </span>
                    </div>

                    {/* Track */}
                    <div className="w-full h-px bg-white/8 relative overflow-hidden">
                        {/* Fill */}
                        <div
                            className="absolute inset-y-0 left-0 bg-white/50 transition-none"
                            style={{ width: `${progress}%` }}
                        />
                        {/* Glow tip */}
                        <div
                            className="absolute top-0 bottom-0 w-16 -translate-x-full"
                            style={{
                                left: `${progress}%`,
                                background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.8))',
                            }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}
