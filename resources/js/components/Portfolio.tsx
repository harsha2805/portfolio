import Hero from '@/sections/Hero';
import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import { motion } from 'motion/react';
import { lazy, Suspense, useState } from 'react';

function TestimonialsSkeleton() {
    return (
        <section className="py-24 px-6 bg-[#050505]">
            <div className="max-w-5xl mx-auto">
                {/* Label */}
                <div className="mb-10 h-3 w-32 rounded-full bg-white/[0.04] animate-pulse" />

                <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-center">
                    {/* Left — stacked nav dots skeleton */}
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map(i => (
                            <div
                                key={i}
                                className="flex items-center gap-3"
                                style={{ opacity: 1 - i * 0.18 }}
                            >
                                <div className="w-1 h-6 rounded-full bg-white/[0.06] animate-pulse" />
                                <div className="h-2.5 rounded-full bg-white/[0.04] animate-pulse" style={{ width: `${80 - i * 12}%` }} />
                            </div>
                        ))}
                    </div>

                    {/* Right — quote card skeleton */}
                    <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-10 overflow-hidden">
                        {/* shimmer sweep */}
                        <motion.div
                            className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
                            initial={{ x: '-100%' }}
                            animate={{ x: '200%' }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
                        />
                        <div className="space-y-3 mb-8">
                            <div className="h-3 rounded-full bg-white/[0.06] w-full" />
                            <div className="h-3 rounded-full bg-white/[0.06] w-11/12" />
                            <div className="h-3 rounded-full bg-white/[0.06] w-4/5" />
                            <div className="h-3 rounded-full bg-white/[0.06] w-3/4" />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/[0.06] shrink-0" />
                            <div className="space-y-2">
                                <div className="h-2.5 rounded-full bg-white/[0.06] w-28" />
                                <div className="h-2 rounded-full bg-white/[0.04] w-36" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const About = lazy(() => import('@/sections/About'));
const Skills = lazy(() => import('@/sections/Skills'));
const Experience = lazy(() => import('@/sections/Experience'));
const Projects = lazy(() => import('@/sections/Projects'));
const Testimonials = lazy(() => import('@/sections/Testimonials'));
const Contact = lazy(() => import('@/sections/Contact'));

export default function Portfolio() {
    // Every refresh (current):
    const [loaded, setLoaded] = useState(false);

    //// First visit only (old behaviour):
    // const alreadySeen = sessionStorage.getItem('loader_seen') === '1';
    // const [loaded, setLoaded] = useState(alreadySeen);
    //// + add sessionStorage.setItem('loader_seen', '1') inside onDone

    return (
        <>
            {!loaded && <Loader onDone={() => setLoaded(true)} />}

            <Nav />
            <motion.main
                className="bg-[#050505] antialiased"
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ duration: 0.6 }}
            >
                <Hero />
                <Suspense fallback={null}>
                    <About />
                    <Skills />
                    <Experience />
                    <Projects />
                </Suspense>
                <Suspense fallback={<TestimonialsSkeleton />}>
                    <Testimonials />
                </Suspense>
                <Suspense fallback={null}>
                    <Contact />
                </Suspense>
            </motion.main>
        </>
    );
}
