import Aurora from '@/components/ui/Aurora';
import GlareHover from '@/components/GlareHover';
import ShinyText from '@/components/ui/ShinyText';
import VariableProximity from '@/components/VariableProximity';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);

    // Cursor-reactive glow
    const rawX = useMotionValue(0.5);
    const rawY = useMotionValue(0.5);
    const glowLeft = useTransform(useSpring(rawX, { stiffness: 40, damping: 25 }), (v) => `${v * 100}%`);
    const glowTop = useTransform(useSpring(rawY, { stiffness: 40, damping: 25 }), (v) => `${v * 100}%`);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = heroRef.current?.getBoundingClientRect();
        if (!rect) return;
        rawX.set((e.clientX - rect.left) / rect.width);
        rawY.set((e.clientY - rect.top) / rect.height);
    };

    return (
        <section
            ref={heroRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex items-center overflow-hidden bg-[#050505]"
        >
            {/* Aurora background */}
            <div className="absolute inset-0 z-0">
                <Aurora
                    colorStops={['#0e0e0e', '#6c2ff2', '#0e0e0e']}
                    amplitude={1.2}
                    blend={0.6}
                    speed={0.5}
                />
            </div>

            {/* Cursor-reactive glow */}
            <motion.div
                className="absolute z-[1] w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    left: glowLeft,
                    top: glowTop,
                    x: '-50%',
                    y: '-50%',
                    background: 'radial-gradient(circle, rgba(108,47,242,0.15) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
            <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />

            {/* Main content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-mono text-white/40 tracking-[0.2em] uppercase">
                            {/* Available for work */}
                            Portfolio
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <VariableProximity
                            label="Harshavardhan"
                            fromFontVariationSettings="'wght' 200, 'opsz' 8"
                            toFontVariationSettings="'wght' 900, 'opsz' 144"
                            containerRef={heroRef}
                            radius={180}
                            falloff="gaussian"
                            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-tighter leading-[0.9]"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                        className="mt-6 md:mt-8"
                    >
                        <ShinyText
                            text="Software Engineer"
                            speed={3}
                            color="#6b7280"
                            shineColor="#c4b5fd"
                            spread={190}
                            className="text-lg md:text-xl font-light tracking-[0.25em] uppercase"
                        />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="mt-4 text-white/30 text-sm md:text-base max-w-md leading-relaxed font-mono"
                    >
                        From backend to browser — building fast, purposeful digital experiences.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.5 }}
                        className="mt-8 flex items-center gap-5"
                    >
                        <a href="#contact">
                            <GlareHover
                                width="184px"
                                height="50px"
                                background="linear-gradient(135deg, rgba(108,47,242,0.85) 0%, rgba(168,85,247,0.65) 100%)"
                                borderRadius="9999px"
                                borderColor="rgba(168,85,247,0.5)"
                                glareColor="#ffffff"
                                glareOpacity={0.28}
                                glareAngle={-45}
                                glareSize={260}
                                transitionDuration={600}
                                style={{ boxShadow: '0 0 28px rgba(108,47,242,0.45), 0 0 60px rgba(108,47,242,0.15)' }}
                            >
                                <span className="flex items-center gap-2 text-white text-sm font-semibold tracking-wide">
                                    Get in Touch
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </GlareHover>
                        </a>
                        <a
                            href="#projects"
                            className="text-sm font-mono text-white/30 hover:text-white/70 transition-colors duration-300 tracking-widest"
                        >
                            View Work ↓
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.8 }}
            >
                <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
                <motion.div
                    className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent"
                    animate={{ scaleY: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>
        </section>
    );
}
