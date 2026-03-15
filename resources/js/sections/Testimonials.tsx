import GradientHeading from '@/components/ui/GradientHeading';
import Grainient from '@/components/ui/Grainient';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const testimonials = [
    {
        quote: "Harsha shipped a complete redesign in two weeks. Clean code, smooth animations, and he anticipated edge cases I hadn't even considered.",
        name: 'Arjun Mehta',
        role: 'Founder, Nexaflow',
        initials: 'AM',
    },
    {
        quote: "Working with Harsha was genuinely different. He doesn't just build what you ask — he thinks about what you actually need.",
        name: 'Priya Nair',
        role: 'Product Manager, TechVault',
        initials: 'PN',
    },
    {
        quote: "One of the sharpest engineers I've worked alongside. His attention to performance and UI detail is rare at any experience level.",
        name: 'Karan Shetty',
        role: 'Senior Engineer, CloudEdge',
        initials: 'KS',
    },
    {
        quote: "Harsha has an eye for design that most developers simply don't have. Every component he touched felt polished and intentional.",
        name: 'Meera Iyer',
        role: 'Design Lead, Pixelcraft',
        initials: 'MI',
    },
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [current, paused]);

    const t = testimonials[current];

    return (
        <section id="testimonials" className="py-16 md:py-32 px-6 bg-[#050505]">
            <div className="max-w-5xl mx-auto">
                {/* Label */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-4"
                >
                    <span className="text-xs font-mono text-purple-400/60 tracking-[0.3em] uppercase">
                        05 / Testimonials
                    </span>
                </motion.div>

                <GradientHeading
                    text="Kind words."
                    className="text-4xl md:text-5xl font-bold leading-tight mb-16"
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    className="grid md:grid-cols-[200px_1fr] gap-4 items-stretch"
                >
                    {/* Left — navigator */}
                    <div className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-1 md:pb-0">
                        {testimonials.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`relative group flex-shrink-0 md:flex-shrink text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                                    i === current
                                        ? 'bg-white/[0.06]'
                                        : 'hover:bg-white/[0.03]'
                                }`}
                            >
                                {/* Active left bar */}
                                {i === current && (
                                    <motion.span
                                        layoutId="activeBar"
                                        className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-purple-500"
                                    />
                                )}
                                <span
                                    className={`text-[10px] font-mono shrink-0 transition-colors duration-300 ${
                                        i === current ? 'text-purple-400' : 'text-white/20'
                                    }`}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div className="min-w-0">
                                    <div
                                        className={`text-sm font-medium truncate transition-colors duration-300 ${
                                            i === current ? 'text-white' : 'text-white/35'
                                        }`}
                                    >
                                        {item.name}
                                    </div>
                                    <div
                                        className={`text-[10px] font-mono truncate transition-colors duration-300 ${
                                            i === current ? 'text-purple-400/60' : 'text-white/15'
                                        }`}
                                    >
                                        {item.role}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Right — quote card */}
                    <div className="relative overflow-hidden rounded-2xl min-h-[220px] md:min-h-[280px]">
                        {/* Grainient bg */}
                        <div className="absolute inset-0">
                            <Grainient
                                color1="#a855f7"
                                color2="#7c3aed"
                                color3="#3b0764"
                                grainAmount={0.08}
                                grainScale={3.0}
                                timeSpeed={0.15}
                                warpStrength={0.8}
                                warpFrequency={4.0}
                                contrast={1.3}
                                saturation={1.1}
                                zoom={0.85}
                            />
                        </div>

                        {/* Giant decorative quote mark */}
                        <div
                            aria-hidden
                            className="absolute -top-4 left-6 text-[80px] md:text-[160px] leading-none font-black select-none pointer-events-none"
                            style={{ color: 'rgba(255,255,255,0.05)' }}
                        >
                            &ldquo;
                        </div>

                        <div className="relative flex flex-col justify-between h-full gap-6 px-5 py-6 md:gap-8 md:px-12 md:py-10">
                            {/* Word-by-word quote */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.25 }}
                                    className="text-white/90 text-lg md:text-xl font-light leading-relaxed"
                                >
                                    {t.quote.split(' ').map((word, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                            transition={{ duration: 0.25, delay: 0.05 + i * 0.028 }}
                                            className="inline-block mr-[0.28em]"
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            </AnimatePresence>

                            {/* Author + progress */}
                            <div className="flex flex-col gap-5">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`author-${current}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ duration: 0.3, delay: 0.15 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
                                            <span className="text-white text-[10px] font-bold tracking-wide">
                                                {t.initials}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="text-white text-sm font-semibold leading-none mb-1">
                                                {t.name}
                                            </div>
                                            <div className="text-white/50 text-xs font-mono">
                                                {t.role}
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Progress bar */}
                                <div className="relative h-px bg-white/10 rounded-full">
                                    <div
                                        key={current}
                                        className="absolute inset-y-0 left-0 bg-white/25 rounded-full"
                                        style={{
                                            animation: 'progress-fill 5s linear forwards',
                                            animationPlayState: paused ? 'paused' : 'running',
                                        }}
                                    >
                                        {/* Glow dot at leading edge */}
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400"
                                            style={{ boxShadow: '0 0 6px 3px rgba(167,139,250,0.8)' }}
                                        />
                                    </div>
                                </div>

                                {/* CTA */}
                                <Link
                                    to="/testimonials"
                                    className="group self-start flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-md border border-white/[0.15] hover:border-white/[0.25] rounded-full px-5 py-2 transition-all duration-300"
                                >
                                    <span className="text-white/80 group-hover:text-white text-xs font-mono tracking-widest uppercase transition-colors duration-300">
                                        View all
                                    </span>
                                    <span className="text-white/40 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all duration-300 text-sm">
                                        →
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
