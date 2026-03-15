import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const MIN_DISPLAY = 1200;   // ms minimum loader visibility
const EXIT_DELAY = 300;     // ms pause at 100% before splitting
const SPLIT_DURATION = 900; // ms for panels to slide away
const TIP_INTERVAL = 2200;  // ms between tip rotations

const TIPS = [
    'Mass-producing pixels...',
    'Convincing CSS to behave...',
    'Bribing the browser gods...',
    'Compiling sarcasm...',
    'Reticulating splines...',
    'Warming up the flux capacitor...',
    'Asking Stack Overflow for help...',
    'Deploying carrier pigeons...',
    'Negotiating with webpack...',
    'Feeding the hamsters...',
    'Polishing the pixels...',
    'Loading awesomeness...',
];

export default function Loader({ onDone }: { onDone: () => void }) {
    const [progress, setProgress] = useState(0);
    const [exiting, setExiting] = useState(false);
    const [tipIndex, setTipIndex] = useState(() => Math.floor(Math.random() * TIPS.length));
    const doneRef = useRef(false);

    useEffect(() => {
        let raf: number;
        let start: number | null = null;
        let assetsReady = false;
        let elapsed = 0;

        // Wait for real asset readiness
        const assetPromise = Promise.all([
            document.fonts.ready,
            new Promise<void>((resolve) => {
                if (document.readyState === 'complete') return resolve();
                window.addEventListener('load', () => resolve(), { once: true });
            }),
        ]).then(() => { assetsReady = true; });

        const finish = () => {
            if (doneRef.current) return;
            doneRef.current = true;
            setProgress(100);
            setTimeout(() => {
                setExiting(true);
                setTimeout(onDone, SPLIT_DURATION);
            }, EXIT_DELAY);
        };

        const tick = (ts: number) => {
            if (!start) start = ts;
            elapsed = ts - start;

            // Synthetic progress: ramp quickly to 90%, hold until assets ready
            const minT = Math.min(elapsed / MIN_DISPLAY, 1);
            const eased = minT < 0.5 ? 4 * minT * minT * minT : 1 - Math.pow(-2 * minT + 2, 3) / 2;
            const cap = assetsReady ? 100 : 90;
            setProgress(Math.min(Math.floor(eased * 100), cap));

            // Exit when both minimum time passed AND assets are ready
            if (elapsed >= MIN_DISPLAY && assetsReady) {
                finish();
                return;
            }

            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);

        // Safety: if assets resolve after MIN_DISPLAY already passed
        assetPromise.then(() => {
            if (elapsed >= MIN_DISPLAY) finish();
        });

        return () => cancelAnimationFrame(raf);
    }, [onDone]);

    // Rotate tips
    useEffect(() => {
        if (exiting) return;
        const id = setInterval(() => {
            setTipIndex((i) => (i + 1) % TIPS.length);
        }, TIP_INTERVAL);
        return () => clearInterval(id);
    }, [exiting]);

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
                        <div className="relative h-4 overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={tipIndex}
                                    className="text-[10px] font-mono tracking-[0.15em] text-white/25 block"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {TIPS[tipIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
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
