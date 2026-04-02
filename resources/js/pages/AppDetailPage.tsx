import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { getAppById, type AppData, type AppFeature } from '@/data/apps';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

/* ── Feature item ──────────────────────────────────────── */
function FeatureItem({ feature, index }: { feature: AppFeature; index: number }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.04 * index }}
            onClick={() => setOpen(!open)}
            className="text-left rounded-xl p-4 transition-all duration-200 group w-full hover:scale-[1.01]"
            style={{
                border: '1px solid var(--hs-border)',
                background: 'var(--hs-surface-hover)',
            }}
        >
            <div className="flex items-start gap-3">
                <span className="text-base mt-0.5 leading-none shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300">{feature.icon}</span>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-[13px] font-medium transition-colors" style={{ color: 'var(--hs-text-secondary)' }}>{feature.title}</span>
                        <motion.svg
                            width="12" height="12" viewBox="0 0 24 24" fill="none"
                            stroke="var(--hs-text-ghost)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            animate={{ rotate: open ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="shrink-0"
                        >
                            <path d="M6 9l6 6 6-6" />
                        </motion.svg>
                    </div>
                    <AnimatePresence>
                        {open && (
                            <motion.p
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-xs leading-relaxed mt-2 overflow-hidden"
                                style={{ color: 'var(--hs-text-muted)' }}
                            >
                                {feature.desc}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.button>
    );
}

