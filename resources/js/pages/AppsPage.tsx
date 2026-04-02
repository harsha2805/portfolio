import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apps, type AppData } from '@/data/apps';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

/* ── Catalog card ──────────────────────────────────────── */
function CatalogCard({ app, index }: { app: AppData; index: number }) {
    const navigate = useNavigate();
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const rotateX = useTransform(useSpring(mouseY, { stiffness: 150, damping: 22 }), [0, 1], [4, -4]);
    const rotateY = useTransform(useSpring(mouseX, { stiffness: 150, damping: 22 }), [0, 1], [-4, 4]);
    const sheenX = useTransform(mouseX, (v) => `${v * 100}%`);
    const sheenY = useTransform(mouseY, (v) => `${v * 100}%`);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            const rect = cardRef.current?.getBoundingClientRect();
            if (!rect) return;
            mouseX.set((e.clientX - rect.left) / rect.width);
            mouseY.set((e.clientY - rect.top) / rect.height);
        },
        [mouseX, mouseY],
    );

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 * index, ease: [0.16, 1, 0.3, 1] }}
        >
            <motion.article
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => navigate(`/apps/${app.id}`)}
                className="relative cursor-pointer rounded-2xl overflow-hidden group transition-shadow duration-300"
                style={{
                    rotateX,
                    rotateY,
                    transformPerspective: 900,
                    transformStyle: 'preserve-3d',
                    background: 'var(--hs-surface)',
                    border: '1px solid var(--hs-border)',
                    boxShadow: 'var(--hs-card-shadow)',
                }}
                whileHover={{ y: -4, borderColor: `rgba(${app.accentRgb},0.2)`, boxShadow: 'var(--hs-card-shadow-hover)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            >
                {/* Cursor sheen */}
                <motion.div
                    className="absolute inset-0 pointer-events-none z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background: useTransform(
                            [sheenX, sheenY],
                            ([x, y]: string[]) =>
                                `radial-gradient(350px circle at ${x} ${y}, rgba(${app.accentRgb},0.06), transparent 60%)`,
                        ),
                    }}
                />

                {/* Top accent line */}
                <div
                    className="h-px w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, rgba(${app.accentRgb},0.35), transparent)` }}
                />

                <div className="relative z-[1] p-7 md:p-8">
                    {/* Header: icon + badges */}
                    <div className="flex items-start justify-between mb-6">
                        <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(var(--glow),0.12)]"
                            style={{
                                '--glow': app.accentRgb,
                                background: `rgba(${app.accentRgb},0.06)`,
                                border: `1px solid rgba(${app.accentRgb},0.1)`,
                            } as React.CSSProperties}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={app.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18.36 6.64A9 9 0 015.63 5.63" />
                                <path d="M12 2v4" />
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            </svg>
                        </div>

                        <div className="flex items-center gap-2">
                            <span
                                className="px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase rounded-md"
                                style={{ color: `rgba(${app.accentRgb},0.6)`, background: `rgba(${app.accentRgb},0.06)`, border: `1px solid rgba(${app.accentRgb},0.1)` }}
                            >
                                v{app.version}
                            </span>
                            <span
                                className="px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase rounded-md"
                                style={{ color: 'var(--hs-text-muted)', background: 'var(--hs-surface-hover)', border: '1px solid var(--hs-border)' }}
                            >
                                {app.platform}
                            </span>
                        </div>
                    </div>

                    {/* Name + tagline */}
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-3" style={{ color: 'var(--hs-text)' }}>
                        {app.name}
                    </h2>
                    <p className="text-[13px] leading-relaxed line-clamp-2" style={{ color: 'var(--hs-text-secondary)' }}>
                        {app.tagline}
                    </p>
                </div>
            </motion.article>
        </motion.div>
    );
}

/* ── Page ──────────────────────────────────────────────── */
export default function AppsPage() {
    return (
        <div className="min-h-screen" style={{ background: 'var(--hs-page)', color: 'var(--hs-text)' }}>
            {/* Noise */}
            <svg className="fixed inset-0 w-full h-full pointer-events-none z-50" style={{ opacity: 'var(--hs-noise-opacity)' }} aria-hidden>
                <filter id="na"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter>
                <rect width="100%" height="100%" filter="url(#na)" />
            </svg>

            {/* Nav */}
            <motion.nav
                className="sticky top-0 z-40 backdrop-blur-xl"
                style={{ background: 'var(--hs-nav-bg)', borderBottom: '1px solid var(--hs-border)' }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2.5 transition-colors duration-200" style={{ color: 'var(--hs-text-secondary)' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span className="text-[13px] tracking-wide">HoloStack</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono tracking-[0.25em] uppercase" style={{ color: 'var(--hs-text-ghost)' }}>Apps</span>
                        <ThemeToggle />
                    </div>
                </div>
            </motion.nav>

            {/* Header */}
            <header className="max-w-5xl mx-auto px-6 pt-14 pb-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-none mb-4" style={{ color: 'var(--hs-text)' }}>
                        Apps
                    </h1>
                    <p className="text-[15px] max-w-md leading-relaxed" style={{ color: 'var(--hs-text-secondary)' }}>
                        Products shipped, tools crafted, experiments brought to life.
                    </p>
                </motion.div>
            </header>

            {/* Divider */}
            <div className="max-w-5xl mx-auto px-6">
                <div className="h-px" style={{ background: 'linear-gradient(to right, var(--hs-border), var(--hs-border-hover), transparent)' }} />
            </div>

            {/* Grid */}
            <main className="max-w-5xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {apps.map((app, i) => (
                        <CatalogCard key={app.id} app={app} index={i} />
                    ))}
                </div>

                {/* Coming soon */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center py-16"
                >
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                        style={{ border: '1px solid var(--hs-border)', background: 'var(--hs-surface)' }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--hs-text-ghost)' }} />
                        <span className="text-xs font-mono tracking-wider" style={{ color: 'var(--hs-text-secondary)' }}>More apps in progress</span>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
