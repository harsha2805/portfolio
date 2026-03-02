import Aurora from '@/components/ui/Aurora';
import BlurText from '@/components/ui/BlurText';
import GlareHover from '@/components/GlareHover';
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
                    className="flex items-center justify-center"
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