/* ── Detail view ───────────────────────────────────────── */
function AppDetail({ app }: { app: AppData }) {
    const { isDark } = useTheme();

    // Motion variants
    const containerVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            {/* ── Hero band ── */}
            <motion.div
                variants={itemVariants}
                className="relative rounded-2xl overflow-hidden"
                style={{
                    background: `linear-gradient(160deg, rgba(${app.accentRgb},0.04) 0%, var(--hs-surface) 40%)`,
                    border: '1px solid var(--hs-border)',
                    boxShadow: 'var(--hs-card-shadow)',
                }}
            >
                {/* Top accent line */}
                <div
                    className="h-px w-full"
                    style={{ background: `linear-gradient(90deg, transparent, rgba(${app.accentRgb},0.3), transparent)` }}
                />

                <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                        {/* Icon + identity */}
                        <div className="flex items-center gap-5 flex-1 min-w-0">
                            <motion.div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 cursor-default"
                                whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                style={{
                                    background: `rgba(${app.accentRgb},0.08)`,
                                    border: `1px solid rgba(${app.accentRgb},0.15)`,
                                }}
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.8, 1, 0.8]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={app.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18.36 6.64A9 9 0 015.63 5.63" />
                                        <path d="M12 2v4" />
                                        <circle cx="12" cy="12" r="3" />
                                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                                    </svg>
                                </motion.div>
                            </motion.div>
                            <div>
                                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: 'var(--hs-text)' }}>{app.name}</h1>
                                    <span
                                        className="px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase rounded-md"
                                        style={{ color: `rgba(${app.accentRgb},0.7)`, background: `rgba(${app.accentRgb},0.08)`, border: `1px solid rgba(${app.accentRgb},0.12)` }}
                                    >
                                        v{app.version}
                                    </span>
                                    <span
                                        className="px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase rounded-md"
                                        style={{ color: 'var(--hs-text-muted)', background: 'var(--hs-surface-hover)', border: '1px solid var(--hs-border)' }}
                                    >
                                        {app.platform}
                                    </span>
                                </div>
                                <motion.p
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="text-[15px] leading-relaxed"
                                    style={{ color: 'var(--hs-text-secondary)' }}
                                >
                                    {app.tagline}
                                </motion.p>
                            </div>
                        </div>

                        {/* Downloads */}
                        <div className="flex gap-3 shrink-0">
                            {app.downloads.map((d, i) => (
                                <motion.a
                                    key={d.fileName}
                                    href={`/products/${d.fileName}`}
                                    download
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 + (i * 0.1), type: 'spring' }}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                                    style={d.type === 'installer' ? {
                                        color: 'var(--hs-text)',
                                        borderColor: `rgba(${app.accentRgb},0.3)`,
                                        background: `rgba(${app.accentRgb},0.08)`,
                                        border: `1px solid rgba(${app.accentRgb},0.3)`,
                                    } : {
                                        color: 'var(--hs-text-secondary)',
                                        border: '1px solid var(--hs-border)',
                                        background: 'var(--hs-surface)',
                                    }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                    </svg>
                                    {d.label}
                                    <span className="text-[10px] font-mono opacity-40">{d.size}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ── Body ── */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
                {/* Left */}
                <div className="space-y-6">
                    {/* About */}
                    <div className="rounded-2xl p-7 md:p-8" style={{ border: '1px solid var(--hs-border)', background: 'var(--hs-surface)', boxShadow: 'var(--hs-card-shadow)' }}>
                        <h3 className="text-xs font-mono tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--hs-text-muted)' }}>About</h3>
                        <p className="text-[14px] leading-[1.85]" style={{ color: 'var(--hs-text-secondary)' }}>{app.description}</p>
                    </div>

                    {/* Features */}
                    <div className="rounded-2xl p-7 md:p-8" style={{ border: '1px solid var(--hs-border)', background: 'var(--hs-surface)', boxShadow: 'var(--hs-card-shadow)' }}>
                        <h3 className="text-xs font-mono tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--hs-text-muted)' }}>Features</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {app.features.map((f, i) => (
                                <FeatureItem key={i} feature={f} index={i} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right sidebar */}
                <div className="space-y-6">
                    {/* Tech */}
                    <div className="rounded-2xl p-6" style={{ border: '1px solid var(--hs-border)', background: 'var(--hs-surface)', boxShadow: 'var(--hs-card-shadow)' }}>
                        <h3 className="text-xs font-mono tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--hs-text-muted)' }}>Built with</h3>
                        <div className="flex flex-wrap gap-2">
                            {app.tech.map((t) => (
                                <span
                                    key={t}
                                    className="px-3 py-1.5 text-[11px] font-mono tracking-wider rounded-lg"
                                    style={{ border: '1px solid var(--hs-border)', color: 'var(--hs-text-secondary)', background: 'var(--hs-surface-hover)' }}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Install */}
                    <div className="rounded-2xl p-6" style={{ border: '1px solid var(--hs-border)', background: 'var(--hs-surface)', boxShadow: 'var(--hs-card-shadow)' }}>
                        <h3 className="text-xs font-mono tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--hs-text-muted)' }}>Install</h3>
                        <div className="space-y-4">
                            {app.downloads.find(d => d.type === 'installer') && (
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span
                                            className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold"
                                            style={{ background: `rgba(${app.accentRgb},0.1)`, color: app.accentColor }}
                                        >
                                            1
                                        </span>
                                        <span className="text-xs font-medium" style={{ color: 'var(--hs-text-secondary)' }}>Installer</span>
                                        <span className="text-[9px] font-mono tracking-wider uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400/60">Recommended</span>
                                    </div>
                                    <div className="text-[12px] leading-[1.9] ml-7 space-y-0.5" style={{ color: 'var(--hs-text-secondary)' }}>
                                        <p>Run the setup wizard</p>
                                        <p>Enable "Start with Windows" (optional)</p>
                                        <p>Launch from desktop or Start menu</p>
                                    </div>
                                </div>
                            )}

                            <div className="h-px" style={{ background: 'var(--hs-border)' }} />

                            {app.downloads.find(d => d.type === 'portable') && (
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span
                                            className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold"
                                            style={{ background: 'var(--hs-surface-hover)', color: 'var(--hs-text-secondary)' }}
                                        >
                                            2
                                        </span>
                                        <span className="text-xs font-medium" style={{ color: 'var(--hs-text-secondary)' }}>Portable</span>
                                    </div>
                                    <div className="text-[12px] leading-[1.9] ml-7 space-y-0.5" style={{ color: 'var(--hs-text-secondary)' }}>
                                        <p>Place EXE anywhere, double-click to run</p>
                                        <p>Settings in <code className="px-1 rounded text-[11px]" style={{ color: 'var(--hs-text-secondary)', background: 'var(--hs-surface-hover)' }}>%LocalAppData%\SmartAwake\</code></p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ── Page ──────────────────────────────────────────────── */
export default function AppDetailPage() {
    const { id } = useParams<{ id: string }>();
    const app = id ? getAppById(id) : undefined;

    if (!app) {
        return <Navigate to="/apps" replace />;
    }

    return (
        <div className="min-h-screen" style={{ background: 'var(--hs-page)', color: 'var(--hs-text)' }}>
            {/* Noise */}
            <svg className="fixed inset-0 w-full h-full pointer-events-none z-50" style={{ opacity: 'var(--hs-noise-opacity)' }} aria-hidden>
                <filter id="nd"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter>
                <rect width="100%" height="100%" filter="url(#nd)" />
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
                    <Link to="/apps" className="flex items-center gap-2.5 transition-colors duration-200" style={{ color: 'var(--hs-text-secondary)' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span className="text-[13px] tracking-wide">All Apps</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono tracking-[0.25em] uppercase" style={{ color: 'var(--hs-text-ghost)' }}>{app.name}</span>
                        <ThemeToggle />
                    </div>
                </div>
            </motion.nav>

            {/* Content */}
            <main className="max-w-5xl mx-auto px-6 py-10">
                <AppDetail app={app} />
            </main>
        </div>
    );
}
