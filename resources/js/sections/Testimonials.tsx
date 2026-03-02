import Grainient from '@/components/ui/Grainient';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const testimonials = [
    {
        quote: "Harsha shipped a complete redesign in two weeks. Clean code, smooth animations, and he anticipated edge cases I hadn't even considered.",
        name: "Arjun Mehta",
        role: "Founder, Nexaflow",
        initials: "AM",
    },
    {
        quote: "Working with Harsha was genuinely different. He doesn't just build what you ask — he thinks about what you actually need.",
        name: "Priya Nair",
        role: "Product Manager, TechVault",
        initials: "PN",
    },
    {
        quote: "One of the sharpest engineers I've worked alongside. His attention to performance and UI detail is rare at any experience level.",
        name: "Karan Shetty",
        role: "Senior Engineer, CloudEdge",
        initials: "KS",
    },
    {
        quote: "Harsha has an eye for design that most developers simply don't have. Every component he touched felt polished and intentional.",
        name: "Meera Iyer",
        role: "Design Lead, Pixelcraft",
        initials: "MI",
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
    }, [paused]);

    const t = testimonials[current];

    return (
        <section id="testimonials" className="py-24 px-6 bg-[#050505]">
            <div className="max-w-5xl mx-auto">
                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    <span className="text-xs font-mono text-purple-400/60 tracking-[0.3em] uppercase">
                        05 / Testimonials
                    </span>
                </motion.div>

                {/* Compact card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    className="relative overflow-hidden rounded-2xl"
                >
                    {/* Grainient background */}
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

                    {/* Content */}
                    <div className="relative flex flex-col items-center text-center gap-6 px-8 py-12 md:px-16 md:py-14">
                        {/* Rotating quote */}
                        <div className="min-h-[72px] flex items-center">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={current}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                    className="text-white/90 text-base md:text-xl font-light leading-relaxed max-w-2xl"
                                >
                                    &ldquo;{t.quote}&rdquo;
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        {/* Author */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`author-${current}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
                                    <span className="text-white text-[10px] font-semibold tracking-wide">
                                        {t.initials}
                                    </span>
                                </div>
                                <div className="text-left">
                                    <div className="text-white text-sm font-semibold leading-none mb-0.5">
                                        {t.name}
                                    </div>
                                    <div className="text-white/50 text-xs font-mono">
                                        {t.role}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Progress dots */}
                        <div className="flex items-center gap-1.5">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`h-1 rounded-full transition-all duration-300 ${
                                        i === current ? 'w-5 bg-white' : 'w-1 bg-white/30 hover:bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* CTA */}
                        <Link
                            to="/testimonials"
                            className="px-6 py-2 bg-white text-purple-700 text-sm font-semibold rounded-full hover:bg-purple-50 transition-colors duration-300"
                        >
                            View All Reviews
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
