import GradientHeading from '@/components/ui/GradientHeading';
import { motion } from 'motion/react';
import { type ReactNode, lazy, Suspense, useRef, useEffect, useState } from 'react';

const EarthGlobe = lazy(() => import('@/components/ui/EarthGlobe'));

function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold },
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, inView };
}

function useCountUp(target: number, inView: boolean, duration = 1400) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let start: number | null = null;
        const raf = (ts: number) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
    }, [inView, target, duration]);

    return count;
}

function useISTClock() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const update = () => {
            setTime(
                new Date().toLocaleTimeString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                }),
            );
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);

    return time;
}

export default function About() {
    const { ref, inView } = useInView();
    const time = useISTClock();

    const [phase, setPhase] = useState<'idle' | 'glitching' | 'revealed'>('idle');
    const glitchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    return (
        <section id="about" className="py-16 md:py-32 px-6 bg-[#050505]">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-4"
                >
                    <span className="text-xs font-mono text-purple-400/60 tracking-[0.3em] uppercase">
                        01 / About
                    </span>
                </motion.div>

                <GradientHeading
                    text="Building things that matter."
                    className="text-4xl md:text-5xl font-bold leading-tight mb-12"
                />

                <div ref={ref} className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
                    {/* Left — paragraphs + stats */}
                    <div className="space-y-6">
                        {[
                            'I craft digital experiences that are as performant as they are purposeful. From full-stack architecture to the nuances of micro-interactions, I build with a deep reverence for detail.',
                            'Beyond the IDE, I find my rhythm in open-source collaboration and the evolving dialogue between art and technology.',
                        ].map((paragraph, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                className="text-white/60 leading-relaxed text-base"
                            >
                                {paragraph}
                            </motion.p>
                        ))}

                        <StatCards inView={inView} />
                    </div>

                    {/* Right — globe card with scanline reveal */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex justify-start"
                    >
                        <motion.div
                            onMouseEnter={() => {
                                if (glitchTimer.current) clearTimeout(glitchTimer.current);
                                setPhase('glitching');
                                glitchTimer.current = setTimeout(() => setPhase('revealed'), 380);
                            }}
                            onMouseLeave={() => {
                                if (glitchTimer.current) clearTimeout(glitchTimer.current);
                                setPhase('idle');
                            }}
                            animate={{
                                boxShadow: phase !== 'idle'
                                    ? '0 0 0 1px rgba(124,58,237,0.4), 0 8px 40px rgba(124,58,237,0.2)'
                                    : '0 0 0 1px rgba(255,255,255,0.08)',
                            }}
                            transition={{ duration: 0.3 }}
                            className="relative overflow-hidden rounded-2xl bg-[#0a0a0a] cursor-default aspect-square w-full md:w-[75%]"
                        >
                            {/* Globe — shakes during glitch phase */}
                            <div
                                className={`absolute inset-0 ${phase === 'glitching' ? 'animate-glitch' : ''}`}
                            >
                                <Suspense fallback={null}>
                                    <EarthGlobe />
                                </Suspense>
                            </div>

                            {/* Chromatic aberration layers during glitch */}
                            {phase === 'glitching' && (
                                <>
                                    <div className="absolute inset-0 z-[5] mix-blend-screen opacity-40 animate-glitch" style={{ background: 'radial-gradient(circle, rgba(255,0,80,0.6) 0%, transparent 70%)', animationDelay: '0.03s' }} />
                                    <div className="absolute inset-0 z-[5] mix-blend-screen opacity-40 animate-glitch" style={{ background: 'radial-gradient(circle, rgba(0,200,255,0.6) 0%, transparent 70%)', animationDelay: '0.07s' }} />
                                </>
                            )}

                            {/* Hard snap overlay — instant cut on reveal */}
                            <motion.div
                                initial={false}
                                animate={{ opacity: phase === 'revealed' ? 1 : 0 }}
                                transition={{ duration: 0.05 }}
                                className="absolute inset-0 bg-[#0a0a0a] z-10"
                            />

                            {/* Static flash at the moment of snap */}
                            <motion.div
                                initial={false}
                                animate={{ opacity: phase === 'revealed' ? [1, 0] : 0 }}
                                transition={{ duration: 0.15, times: [0, 1] }}
                                className="absolute inset-0 z-20 pointer-events-none"
                                style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.25), rgba(255,255,255,0.1))' }}
                            />

                            {/* Info — staggered blur-fade-up after snap */}
                            <div className="absolute inset-0 z-30 flex flex-col justify-end p-4 gap-3 md:p-7 md:gap-5">
                                <div>
                                    <GlobeInfoLine revealed={phase === 'revealed'} delay={0.04} className="text-xs font-mono text-purple-400/60 tracking-[0.25em] uppercase mb-2">
                                        BASED IN
                                    </GlobeInfoLine>
                                    <GlobeInfoLine revealed={phase === 'revealed'} delay={0.12} className="text-xl font-bold text-white leading-snug">
                                        Coimbatore, Tamil Nadu, India 🇮🇳
                                    </GlobeInfoLine>
                                    <GlobeInfoLine revealed={phase === 'revealed'} delay={0.2} className="text-white/30 font-mono text-xs mt-1">
                                        11°00′03″N&nbsp;&nbsp;76°57′48″E
                                    </GlobeInfoLine>
                                </div>

                                <div>
                                    <GlobeInfoLine revealed={phase === 'revealed'} delay={0.1} className="text-xs font-mono text-purple-400/60 tracking-[0.25em] uppercase mb-2">
                                        LOCAL TIME
                                    </GlobeInfoLine>
                                    <GlobeInfoLine revealed={phase === 'revealed'} delay={0.18} className="text-2xl font-mono font-semibold text-white tabular-nums">
                                        {time}
                                    </GlobeInfoLine>
                                    <GlobeInfoLine revealed={phase === 'revealed'} delay={0.26} className="text-white/30 font-mono text-xs mt-1">
                                        IST — UTC +5:30
                                    </GlobeInfoLine>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function GlobeInfoLine({
    children,
    revealed,
    delay = 0,
    className,
}: {
    children: ReactNode;
    revealed: boolean;
    delay?: number;
    className?: string;
}) {
    return (
        <motion.p
            className={className}
            initial={false}
            animate={revealed
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 6, filter: 'blur(6px)' }
            }
            transition={{
                duration: 0.45,
                delay: revealed ? delay : 0,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
        >
            {children}
        </motion.p>
    );
}

const NUM_STYLE = {
    backgroundImage: 'linear-gradient(160deg, #ffffff 0%, #a78bfa 40%, #7c3aed 60%, #ffffff 100%)',
    backgroundSize: '200% 200%',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'gradient-drift 4s ease infinite',
} as const;
const INFINITY_PATH = 'M30,40 C30,15 65,15 100,40 C135,65 170,65 170,40 C170,15 135,15 100,40 C65,65 30,65 30,40 Z';

function StatCards({ inView }: { inView: boolean }) {
    const years = useCountUp(3, inView, 1200);
    const projects = useCountUp(20, inView, 1800);

    return (
        <div className="pt-8 flex items-stretch gap-0 divide-x divide-white/[0.07] flex-wrap sm:flex-nowrap">
            {/* Years */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="flex flex-col gap-1.5 pr-4 sm:pr-8"
            >
                <span className="text-3xl sm:text-5xl font-black tabular-nums leading-none tracking-tight" style={NUM_STYLE}>
                    {years}<span className="text-xl sm:text-3xl">+</span>
                </span>
                <span className="text-[10px] font-mono text-white/30 tracking-[0.22em] uppercase">Years Exp.</span>
            </motion.div>

            {/* Projects */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col gap-1.5 px-4 sm:px-8"
            >
                <span className="text-3xl sm:text-5xl font-black tabular-nums leading-none tracking-tight" style={NUM_STYLE}>
                    {projects}<span className="text-xl sm:text-3xl">+</span>
                </span>
                <span className="text-[10px] font-mono text-white/30 tracking-[0.22em] uppercase">Projects</span>
            </motion.div>

            {/* Infinity */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.75 }}
                className="flex flex-col gap-1.5 pl-4 sm:pl-8"
            >
                <svg
                    viewBox="0 0 200 80"
                    className="h-12 w-auto"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(167,139,250,0.55))' }}
                >
                    <defs>
                        <linearGradient id="ig" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="50%" stopColor="#a78bfa" />
                            <stop offset="100%" stopColor="#ffffff" />
                        </linearGradient>
                    </defs>
                    <motion.path
                        d={INFINITY_PATH}
                        stroke="url(#ig)"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                        transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.9 }}
                    />
                </svg>
                <span className="text-[10px] font-mono text-white/30 tracking-[0.22em] uppercase">Coffees</span>
            </motion.div>
        </div>
    );
}
