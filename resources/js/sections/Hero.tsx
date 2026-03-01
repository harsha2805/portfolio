import Aurora from '@/components/ui/Aurora';
import BlurText from '@/components/ui/BlurText';
import ShinyText from '@/components/ui/ShinyText';
import { motion } from 'motion/react';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
            {/* Aurora background */}
            <div className="absolute inset-0 z-0">
                <Aurora
                    colorStops={['#0e0e0e', '#6c2ff2', '#0e0e0e']}
                    amplitude={1.2}
                    blend={0.6}
                    speed={0.5}
                />
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
            <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-4"
                >
                    <span className="text-sm font-mono text-purple-400/80 tracking-[0.3em] uppercase">
                        Portfolio
                    </span>
                </motion.div>

                <BlurText
                    text="Harshavardhan C"
                    delay={120}
                    animateBy="letters"
                    direction="top"
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none justify-center"
                    stepDuration={0.4}
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="mt-6 mb-10"
                >
                    <ShinyText
                        text="Creative Developer"
                        speed={3}
                        color="#6b7280"
                        shineColor="#c4b5fd"
                        spread={90}
                        className="text-xl md:text-2xl font-light tracking-widest"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.6 }}
                    className="flex items-center justify-center gap-4"
                >
                    <a
                        href="#projects"
                        className="px-8 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-purple-100 transition-colors duration-300"
                    >
                        View Work
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-3 border border-white/20 text-white text-sm font-semibold rounded-full hover:border-white/50 hover:bg-white/5 transition-all duration-300"
                    >
                        Get in Touch
                    </a>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
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
