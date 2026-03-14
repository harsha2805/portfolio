import GradientHeading from '@/components/ui/GradientHeading';
import { motion } from 'motion/react';

const techColors: Record<string, string> = {
    Laravel: '#FF2D20',
    PHP: '#777BB4',
    Bootstrap: '#7952B3',
    JavaScript: '#E5C027',
    MySQL: '#4479A1',
    'python-pptx': '#3776AB',
    Python: '#3776AB',
    Jupyter: '#F37626',
    'scikit-learn': '#F89939',
    Pandas: '#150458',
};

type Project = {
    index: string;
    title: string;
    description: string;
    tags: string[];
    link: string;
    accent: string;
    url?: string;
};

const projects: Project[] = [
    {
        index: '01',
        title: 'BERR.IN',
        description:
            'E-commerce platform for luxury home décor and artisanal personal care products. Features product browsing, cart, wishlist, order tracking, and a glassmorphism-styled frontend with smooth animations.',
        tags: ['Laravel', 'Bootstrap', 'JavaScript', 'MySQL'],
        link: 'https://berr.in',
        accent: '#FF2D20',
        url: 'berr.in',
    },
    {
        index: '02',
        title: 'Invoice System',
        description: 'Full-stack billing system with client management, itemised invoices, and payment tracking.',
        tags: ['PHP', 'Laravel', 'MySQL'],
        link: 'https://github.com/harsha2805/invoiceSystem',
        accent: '#777BB4',
    },
    {
        index: '03',
        title: 'Image to PPTX',
        description: 'Python utility that batch-converts all images in a folder into a structured PowerPoint — one slide per image.',
        tags: ['Python', 'python-pptx'],
        link: 'https://github.com/harsha2805/imageToPptx',
        accent: '#3776AB',
    },
    {
        index: '04',
        title: 'Referral App',
        description: 'Referral tracking application managing user referrals, rewards, and campaign analytics with a PHP backend.',
        tags: ['PHP', 'Laravel', 'MySQL'],
        link: 'https://github.com/harsha2805/referralApp',
        accent: '#FF2D20',
    },
    {
        index: '05',
        title: 'Employee Portal',
        description: 'HR portal for managing employee records, departments, attendance, and payroll workflows.',
        tags: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
        link: 'https://github.com/harsha2805/employeeManagementPortal',
        accent: '#4479A1',
    },
    {
        index: '06',
        title: 'Car Valuation ML',
        description: 'ML model that evaluates vehicle parameters and forecasts the optimal resale price using regression analysis on real-world datasets.',
        tags: ['Python', 'Jupyter', 'scikit-learn', 'Pandas'],
        link: 'https://github.com/harsha2805/smartUsedCarValuation',
        accent: '#F37626',
    },
];

// Bento layout:
// Row 1+2 col 1-2: featured (berr.in)   | Row 1 col 3: projects[1]
//                                         | Row 2 col 3: projects[2]
// Row 3 col 1: projects[3] | col 2: projects[4] | col 3: projects[5]
const [featured, ...rest] = projects;

