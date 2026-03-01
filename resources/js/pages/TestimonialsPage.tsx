import Grainient from '@/components/ui/Grainient';
import { testimonials } from '@/sections/Testimonials';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const allTestimonials = [
    ...testimonials,
    {
        quote: "Rare combination of technical depth and communication clarity. Harsha made every sprint review feel like a product demo.",
        name: "Rohan Pillai",
        role: "Engineering Manager, Driftworks",
        initials: "RP",
    },
    {
        quote: "Delivered a full-stack feature end-to-end in days, not weeks. The quality of work was production-ready from day one.",
        name: "Sneha Kapoor",
        role: "CTO, Luminary Labs",
        initials: "SK",
    },
    {
        quote: "Harsha built our internal dashboard from scratch. It's now the most-used tool across the entire team.",
        name: "Vikram Nair",
        role: "Operations Lead, Orbitline",
        initials: "VN",
    },
    {
        quote: "The attention to micro-interactions was something else. Users noticed immediately — without us telling them anything changed.",
        name: "Aisha Reddy",
        role: "Head of Product, Stackbloom",
        initials: "AR",
    },
];

export default function TestimonialsPage() {
    return (
        <div className="min-h-screen bg-[#050505] px-6 py-20">
            <div className="max-w-5xl mx-auto">
                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-14"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-xs font-mono text-white/30 hover:text-white/70 transition-colors duration-300 tracking-widest uppercase"
                    >
                        <span>←</span> Back to Portfolio
                    </Link>
                </motion.div>

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-16"
                >
                    <span className="text-xs font-mono text-purple-400/60 tracking-[0.3em] uppercase">
                        What people say
                    </span>
                    <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white leading-tight">
                        Reviews &amp; Testimonials
                    </h1>
                    <p className="mt-4 text-white/40 text-sm max-w-md">
                        Words from clients, collaborators, and teammates I've had the privilege of working with.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 gap-5">
                    {allTestimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
                            className="relative overflow-hidden rounded-2xl"
                        >
                            {/* Grainient per card */}
                            <div className="absolute inset-0 opacity-90">
                                <Grainient
                                    color1="#a855f7"
                                    color2="#7c3aed"
                                    color3="#3b0764"
                                    grainAmount={0.07}
                                    grainScale={3.5}
                                    timeSpeed={0.08}
                                    warpStrength={0.6}
                                    warpFrequency={3.5}
                                    contrast={1.2}
                                    saturation={1.0}
                                    zoom={0.8}
                                    colorBalance={i * 0.04}
                                />
                            </div>

                            <div className="relative p-7 flex flex-col gap-5 h-full">
                                {/* Quote */}
                                <p className="text-white/85 text-sm leading-relaxed font-light flex-1">
                                    &ldquo;{t.quote}&rdquo;
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                    <div className="w-8 h-8 rounded-full bg-white/20 border border-white/25 flex items-center justify-center shrink-0">
                                        <span className="text-white text-[10px] font-semibold">
                                            {t.initials}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-white text-sm font-semibold leading-none mb-0.5">
                                            {t.name}
                                        </div>
                                        <div className="text-white/45 text-xs font-mono">
                                            {t.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 text-center text-xs font-mono text-white/20"
                >
                    Want to leave a review?{' '}
                    <Link to="/#contact" className="text-purple-400/60 hover:text-purple-400 transition-colors duration-300">
                        Get in touch ↗
                    </Link>
                </motion.p>
            </div>
        </div>
    );
}
