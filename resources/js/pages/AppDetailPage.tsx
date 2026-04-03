import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import { getAppById, type AppData, type AppFeature } from '@/data/apps';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';
import Aurora from '@/components/ui/Aurora';
import GradientHeading from '@/components/ui/GradientHeading';
import Grainient from '@/components/ui/Grainient';

/* ── Testimonials Component ────────────────────────────── */
interface TestimonialData {
    id: number;
    name: string;
    role: string;
    quote: string;
}

function ProductTestimonials({ accentRgb }: { accentRgb: string }) {
    const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/testimonials/data')
            .then(res => {
                setTestimonials(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading || testimonials.length === 0) return null;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden relative" 
            style={{ 
                border: '1px solid var(--hs-border)', 
                background: 'var(--hs-surface)', 
                boxShadow: 'var(--hs-card-shadow)',
                minHeight: '300px'
            }}
        >
            {/* Grainient Background */}
            <div className="absolute inset-0 opacity-40">
                <Grainient
                    color1={`rgb(${accentRgb})`}
                    color2="#000000"
                    color3={`rgba(${accentRgb}, 0.5)`}
                    grainAmount={0.05}
                />
            </div>

            <div className="p-8 md:p-10 relative z-10">
                <GradientHeading text="What Users Say" className="text-sm font-mono tracking-[0.3em] uppercase mb-8" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.slice(0, 4).map((t, i) => (
                        <motion.div 
                            key={t.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"
                        >
                            <p className="text-[15px] leading-relaxed text-white/90 italic mb-4">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-[13px] font-semibold text-white">{t.name}</div>
                                    <div className="text-[11px] text-white/50 font-mono">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <Link 
                        to="/testimonials" 
                        className="text-xs font-mono tracking-widest uppercase py-2 px-6 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white/70"
                    >
                        View All Reviews
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

/* ── Feature item ──────────────────────────────────────── */
function FeatureItem({ feature, index, accentRgb }: { feature: AppFeature; index: number; accentRgb: string }) {
    const [open, setOpen] = useState(false);
    const [mousePos, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: (index % 2) * 0.05 }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onMouseMove={handleMouseMove}
            className="relative"
        >
            <motion.div
                whileHover={{ 
                    y: -4,
                    boxShadow: `0 12px 30px rgba(${accentRgb}, 0.15)`,
                    borderColor: `rgba(${accentRgb}, 0.4)`
                }}
                className="text-left rounded-2xl p-5 transition-all duration-300 group w-full relative overflow-hidden cursor-pointer"
                style={{
                    border: '1px solid var(--hs-border)',
                    background: 'var(--hs-surface-hover)',
                }}
            >
                {/* Extraordinary hover glow */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${accentRgb}, 0.08), transparent 40%)`
                    }}
                />

                <div className="flex items-start gap-4 relative z-10">
                    <span className="text-xl mt-0.5 leading-none shrink-0 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300">{feature.icon}</span>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[15px] font-semibold transition-colors group-hover:text-[var(--hs-text)]" style={{ color: 'var(--hs-text-secondary)' }}>{feature.title}</span>
                            <motion.svg
                                width="14" height="14" viewBox="0 0 24 24" fill="none"
                                stroke="var(--hs-text-ghost)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                animate={{ rotate: open ? 180 : 0, color: open ? `rgb(${accentRgb})` : 'var(--hs-text-ghost)' }}
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
                                    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                                    className="text-[13px] leading-relaxed mt-3 overflow-hidden"
                                    style={{ color: 'var(--hs-text)', opacity: 0.9 }}
                                >
                                    {feature.desc}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </motion.div>
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
                className="relative rounded-2xl overflow-hidden min-h-[320px] flex items-center"
                style={{
                    background: `linear-gradient(160deg, rgba(${app.accentRgb},0.04) 0%, var(--hs-surface) 40%)`,
                    border: '1px solid var(--hs-border)',
                    boxShadow: 'var(--hs-card-shadow)',
                }}
            >
                {/* Aurora Background */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                    <Aurora 
                        colorStops={[
                            `rgb(${app.accentRgb})`, 
                            '#7cff67', 
                            `rgb(${app.accentRgb})`
                        ]} 
                        amplitude={0.8}
                    />
                </div>

                {/* Top accent line */}
                <div
                    className="absolute top-0 left-0 h-px w-full z-10"
                    style={{ background: `linear-gradient(90deg, transparent, rgba(${app.accentRgb},0.3), transparent)` }}
                />

                <div className="p-8 md:p-10 relative z-10 w-full">
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
                                <div className="flex flex-wrap items-center gap-4 mb-2.5">
                                    <h1 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: 'var(--hs-text)' }}>{app.name}</h1>
                                    <span
                                        className="px-2.5 py-1 text-[11px] font-bold font-mono tracking-widest uppercase rounded-lg shadow-sm"
                                        style={{ color: `rgba(${app.accentRgb},0.9)`, background: `rgba(${app.accentRgb},0.12)`, border: `1px solid rgba(${app.accentRgb},0.2)` }}
                                    >
                                        v{app.version}
                                    </span>
                                    <span
                                        className="px-2.5 py-1 text-[11px] font-bold font-mono tracking-widest uppercase rounded-lg shadow-sm"
                                        style={{ color: 'var(--hs-text-muted)', background: 'var(--hs-surface-hover)', border: '1px solid var(--hs-border)' }}
                                    >
                                        {app.platform}
                                    </span>
                                </div>
                                <motion.p
                                    initial={{ opacity: 0, x: -15 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                                    className="text-lg md:text-xl font-medium max-w-2xl leading-relaxed"
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
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
                {/* Left */}
                <div className="space-y-8">
                    {/* About */}
                    <div className="rounded-2xl p-8 md:p-10" style={{ border: '1px solid var(--hs-border)', background: 'var(--hs-surface)', boxShadow: 'var(--hs-card-shadow)' }}>
                        <GradientHeading text="About" className="text-sm font-mono tracking-[0.3em] uppercase mb-6" />
                        <p className="text-[16px] md:text-[17px] leading-[1.9] font-medium" style={{ color: 'var(--hs-text-secondary)' }}>{app.description}</p>
                    </div>

                    {/* Features */}
                    <div className="rounded-2xl p-8 md:p-10" style={{ border: '1px solid var(--hs-border)', background: 'var(--hs-surface)', boxShadow: 'var(--hs-card-shadow)' }}>
                        <GradientHeading text="Features" className="text-sm font-mono tracking-[0.3em] uppercase mb-8" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {app.features.map((f, i) => (
                                <FeatureItem key={i} feature={f} index={i} accentRgb={app.accentRgb} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right sidebar */}
                <div className="space-y-8">
                    {/* Tech */}
                    <div className="rounded-2xl p-7" style={{ border: '1px solid var(--hs-border)', background: 'var(--hs-surface)', boxShadow: 'var(--hs-card-shadow)' }}>
                        <GradientHeading text="Built with" className="text-[11px] font-mono tracking-[0.3em] uppercase mb-5" />
                        <div className="flex flex-wrap gap-2.5">
                            {app.tech.map((t) => (
                                <span
                                    key={t}
                                    className="px-3.5 py-2 text-[12px] font-semibold tracking-wide rounded-xl transition-colors hover:bg-[var(--hs-accent-soft)]"
                                    style={{ border: '1px solid var(--hs-border)', color: 'var(--hs-text-secondary)', background: 'var(--hs-surface-hover)' }}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Install */}
                    <div className="rounded-2xl p-7" style={{ border: '1px solid var(--hs-border)', background: 'var(--hs-surface)', boxShadow: 'var(--hs-card-shadow)' }}>
                        <GradientHeading text="Install" className="text-[11px] font-mono tracking-[0.3em] uppercase mb-5" />
                        <div className="space-y-5">
                            {app.downloads.find(d => d.type === 'installer') && (
                                <div>
                                    <div className="flex items-center gap-2.5 mb-3">
                                        <span
                                            className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold"
                                            style={{ background: `rgba(${app.accentRgb},0.1)`, color: app.accentColor }}
                                        >
                                            1
                                        </span>
                                        <span className="text-[13px] font-semibold" style={{ color: 'var(--hs-text-secondary)' }}>Installer</span>
                                        <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400/70">Recommended</span>
                                    </div>
                                    <div className="text-[13px] leading-[1.8] ml-8 space-y-1" style={{ color: 'var(--hs-text-muted)' }}>
                                        <p>Run the setup wizard</p>
                                        <p>Enable "Start with Windows" (optional)</p>
                                        <p>Launch from desktop or Start menu</p>
                                    </div>
                                </div>
                            )}

                            <div className="h-px" style={{ background: 'var(--hs-border)' }} />

                            {app.downloads.find(d => d.type === 'portable') && (
                                <div>
                                    <div className="flex items-center gap-2.5 mb-3">
                                        <span
                                            className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold"
                                            style={{ background: 'var(--hs-surface-hover)', color: 'var(--hs-text-secondary)' }}
                                        >
                                            2
                                        </span>
                                        <span className="text-[13px] font-semibold" style={{ color: 'var(--hs-text-secondary)' }}>Portable</span>
                                    </div>
                                    <div className="text-[13px] leading-[1.8] ml-8 space-y-1" style={{ color: 'var(--hs-text-muted)' }}>
                                        <p>Place EXE anywhere, double-click to run</p>
                                        <p>Settings in <code className="px-1.5 py-0.5 rounded text-[11px] font-mono" style={{ color: 'var(--hs-text-secondary)', background: 'var(--hs-surface-hover)' }}>%LocalAppData%\SmartAwake\</code></p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="mt-8">
                <ProductTestimonials accentRgb={app.accentRgb} />
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