export default function Projects() {
    return (
        <section id="projects" className="py-16 md:py-32 px-6 bg-[#050505]">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-4"
                >
                    <span className="text-xs font-mono text-purple-400/60 tracking-[0.3em] uppercase">
                        04 / Projects
                    </span>
                </motion.div>

                <GradientHeading
                    text="Selected work."
                    className="text-4xl md:text-5xl font-bold leading-tight mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Featured — spans 2 cols × 2 rows */}
                    <ProjectCard project={featured} featured delay={0} className="md:col-span-2 md:row-span-2" />

                    {/* The remaining 5 auto-fill the grid */}
                    {rest.map((project, i) => (
                        <ProjectCard key={project.index} project={project} delay={(i + 1) * 0.08} />
                    ))}
                </div>

                {/* View More */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8 flex justify-center"
                >
                    <motion.a
                        href="https://github.com/harsha2805"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                        className="group relative flex items-center gap-4 border border-white/10 hover:border-purple-500/30 rounded-full px-8 py-3.5 overflow-hidden transition-colors duration-300"
                    >
                        {/* Sweep fill */}
                        <motion.span
                            variants={{ rest: { x: '-101%' }, hover: { x: '0%' } }}
                            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="absolute inset-0 bg-gradient-to-r from-purple-700/30 via-violet-500/15 to-transparent pointer-events-none"
                        />
                        {/* Left glow blob */}
                        <motion.span
                            variants={{ rest: { opacity: 0, scale: 0.4 }, hover: { opacity: 1, scale: 1 } }}
                            transition={{ duration: 0.3 }}
                            className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-purple-500/50 blur-lg pointer-events-none"
                        />
                        <span className="relative text-sm font-mono text-white/40 group-hover:text-white/80 transition-colors duration-300">
                            View all projects on GitHub
                        </span>
                        <motion.span
                            variants={{ rest: { x: 0 }, hover: { x: 5 } }}
                            transition={{ duration: 0.25 }}
                            className="relative text-white/30 group-hover:text-purple-400 transition-colors duration-300 text-base leading-none"
                        >
                            →
                        </motion.span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}

function ProjectCard({
    project,
    featured = false,
    className = '',
    delay = 0,
}: {
    project: Project;
    featured?: boolean;
    className?: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={`min-h-[200px] ${className}`}
        >
            <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                    y: -4,
                    boxShadow: `0 24px 56px ${project.accent}18, 0 0 0 1px ${project.accent}30`,
                }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="relative flex flex-col h-full rounded-2xl bg-[#0a0a0a] border border-white/[0.06] overflow-hidden group"
                style={{ borderLeft: `2px solid ${project.accent}55` }}
            >
                {/* Faded watermark number */}
                <span
                    aria-hidden="true"
                    className={`pointer-events-none select-none absolute bottom-3 right-4 font-black leading-none ${
                        featured
                            ? 'text-[80px] md:text-[140px]'
                            : 'text-[60px] md:text-[100px]'
                    }`}
                    style={{
                        color: project.accent,
                        opacity: 0.04,
                        lineHeight: 1,
                    }}
                >
                    {project.index}
                </span>

                <div className="relative flex flex-col h-full p-6 md:p-8">
                    {/* Browser chrome — featured only */}
                    {featured && project.url && (
                        <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 mb-8">
                            <div className="flex gap-1.5 shrink-0">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                            </div>
                            <div className="flex-1 bg-white/[0.04] rounded px-3 py-0.5 flex justify-center">
                                <span className="text-xs font-mono text-white/30 tracking-wide">
                                    https://{project.url}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Top row — index + arrow */}
                    <div className={`flex items-center justify-between ${featured ? 'mb-auto' : 'mb-4'}`}>
                        <span
                            className="text-xs font-mono tracking-widest"
                            style={{ color: `${project.accent}80` }}
                        >
                            {project.index}
                        </span>
                        <motion.span
                            className="text-white/20 group-hover:text-white/70 transition-colors duration-300 text-lg leading-none"
                            whileHover={{ x: 2, y: -2 }}
                        >
                            ↗
                        </motion.span>
                    </div>

                    {/* Content */}
                    <div className={featured ? 'mt-10' : ''}>
                        {/* Accent dot + title */}
                        <div className="flex items-center gap-2 mb-2">
                            <span
                                className="w-1.5 h-1.5 rounded-full shrink-0"
                                style={{ background: project.accent }}
                            />
                            <h3
                                className={`font-bold text-white group-hover:text-white/90 transition-colors duration-300 ${
                                    featured ? 'text-3xl md:text-4xl' : 'text-base'
                                }`}
                            >
                                {project.title}
                            </h3>
                        </div>

                        <p
                            className={`text-white/40 leading-relaxed mb-5 ${
                                featured ? 'text-sm md:text-base mt-3' : 'text-xs mt-2'
                            }`}
                        >
                            {project.description}
                        </p>

                        {/* Tags with tech-color dots */}
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="flex items-center gap-1.5 text-xs font-mono text-white/40 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-full"
                                >
                                    <span
                                        className="w-1 h-1 rounded-full shrink-0"
                                        style={{ background: techColors[tag] ?? '#ffffff40' }}
                                    />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.a>
        </motion.div>
    );
}
