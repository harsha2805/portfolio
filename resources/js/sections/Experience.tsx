import GradientHeading from '@/components/ui/GradientHeading';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef, type MouseEvent } from 'react';

const experiences = [
    {
        index: '01',
        period: '2021 – 2023',
        status: 'Past',
        company: 'Acme Studio',
        role: 'Full Stack Developer',
        description:
            'Built and maintained customer-facing web applications serving 50k+ users. Led the migration from a legacy PHP monolith to a modern Laravel + React stack, cutting load times by 60%.',
        highlights: ['Laravel & React SPA', 'MySQL optimisation', 'REST API design', 'CI/CD with GitHub Actions'],
    },
    {
        index: '02',
        period: '2023 – Present',
        status: 'Current',
        company: 'TechCorp',
        role: 'Senior Frontend Engineer',
        description:
            "Architecting scalable UI systems and leading the frontend team. Introduced TypeScript across the codebase, reduced bundle size by 40%, and established the company's first design system.",
        highlights: ['TypeScript & React', 'Design Systems', 'Performance tuning', 'Team mentorship'],
    },
];

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Spring-smooth progress drives all animations
    const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

    // Card 1 — stays in place, shrinks + fades as card 2 covers it
    const card1Scale   = useTransform(progress, [0.05, 0.85], [1, 0.9]);
    const card1Opacity = useTransform(progress, [0.05, 0.85], [1, 0.25]);

    // Card 2 — slides in from the right to cover card 1
    const card2X = useTransform(progress, [0.05, 0.85], ['105%', '0%']);

    // Hint fades as soon as user starts scrolling
    const hintOpacity = useTransform(progress, [0, 0.12], [1, 0]);

    // Progress dots
    const dot0Opacity = useTransform(progress, [0, 0.5], [1, 0.25]);
    const dot1Opacity = useTransform(progress, [0.4, 0.9], [0.25, 1]);

    return (
        <div ref={containerRef} className="relative h-[280vh] bg-[#050505]">
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col px-6 py-12">

                {/* Header row */}
                <div className="max-w-5xl mx-auto w-full flex items-start justify-between mb-10">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-xs font-mono text-purple-400/60 tracking-[0.3em] uppercase block mb-3"
                        >
                            03 / Experience
                        </motion.span>
                        <GradientHeading
                            text="Where I've worked."
                            className="text-4xl md:text-5xl font-bold leading-tight"
                        />
                    </div>

                    {/* Progress dots */}
                    <div className="flex gap-2 self-end pb-1">
                        <motion.div style={{ opacity: dot0Opacity }} className="w-2 h-2 rounded-full bg-purple-400" />
                        <motion.div style={{ opacity: dot1Opacity }} className="w-2 h-2 rounded-full bg-purple-400" />
                    </div>
                </div>

                {/* Card stack — cards overlap inside this area */}
                <div className="relative flex-1 max-w-5xl mx-auto w-full">

                    {/* Card 1 — base layer */}
                    <TiltCard
                        motionStyle={{ scale: card1Scale, opacity: card1Opacity }}
                        className="absolute inset-0 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-10 md:p-14 flex flex-col justify-between origin-bottom"
                    >
                        <CardContent exp={experiences[0]} />
                    </TiltCard>

                    {/* Card 2 — slides over card 1 */}
                    <TiltCard
                        motionStyle={{ x: card2X }}
                        className="absolute inset-0 rounded-2xl border border-white/[0.08] bg-[#0d0d0d] p-10 md:p-14 flex flex-col justify-between"
                    >
                        <CardContent exp={experiences[1]} />
                    </TiltCard>
                </div>

                {/* Scroll hint */}
                <motion.div style={{ opacity: hintOpacity }} className="max-w-5xl mx-auto w-full mt-6 flex items-center gap-2">
                    <span className="text-xs font-mono text-white/20 tracking-widest">scroll to next</span>
                    <motion.span
                        className="text-white/20 text-xs"
                        animate={{ x: [0, 6, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        →
                    </motion.span>
                </motion.div>
            </div>
        </div>
    );
}

type Exp = (typeof experiences)[number];

function TiltCard({
    children,
    className,
    motionStyle,
}: {
    children: React.ReactNode;
    className: string;
    motionStyle?: Record<string, unknown>;
}) {
    const cardRef = useRef<HTMLDivElement>(null);

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const sheenX = useMotionValue(50);
    const sheenY = useMotionValue(50);

    const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 18 });
    const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 18 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        rawX.set(x);
        rawY.set(y);
        sheenX.set(((e.clientX - rect.left) / rect.width) * 100);
        sheenY.set(((e.clientY - rect.top) / rect.height) * 100);
    };

    const handleMouseLeave = () => {
        rawX.set(0);
        rawY.set(0);
        sheenX.set(50);
        sheenY.set(50);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformPerspective: 900, ...motionStyle }}
            className={`${className} group cursor-default`}
        >
            {/* Cursor-following sheen */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: useTransform(
                        [sheenX, sheenY],
                        ([x, y]) =>
                            `radial-gradient(280px circle at ${x}% ${y}%, rgba(167,139,250,0.08) 0%, transparent 70%)`,
                    ),
                }}
            />
            {children}
        </motion.div>
    );
}

function CardContent({ exp }: { exp: Exp }) {
    return (
        <>
            {/* Top meta */}
            <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-purple-400/60 tracking-widest">{exp.index}</span>
                <span className="text-xs font-mono text-white/20 tracking-widest uppercase border border-white/10 px-2 py-0.5 rounded-full">
                    {exp.status}
                </span>
                <span className="text-xs font-mono text-white/20 tracking-widest ml-auto">{exp.period}</span>
            </div>

            {/* Center — company + role */}
            <div>
                <h3 className="text-5xl md:text-6xl font-bold text-white leading-none mb-3">{exp.company}</h3>
                <p className="text-purple-400 font-mono text-sm tracking-wider">{exp.role}</p>
            </div>

            {/* Bottom — description + highlights */}
            <div className="grid md:grid-cols-2 gap-8">
                <p className="text-white/40 leading-relaxed text-sm">{exp.description}</p>
                <ul className="space-y-2">
                    {exp.highlights.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-white/50">
                            <span className="w-1 h-1 rounded-full bg-purple-400 shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
