import {
    motion,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
} from 'motion/react';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

/* ── Noise texture ─────────────────────────────────────── */
function Noise() {
    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 'var(--hs-noise-opacity)' }} aria-hidden>
            <filter id="nf">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#nf)" />
        </svg>
    );
}

/* ── Rotating conic-gradient border ────────────────────── */
function RotatingBorder({ active, rgb }: { active: boolean; rgb: string }) {
    return (
        <motion.div
            className="absolute -inset-px rounded-2xl z-0 overflow-hidden"
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                className="absolute inset-[-80%] rounded-full"
                style={{
                    background: `conic-gradient(from 0deg, transparent 0%, rgba(${rgb},0.5) 10%, transparent 20%, transparent 50%, rgba(${rgb},0.3) 60%, transparent 70%)`,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
        </motion.div>
    );
}

/* ── Gateway card ──────────────────────────────────────── */
interface CardProps {
    title: string;
    description: string;
    accentColor: string;
    accentRgb: string;
    icon: React.ReactNode;
    label: string;
    isHovered: boolean;
    onHover: (v: boolean) => void;
    onClick: () => void;
}

function GatewayCard({ title, description, accentColor, accentRgb, icon, label, isHovered, onHover, onClick }: CardProps) {
    const { isDark } = useTheme();
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const rotateX = useTransform(useSpring(mouseY, { stiffness: 120, damping: 20 }), [0, 1], [5, -5]);
    const rotateY = useTransform(useSpring(mouseX, { stiffness: 120, damping: 20 }), [0, 1], [-5, 5]);
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
        onHover(false);
        mouseX.set(0.5);
        mouseY.set(0.5);
    }, [onHover, mouseX, mouseY]);

    const restBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className="relative cursor-pointer rounded-2xl w-full"
            style={{
                rotateX,
                rotateY,
                transformPerspective: 900,
                transformStyle: 'preserve-3d',
            }}
            animate={{ y: isHovered ? -6 : 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        >
            <RotatingBorder active={isHovered} rgb={accentRgb} />

            <motion.div
                className="absolute -inset-px rounded-2xl z-0 border"
                animate={{ borderColor: isHovered ? 'transparent' : restBorder }}
                transition={{ duration: 0.3 }}
            />

            <div className="relative z-[1] m-px rounded-2xl overflow-hidden" style={{ background: 'var(--hs-surface)', boxShadow: 'var(--hs-card-shadow)' }}>
                <motion.div
                    className="absolute inset-0 pointer-events-none z-[2]"
                    style={{
                        background: useTransform(
                            [sheenX, sheenY],
                            ([x, y]: string[]) =>
                                `radial-gradient(400px circle at ${x} ${y}, rgba(${accentRgb},0.06), transparent 60%)`,
                        ),
                        opacity: isHovered ? 1 : 0,
                    }}
                />

                <motion.div
                    className="h-px w-full"
                    style={{ background: `linear-gradient(90deg, transparent, rgba(${accentRgb},0.4), transparent)` }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                <div className="p-8 md:p-10">
                    <div className="flex items-center justify-between mb-14 md:mb-18">
                        <span
                            className="text-[10px] font-headline tracking-[0.25em] uppercase font-bold"
                            style={{ color: `rgba(${accentRgb},0.5)` }}
                        >
                            {label}
                        </span>

                        <motion.div
                            className="w-9 h-9 rounded-full border flex items-center justify-center"
                            style={{ borderColor: `rgba(${accentRgb},0.15)` }}
                            animate={{
                                borderColor: isHovered ? `rgba(${accentRgb},0.4)` : `rgba(${accentRgb},0.15)`,
                                background: isHovered ? `rgba(${accentRgb},0.06)` : 'transparent',
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.svg
                                width="14" height="14" viewBox="0 0 24 24" fill="none"
                                stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                animate={{ x: isHovered ? 2 : 0, y: isHovered ? -2 : 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                <path d="M7 17L17 7M17 7H7M17 7v10" />
                            </motion.svg>
                        </motion.div>
                    </div>

                    <div className="flex items-end gap-4 mb-4">
                        <motion.div
                            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                            style={{
                                background: `rgba(${accentRgb},0.06)`,
                                border: `1px solid rgba(${accentRgb},0.1)`,
                            }}
                            animate={{
                                boxShadow: isHovered
                                    ? `0 0 24px rgba(${accentRgb},0.12), 0 0 0 1px rgba(${accentRgb},0.2)`
                                    : `0 0 0px transparent, 0 0 0 1px rgba(${accentRgb},0.1)`,
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            {icon}
                        </motion.div>
                        <h2 className="text-[28px] md:text-[32px] font-semibold tracking-tight leading-none font-headline" style={{ color: 'var(--hs-text)' }}>
                            {title}
                        </h2>
                    </div>

                    <p className="text-[15px] leading-relaxed max-w-xs font-body" style={{ color: 'var(--hs-text-secondary)' }}>
                        {description}
                    </p>
                </div>
            </div>

            <motion.div
                className="absolute -bottom-4 left-[15%] right-[15%] h-16 rounded-full -z-10"
                style={{
                    background: `radial-gradient(ellipse, rgba(${accentRgb},0.1) 0%, transparent 70%)`,
                    filter: 'blur(20px)',
                }}
                animate={{ opacity: isHovered ? (isDark ? 1 : 0.5) : 0, scaleX: isHovered ? 1 : 0.7 }}
                transition={{ duration: 0.5 }}
            />
        </motion.div>
    );
}

/* ── Scroll indicator chevron ──────────────────────────── */
function ScrollIndicator() {
    return (
        <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
        >
            <span className="text-[10px] font-headline tracking-[0.3em] uppercase font-bold" style={{ color: 'var(--hs-text-ghost)' }}>
                Scroll
            </span>
            <motion.svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ stroke: 'var(--hs-text-ghost)' }}
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
                <path d="M12 5v14M19 12l-7 7-7-7" />
            </motion.svg>
        </motion.div>
    );
}

/* ── Main ──────────────────────────────────────────────── */
export default function HomePage() {
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const [hovered, setHovered] = useState<'portfolio' | 'apps' | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    /* scroll-linked hero transforms */
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.92]);
    const heroY = useTransform(scrollYProgress, [0, 0.7], [0, -60]);
    const heroBlur = useTransform(scrollYProgress, [0, 0.7], [0, 10]);
    const heroFilter = useTransform(heroBlur, (v) => `blur(${v}px)`);

    /* cursor-following ambient glow */
    const rawX = useMotionValue(0.5);
    const rawY = useMotionValue(0.5);
    const springX = useSpring(rawX, { stiffness: 18, damping: 12 });
    const springY = useSpring(rawY, { stiffness: 18, damping: 12 });
    const glowLeft = useTransform(springX, (v) => `${v * 100}%`);
    const glowTop = useTransform(springY, (v) => `${v * 100}%`);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;
            rawX.set((e.clientX - rect.left) / rect.width);
            rawY.set((e.clientY - rect.top) / rect.height);
        },
        [rawX, rawY],
    );

    /* hide scroll indicator once user starts scrolling */
    const [scrolled, setScrolled] = useState(false);
    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        if (v > 0.05 && !scrolled) setScrolled(true);
    });

    const glowOpacity = isDark ? 0.07 : 0.04;
    const glowGradient =
        hovered === 'apps'
            ? `radial-gradient(circle, rgba(56,189,248,${glowOpacity}) 0%, transparent 70%)`
            : `radial-gradient(circle, rgba(99,91,255,${glowOpacity}) 0%, transparent 70%)`;

    const ambientOpacity = isDark ? 0.05 : 0.03;

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-screen overflow-x-hidden transition-colors duration-500"
            style={{ background: 'var(--hs-page)' }}
        >
            <Noise />

            {/* Theme toggle */}
            <motion.div
                className="fixed top-6 right-6 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <ThemeToggle />
            </motion.div>

            {/* Ambient background glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div
                    className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full"
                    style={{ background: 'radial-gradient(circle, #635BFF, transparent 70%)', filter: 'blur(120px)', opacity: ambientOpacity }}
                />
                <div
                    className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full"
                    style={{ background: 'radial-gradient(circle, #C3C0FF, transparent 70%)', filter: 'blur(100px)', opacity: ambientOpacity * 0.6 }}
                />
                <div
                    className="absolute top-[40%] left-[50%] w-[30%] h-[30%] rounded-full"
                    style={{ background: 'radial-gradient(circle, #38bdf8, transparent 70%)', filter: 'blur(100px)', opacity: ambientOpacity * 0.3 }}
                />
            </div>

            {/* Cursor-following glow */}
            <motion.div
                className="fixed z-0 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    left: glowLeft,
                    top: glowTop,
                    x: '-50%',
                    y: '-50%',
                    background: glowGradient,
                    filter: 'blur(80px)',
                }}
            />

            {/* ═══════════ HERO SECTION ═══════════ */}
            <section ref={heroRef} className="relative z-10 h-screen flex flex-col items-center justify-center px-6">
                <motion.div
                    className="flex flex-col items-center text-center"
                    style={{ opacity: heroOpacity, scale: heroScale, y: heroY, filter: heroFilter }}
                >
                    {/* Watermark behind heading */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -z-10">
                        <span
                            className="font-headline font-black text-[18vw] md:text-[14vw] uppercase tracking-tighter leading-none"
                            style={{ color: 'var(--hs-text)', opacity: isDark ? 0.02 : 0.03 }}
                        >
                            HOLO
                        </span>
                    </div>

                    {/* Small branded icon */}
                    <motion.div
                        className="mb-8 w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{
                            border: '1px solid var(--hs-border)',
                            background: isDark ? 'rgba(99,91,255,0.04)' : 'rgba(99,91,255,0.03)',
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ scale: 1.08, borderColor: 'rgba(99,91,255,0.3)' }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="url(#hlg2)" fillOpacity="0.15" stroke="url(#hlg2)" strokeWidth="1.2" strokeLinejoin="round" />
                            <path d="M2 12l10 5 10-5" stroke="url(#hlg2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                            <path d="M2 17l10 5 10-5" stroke="url(#hlg2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />
                            <defs>
                                <linearGradient id="hlg2" x1="2" y1="2" x2="22" y2="22">
                                    <stop offset="0%" stopColor="#635BFF" />
                                    <stop offset="100%" stopColor="#C3C0FF" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        className="font-headline font-black text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11rem] uppercase tracking-tighter leading-[0.85]"
                        style={{
                            backgroundImage: isDark
                                ? 'linear-gradient(160deg, #ffffff 20%, #C3C0FF 50%, #635BFF 100%)'
                                : 'linear-gradient(160deg, #131313 20%, #635BFF 60%, #C3C0FF 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        HoloStack
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        className="mt-6 md:mt-8 text-lg md:text-xl lg:text-2xl font-body font-medium tracking-tight max-w-xl leading-relaxed"
                        style={{ color: 'var(--hs-text-secondary)' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Crafting high-end digital experiences
                        <br />
                        through light, depth & intention.
                    </motion.p>

                    {/* Decorative line + label */}
                    <motion.div
                        className="mt-10 flex items-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                    >
                        <div className="h-px w-12" style={{ background: isDark ? 'rgba(195,192,255,0.15)' : 'rgba(99,91,255,0.2)' }} />
                        <span
                            className="text-[10px] font-headline font-bold uppercase tracking-[0.3em]"
                            style={{ color: isDark ? 'rgba(195,192,255,0.4)' : 'rgba(99,91,255,0.5)' }}
                        >
                            By Harshavardhan
                        </span>
                        <div className="h-px w-12" style={{ background: isDark ? 'rgba(195,192,255,0.15)' : 'rgba(99,91,255,0.2)' }} />
                    </motion.div>
                </motion.div>

                {/* Scroll indicator at bottom of hero */}
                <motion.div
                    className="absolute bottom-10"
                    animate={{ opacity: scrolled ? 0 : 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <ScrollIndicator />
                </motion.div>
            </section>

            {/* ═══════════ CARDS SECTION ═══════════ */}
            <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-24">
                {/* Section header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span
                        className="text-[10px] font-headline font-bold uppercase tracking-[0.3em]"
                        style={{ color: 'var(--hs-text-ghost)' }}
                    >
                        Choose your path
                    </span>
                </motion.div>

                {/* Gateway cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 w-full max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <GatewayCard
                            title="Portfolio"
                            description="Projects, skills, and the journey behind the craft."
                            label="01 — Work"
                            accentColor="#635BFF"
                            accentRgb="99,91,255"
                            icon={
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="3" width="20" height="14" rx="2" />
                                    <path d="M8 21h8M12 17v4" />
                                </svg>
                            }
                            isHovered={hovered === 'portfolio'}
                            onHover={(v) => setHovered(v ? 'portfolio' : null)}
                            onClick={() => navigate('/portfolio')}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <GatewayCard
                            title="Explore Apps"
                            description="Tools and products shipped — ideas turned into software."
                            label="02 — Products"
                            accentColor="#38bdf8"
                            accentRgb="56,189,248"
                            icon={
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                                    <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
                                </svg>
                            }
                            isHovered={hovered === 'apps'}
                            onHover={(v) => setHovered(v ? 'apps' : null)}
                            onClick={() => navigate('/apps')}
                        />
                    </motion.div>
                </div>

                {/* Footer */}
                <motion.footer
                    className="mt-20 md:mt-24"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <p className="text-[11px] font-body tracking-[0.2em] uppercase" style={{ color: 'var(--hs-text-ghost)' }}>
                        Built by Harshavardhan
                    </p>
                </motion.footer>
            </section>
        </div>
    );
}
