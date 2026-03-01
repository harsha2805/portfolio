import EarthGlobe from '@/components/ui/EarthGlobe';
import GradientHeading from '@/components/ui/GradientHeading';
import PixelTransition from '@/components/PixelTransition';
import { motion } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

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

    return (
        <section id="about" className="py-32 px-6 bg-[#050505]">
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

                <div ref={ref} className="grid md:grid-cols-2 gap-16 items-start">
                    {/* Left — paragraphs + stats */}
                    <div className="space-y-6">
                        {[
                            "I'm Harshavardhan C — a Creative Developer who loves bridging the gap between design and engineering. I build experiences that are fast, beautiful, and purposeful.",
                            'My work spans full-stack web development, interactive UIs, and creative experiments. I care deeply about the details: the micro-interactions, the animations, the performance.',
                            "When I'm not coding, I'm exploring new tools, contributing to open-source, or finding inspiration in art and design.",
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

                        <div className="pt-4 flex gap-8">
                            {[
                                { value: '3+', label: 'Years Experience' },
                                { value: '20+', label: 'Projects Built' },
                                { value: '∞', label: 'Coffees Consumed' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.45 + i * 0.15 }}
                                    className="border-l-2 border-purple-500/40 pl-4"
                                >
                                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-xs text-white/40 tracking-widest uppercase">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right — single PixelTransition: globe → location info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <PixelTransition
                            firstContent={
                                <div className="w-full h-full">
                                    <EarthGlobe />
                                </div>
                            }
                            secondContent={
                                <div className="flex flex-col justify-center gap-7 w-full h-full p-8 bg-[#0a0a0a]">
                                    <div>
                                        <p className="text-xs font-mono text-purple-400/60 tracking-[0.25em] uppercase mb-2">
                                            Based in
                                        </p>
                                        <p className="text-2xl font-bold text-white">Coimbatore, <br />Tamil Nadu, India 🇮🇳</p>
                                        <p className="text-white/30 font-mono text-xs mt-1">  11°00′03″N 76°57′48″E</p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-mono text-purple-400/60 tracking-[0.25em] uppercase mb-2">
                                            Local Time
                                        </p>
                                        <p className="text-3xl font-mono font-semibold text-white tabular-nums">{time}</p>
                                        <p className="text-white/30 font-mono text-xs mt-1">IST — UTC +5:30</p>
                                    </div>

                                    {/* commented for now as I was not open for work */}
                                    {/* <div className="flex items-center gap-2.5">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                                        </span>
                                        <span className="text-white/50 text-sm">Open to remote opportunities</span>
                                    </div> */}
                                </div>
                            }
                            gridSize={31}
                            pixelColor="#6331b8ff"
                            animationStepDuration={0.4}
                            aspectRatio="100%"
                            style={{
                                width: '75%',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                backgroundColor: '#0a0a0a',
                                borderRadius: '16px',
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
