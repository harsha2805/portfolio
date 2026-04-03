import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import { FaGithub, FaStar, FaDownload } from 'react-icons/fa';
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
    const { isDark } = useTheme();
    const shouldReduceMotion = useReducedMotion();

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
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden relative"
            style={{
                border: '1px solid var(--hs-border)',
                background: 'var(--hs-surface)',
                boxShadow: isDark ? 'none' : 'var(--hs-card-shadow)',
                minHeight: '280px'
            }}
        >
            {/* Theme-aware Grainient Background */}
            <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.6]">
                <Grainient
                    color1={isDark ? "#a855f7" : "#d8b4fe"}
                    color2={isDark ? "#7c3aed" : "#a78bfa"}
                    color3={isDark ? "#3b0764" : "#f3e8ff"}
                    grainAmount={0.05}
                />
            </div>

            <div className="p-8 md:p-12 relative z-10">
                <div className="flex items-center justify-between mb-10">
                    <GradientHeading text="What Users Say" className="text-xs font-mono tracking-[0.4em] uppercase" />
                    <Link
                        to="/testimonials"
                        className="text-[10px] font-mono tracking-widest uppercase py-2 px-5 rounded-full border border-[var(--hs-border)] bg-[var(--hs-surface-hover)] hover:bg-[var(--hs-surface-active)] transition-all duration-300 text-[var(--hs-text-secondary)] hover:text-[var(--hs-text)]"
                    >
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.slice(0, 4).map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: shouldReduceMotion ? 0 : i * 0.1, duration: 0.5 }}
                            className="p-8 rounded-2xl bg-[var(--hs-surface-hover)] border border-[var(--hs-border)] backdrop-blur-sm group hover:border-[var(--hs-border-hover)] transition-colors duration-300"
                        >
                            <p className="text-[16px] leading-relaxed italic mb-6 text-[var(--hs-text-secondary)] group-hover:text-[var(--hs-text)] transition-colors duration-300">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[var(--hs-surface-active)] border border-[var(--hs-border)] flex items-center justify-center text-xs font-bold text-[var(--hs-text)] uppercase tracking-wider">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-[14px] font-bold text-[var(--hs-text)] font-headline">{t.name}</div>
                                    <div className="text-[11px] text-[var(--hs-text-muted)] font-mono uppercase tracking-widest">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

