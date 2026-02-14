import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Section from '@/Components/Section';

/* ─── Data ─────────────────────────────────────────────────── */

interface Job {
    id: number;
    role: string;
    company: string;
    period: string;
    location: string;
    summary: string;
    mainWork: string[];
    outcomes: string[];
    tech: string[];
    accentColor: string;
}

const workHistory: Job[] = [
    {
        id: 1,
        role: 'Laravel Developer',
        company: 'Chathamkulam Projects & Developers Pvt Ltd',
        period: 'Dec 2023 – Oct 2024',
        location: 'On-site · Full-time · 11 mos',
        summary:
            'Focused on business-critical backend systems and internal tools, with an emphasis on maintainable CRM and admin workflows.',
        mainWork: [
            'Developed and supported Laravel-based CRM and internal management modules.',
            'Implemented backend logic for lead handling, reporting, and role-based access.',
            'Managed MySQL schema updates, query tuning, and ongoing data maintenance.',
            'Delivered enhancements and bug fixes in close coordination with operations teams.',
        ],
        outcomes: ['Stabilized day-to-day internal tooling', 'Improved team efficiency through workflow automation'],
        tech: ['Laravel', 'PHP', 'MySQL', 'PhpMyAdmin'],
        accentColor: 'rgba(59,130,246,0.15)',
    },
    {
        id: 2,
        role: 'Software Engineer',
        company: 'Bixware Technologies Pvt Ltd',
        period: 'Nov 2024 – Present',
        location: 'Coimbatore, Tamil Nadu · Hybrid · Full-time',
        summary:
            'Owning full-stack product delivery with a strong backend focus on scalability, clean architecture, and production stability.',
        mainWork: [
            'Built and maintained Laravel APIs powering core product workflows.',
            'Designed modular backend architecture for easier feature expansion and maintenance.',
            'Optimized SQL queries, indexing strategy, and data flows for high-traffic usage.',
            'Integrated third-party services and internal APIs with robust error handling.',
        ],
        outcomes: ['Improved reliability of key product modules', 'Reduced backend bottlenecks in daily operations'],
        tech: ['Laravel', 'JavaScript', 'SQL', 'APIs', 'React', 'PHP'],
        accentColor: 'rgba(6,182,212,0.15)',
    },
];

/* ─── Single Stacking Card ─────────────────────────────────── */

function ExperienceCard({ job, index, total }: { job: Job; index: number; total: number }) {
    const cardRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start 20%', 'end 20%'],
    });

    // Scale down as the user scrolls past — card shrinks into the stack
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

    // Each card sticks a bit lower so they peek out behind each other
    const stickyTop = 80 + index * 28;

    return (
        <motion.div
            ref={cardRef}
            className="sticky mb-10 last:mb-0"
            style={{
                top: `${stickyTop}px`,
                scale,
                zIndex: index + 1,
                transformOrigin: 'top center',
            }}
        >
            <article
                className="group isolate relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 shadow-[0_24px_80px_rgba(0,0,0,0.45)] transition-all duration-300 hover:border-[#0078D4]/50"
            >
                {/* Ambient glow */}
                <div
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(600px circle at 50% 0%, ${job.accentColor}, transparent 70%)` }}
                />

                <div className="relative grid gap-8 p-6 md:p-8 lg:grid-cols-12">
                    {/* ── Left column ── */}
                    <div className="lg:col-span-5">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-[#0078D4]/40 bg-[#0078D4]/15 px-3 text-xs font-bold uppercase tracking-[0.2em] text-[#7ec7ff]">
                                {String(job.id).padStart(2, '0')}
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
                                {job.period}
                            </span>
                        </div>

                        <h4 className="text-2xl font-semibold text-white md:text-3xl">{job.role}</h4>
                        <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-[#7ec7ff]">
                            {job.company}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-neutral-500">{job.location}</p>

                        <p className="mt-6 leading-relaxed text-neutral-300">{job.summary}</p>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {job.tech.map((t) => (
                                <span
                                    key={t}
                                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-300"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* ── Right column ── */}
                    <div className="lg:col-span-7">
                        <div className="rounded-2xl border border-white/10 bg-black/30 p-5 md:p-6">
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-neutral-500">
                                Main Work
                            </p>
                            <ul className="space-y-3">
                                {job.mainWork.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-300">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4fb8ff]" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6 border-t border-white/10 pt-4">
                                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
                                    Key Outcomes
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {job.outcomes.map((outcome) => (
                                        <span
                                            key={outcome}
                                            className="rounded-md border border-[#0078D4]/30 bg-[#0078D4]/10 px-3 py-1 text-xs font-medium text-[#a6dbff]"
                                        >
                                            {outcome}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </motion.div>
    );
}

/* ─── Section ──────────────────────────────────────────────── */

export default function Experience() {
    return (
        <Section id="experience" className="bg-neutral-900/30 py-24">
            <div className="mx-auto max-w-6xl px-4">
                {/* Heading */}
                <div className="mb-16 flex flex-col gap-4">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500">Experience</p>
                    <h3 className="max-w-3xl text-3xl font-semibold leading-tight text-neutral-100 md:text-5xl">
                        Where I've Worked
                    </h3>
                </div>

                {/* Stacking cards */}
                <div>
                    {workHistory.map((job, i) => (
                        <ExperienceCard key={job.id} job={job} index={i} total={workHistory.length} />
                    ))}
                </div>
            </div>
        </Section>
    );
}