/* ── Feature item ──────────────────────────────────────── */
function FeatureItem({ feature, index, accentRgb }: { feature: AppFeature; index: number; accentRgb: string }) {
    const [open, setOpen] = useState(false);
    const { isDark } = useTheme();
    const shouldReduceMotion = useReducedMotion();

    // Performance optimized mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 500, damping: 50 });
    const springY = useSpring(mouseY, { stiffness: 500, damping: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : (index % 2) * 0.05 }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onMouseMove={handleMouseMove}
            className="relative"
        >
            <motion.div
                whileHover={shouldReduceMotion ? {} : {
                    y: -2,
                    boxShadow: isDark ? `0 12px 30px rgba(${accentRgb}, 0.1)` : `0 8px 20px rgba(${accentRgb}, 0.06)`,
                    borderColor: `rgba(${accentRgb}, ${isDark ? 0.4 : 0.25})`
                }}
                className="text-left rounded-2xl p-6 transition-all duration-500 group w-full relative overflow-hidden cursor-pointer"
                style={{
                    border: '1px solid var(--hs-border)',
                    background: 'var(--hs-surface)',
                }}
            >
                {/* Extraordinary hover glow */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                        background: `radial-gradient(400px circle at var(--x) var(--y), rgba(${accentRgb}, ${isDark ? 0.08 : 0.04}), transparent 60%)`,
                        // @ts-ignore
                        '--x': springX,
                        '--y': springY
                    } as any}
                />

                <div className="flex items-start gap-5 relative z-10">
                    <span className="text-2xl mt-0.5 leading-none shrink-0 filter drop-shadow-sm group-hover:scale-110 transition-transform duration-500">{feature.icon}</span>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[16px] font-bold font-headline transition-colors group-hover:text-[var(--hs-text)]" style={{ color: 'var(--hs-text-secondary)' }}>{feature.title}</span>
                            <motion.svg
                                width="14" height="14" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                animate={{ rotate: open ? 180 : 0, color: open ? `rgb(${accentRgb})` : 'var(--hs-text-ghost)' }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="shrink-0"
                            >
                                <path d="M6 9l6 6 6-6" />
                            </motion.svg>
                        </div>
                        <AnimatePresence>
                            {open && (
                                <motion.p
                                    initial={{ height: 0, opacity: 0, y: -4 }}
                                    animate={{ height: 'auto', opacity: 1, y: 0 }}
                                    exit={{ height: 0, opacity: 0, y: -4 }}
                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-[14px] leading-relaxed mt-4 overflow-hidden"
                                    style={{ color: 'var(--hs-text-secondary)' }}
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
    const shouldReduceMotion = useReducedMotion();
    const [stats, setStats] = useState(app.stats);

    // Fetch real GitHub stats if available
    useEffect(() => {
        if (app.githubUrl) {
            const repo = app.githubUrl.split('github.com/')[1];
            if (repo) {
                axios.get(`https://api.github.com/repos/${repo}`)
                    .then(res => {
                        setStats({
                            stars: res.data.stargazers_count,
                            downloads: stats?.downloads || 0
                        });
                    })
                    .catch(() => {
                        // Fallback to static data
                    });
            }
        }
    }, [app.githubUrl, stats?.downloads]);

    // Motion variants
    const containerVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.08,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="space-y-12"
        >
            {/* ── Hero band ── */}
            <motion.div
                variants={itemVariants}
                className="relative rounded-[2.5rem] overflow-hidden group"
                style={{
                    background: isDark
                        ? `linear-gradient(160deg, rgba(${app.accentRgb},0.08) 0%, var(--hs-surface) 60%)`
                        : `linear-gradient(160deg, rgba(${app.accentRgb},0.04) 0%, var(--hs-surface) 60%)`,
                    border: '1px solid var(--hs-border)',
                    boxShadow: isDark ? 'none' : 'var(--hs-card-shadow)',
                }}
            >
                {/* Aurora Background (Dynamic) */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.25]">
                    <Aurora
                        colorStops={[
                            `rgb(${app.accentRgb})`,
                            isDark ? '#7cff67' : '#22c55e',
                            `rgb(${app.accentRgb})`
                        ]}
                        amplitude={isDark ? 0.6 : 0.4}
                    />
                </div>

                <div className="p-10 md:p-14 relative z-10 w-full">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                        {/* Icon + identity */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 flex-1 min-w-0">
                            <motion.div
                                className="w-24 h-24 rounded-[2rem] flex items-center justify-center shrink-0 cursor-default shadow-2xl"
                                whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                style={{
                                    background: `rgba(${app.accentRgb}, ${isDark ? 0.15 : 0.1})`,
                                    border: `1px solid rgba(${app.accentRgb}, ${isDark ? 0.25 : 0.15})`,
                                    boxShadow: `0 20px 40px rgba(${app.accentRgb}, ${isDark ? 0.2 : 0.1})`
                                }}
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.9, 1, 0.9]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={app.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18.36 6.64A9 9 0 015.63 5.63" />
                                        <path d="M12 2v4" />
                                        <circle cx="12" cy="12" r="3" />
                                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                                    </svg>
                                </motion.div>
                            </motion.div>

                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-5">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight font-headline" style={{ color: 'var(--hs-text)' }}>{app.name}</h1>
                                    <div className="flex items-center gap-3">
                                        <span
                                            className="px-3 py-1 text-[11px] font-bold font-mono tracking-[0.2em] uppercase rounded-full shadow-sm"
                                            style={{ color: `rgba(${app.accentRgb}, 1)`, background: `rgba(${app.accentRgb}, ${isDark ? 0.15 : 0.1})`, border: `1px solid rgba(${app.accentRgb}, 0.2)` }}
                                        >
                                            v{app.version}
                                        </span>
                                        <span
                                            className="px-3 py-1 text-[11px] font-bold font-mono tracking-[0.2em] uppercase rounded-full shadow-sm bg-[var(--hs-surface-hover)] border border-[var(--hs-border)] text-[var(--hs-text-muted)]"
                                        >
                                            {app.platform}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-lg md:text-xl font-medium max-w-2xl leading-relaxed text-[var(--hs-text-secondary)]">
                                    {app.tagline}
                                </p>

                                <div className="flex flex-wrap items-center gap-8 pt-2">
                                    {stats && (
                                        <div className="flex items-center gap-8" aria-label="Project Statistics">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2 text-amber-500">
                                                    <FaStar className="text-sm" />
                                                    <span className="text-lg font-bold font-mono">{stats.stars}</span>
                                                </div>
                                                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--hs-text-muted)] font-bold">Stars</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2 text-sky-500">
                                                    <FaDownload className="text-sm" />
                                                    <span className="text-lg font-bold font-mono">{stats.downloads}+</span>
                                                </div>
                                                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--hs-text-muted)] font-bold">Installs</span>
                                            </div>
                                        </div>
                                    )}
                                    {app.githubUrl && (
                                        <a
                                            href={app.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="h-11 px-6 rounded-2xl flex items-center justify-center gap-3 bg-[var(--hs-surface-hover)] border border-[var(--hs-border)] hover:border-[var(--hs-border-hover)] hover:bg-[var(--hs-surface-active)] transition-all duration-300 text-[var(--hs-text-secondary)] hover:text-[var(--hs-text)]"
                                        >
                                            <FaGithub className="text-xl" />
                                            <span className="text-xs font-bold font-mono tracking-widest uppercase">Source Code</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Downloads (Themed & Elegant) */}
                        <div className="flex flex-col gap-4 shrink-0 lg:w-72">
                            {app.downloads.map((d, i) => (
                                <motion.a
                                    key={d.fileName}
                                    href={`/products/${d.fileName}`}
                                    download
                                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: shouldReduceMotion ? 0 : 0.4 + (i * 0.1), type: 'spring' }}
                                    whileHover={shouldReduceMotion ? {} : {
                                        scale: 1.02,
                                        y: -2,
                                        backgroundColor: d.type === 'installer' ? `rgba(${app.accentRgb}, ${isDark ? 0.2 : 0.15})` : 'var(--hs-surface-active)'
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center justify-between gap-5 px-6 py-4 rounded-[1.25rem] text-[14px] font-bold transition-all duration-500 border group/btn"
                                    style={d.type === 'installer' ? {
                                        color: 'var(--hs-text)',
                                        borderColor: `rgba(${app.accentRgb}, ${isDark ? 0.4 : 0.2})`,
                                        background: `rgba(${app.accentRgb}, ${isDark ? 0.1 : 0.05})`,
                                        boxShadow: isDark ? 'none' : `0 4px 20px rgba(${app.accentRgb}, 0.1)`
                                    } : {
                                        color: 'var(--hs-text-secondary)',
                                        borderColor: 'var(--hs-border)',
                                        background: 'var(--hs-surface)',
                                    }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-500 ${d.type === 'installer' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-[var(--hs-surface-hover)] text-[var(--hs-text-muted)] group-hover/btn:text-[var(--hs-text)]'
                                            }`}>
                                            <FaDownload className="text-sm" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="leading-none mb-1">{d.label}</span>
                                            <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest">{d.type}</span>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-mono opacity-40 font-medium">{d.size}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ── Body ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
                {/* Left */}
                <div className="space-y-12">
                    {/* About */}
                    <motion.div
                        variants={itemVariants}
                        className="rounded-[2rem] p-10 md:p-14"
                        style={{ border: '1px solid var(--hs-border)', background: 'var(--hs-surface)', boxShadow: isDark ? 'none' : 'var(--hs-card-shadow)' }}
                    >
                        <GradientHeading text="The Vision" className="text-[10px] font-mono tracking-[0.5em] uppercase mb-8" />
                        <p className="text-[18px] md:text-[20px] leading-[1.8] font-medium text-[var(--hs-text-secondary)]">{app.description}</p>
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        variants={itemVariants}
                        className="rounded-[2rem] p-10 md:p-14"
                        style={{ border: '1px solid var(--hs-border)', background: 'var(--hs-surface)', boxShadow: isDark ? 'none' : 'var(--hs-card-shadow)' }}
                    >
                        <div className="flex items-center justify-between mb-12">
                            <GradientHeading text="Experience" className="text-[10px] font-mono tracking-[0.5em] uppercase" />
                            <div className="h-px flex-1 mx-8 bg-[var(--hs-border)] opacity-50" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {app.features.map((f, i) => (
                                <FeatureItem key={i} feature={f} index={i} accentRgb={app.accentRgb} />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right sidebar */}
                <div className="space-y-10">
                    {/* Tech Stack */}
                    <motion.div
                        variants={itemVariants}
                        className="rounded-[2rem] p-10"
                        style={{ border: '1px solid var(--hs-border)', background: 'var(--hs-surface)', boxShadow: isDark ? 'none' : 'var(--hs-card-shadow)' }}
                    >
                        <GradientHeading text="Architecture" className="text-[10px] font-mono tracking-[0.4em] uppercase mb-8" />
                        <div className="flex flex-wrap gap-3">
                            {app.tech.map((t) => (
                                <span
                                    key={t}
                                    className="px-4 py-2.5 text-[13px] font-bold tracking-tight rounded-2xl transition-all duration-300 border border-[var(--hs-border)] text-[var(--hs-text-secondary)] bg-[var(--hs-surface-hover)] hover:bg-[var(--hs-surface-active)] hover:text-[var(--hs-text)] hover:scale-105"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Installation Guide */}
                    <motion.div
                        variants={itemVariants}
                        className="rounded-[2rem] p-10"
                        style={{ border: '1px solid var(--hs-border)', background: 'var(--hs-surface)', boxShadow: isDark ? 'none' : 'var(--hs-card-shadow)' }}
                    >
                        <GradientHeading text="Get Started" className="text-[10px] font-mono tracking-[0.4em] uppercase mb-10" />
                        <div className="space-y-8">
                            {app.downloads.find(d => d.type === 'installer') && (
                                <div className="group/step">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div
                                            className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-500 group-hover/step:scale-110 shadow-lg"
                                            style={{ background: `rgba(${app.accentRgb}, 0.15)`, color: app.accentColor, border: `1px solid rgba(${app.accentRgb}, 0.2)` }}
                                        >
                                            01
                                        </div>
                                        <span className="text-[15px] font-bold text-[var(--hs-text)]">Installer</span>
                                    </div>
                                    <div className="text-[14px] leading-relaxed ml-12 space-y-2 text-[var(--hs-text-secondary)]">
                                        <p className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[var(--hs-text-muted)]" /> Setup wizard</p>
                                        <p className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[var(--hs-text-muted)]" /> Auto-updates</p>
                                    </div>
                                </div>
                            )}

                            <div className="h-px bg-[var(--hs-border)]" />

                            {app.downloads.find(d => d.type === 'portable') && (
                                <div className="group/step">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-500 group-hover/step:scale-110 bg-[var(--hs-surface-active)] text-[var(--hs-text-secondary)] border border-[var(--hs-border)] shadow-md">
                                            02
                                        </div>
                                        <span className="text-[15px] font-bold text-[var(--hs-text)]">Portable</span>
                                    </div>
                                    <div className="text-[14px] leading-relaxed ml-12 space-y-2 text-[var(--hs-text-secondary)]">
                                        <p className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[var(--hs-text-muted)]" /> No install</p>
                                        <p className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[var(--hs-text-muted)]" /> Zero registry</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Testimonials */}
            <motion.div variants={itemVariants} className="pt-8">
                <ProductTestimonials accentRgb={app.accentRgb} />
            </motion.div>
        </motion.div>
    );
}

/* ── Page ──────────────────────────────────────────────── */
export default function AppDetailPage() {
    const { isDark } = useTheme();
    const { id } = useParams<{ id: string }>();
    const app = id ? getAppById(id) : undefined;

    if (!app) {
        return <Navigate to="/apps" replace />;
    }

    return (
        <div className="min-h-screen transition-colors duration-500" style={{ background: 'var(--hs-page)', color: 'var(--hs-text)' }}>
            {/* Noise Texture */}
            <svg className="fixed inset-0 w-full h-full pointer-events-none z-50 opacity-[0.015] dark:opacity-[0.035]" aria-hidden>
                <filter id="nd"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter>
                <rect width="100%" height="100%" filter="url(#nd)" />
            </svg>

            {/* Sticky Navigation */}
            <motion.nav
                className="sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-500"
                style={{
                    background: isDark ? 'rgba(5,5,5,0.7)' : 'rgba(244,242,239,0.7)',
                    borderColor: 'var(--hs-border)'
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/apps" className="group flex items-center gap-3 transition-colors duration-300 text-[var(--hs-text-secondary)] hover:text-[var(--hs-text)]">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--hs-surface-hover)] border border-[var(--hs-border)] group-hover:scale-110 transition-transform duration-300">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </div>
                        <span className="text-sm font-bold font-headline tracking-tight">Gallery</span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <span className="hidden md:block text-[10px] font-mono tracking-[0.4em] uppercase opacity-40">{app.name}</span>
                        <div className="w-px h-4 bg-[var(--hs-border)] hidden md:block" />
                        <ThemeToggle />
                    </div>
                </div>
            </motion.nav>

            {/* Main Content Container */}
            <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
                <AppDetail app={app} />
            </main>

            {/* Elegant Footer Spacer */}
            <div className="h-20" />
        </div>
    );
}
