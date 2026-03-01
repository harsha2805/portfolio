import SpotlightCard from '@/components/ui/SpotlightCard';
import GradientHeading from '@/components/ui/GradientHeading';
import { motion } from 'motion/react';

const projects = [
    {
        title: 'Project Alpha',
        description: 'A full-stack web application built with Laravel and React, featuring real-time collaboration and a powerful dashboard.',
        tags: ['Laravel', 'React', 'MySQL', 'WebSockets'],
        link: '#',
        featured: true,
    },
    {
        title: 'Design System UI',
        description: 'A comprehensive component library and design system with 50+ components, dark/light themes, and full accessibility.',
        tags: ['React', 'TypeScript', 'Tailwind', 'Storybook'],
        link: '#',
        featured: true,
    },
    {
        title: 'API Gateway',
        description: 'High-performance REST API with rate limiting, authentication, caching layers, and auto-generated documentation.',
        tags: ['PHP', 'Laravel', 'Redis', 'Docker'],
        link: '#',
        featured: false,
    },
    {
        title: 'Analytics Dashboard',
        description: 'Real-time analytics platform with interactive charts, custom date ranges, and export functionality.',
        tags: ['Vue.js', 'Laravel', 'Chart.js'],
        link: '#',
        featured: false,
    },
];

export default function Projects() {
    return (
        <section id="projects" className="py-32 px-6 bg-[#050505]">
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

                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            <a href={project.link} className="block h-full group">
                                <SpotlightCard
                                    spotlightColor="rgba(124, 58, 237, 0.12)"
                                    className="h-full transition-transform duration-300 group-hover:-translate-y-1"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            {project.featured && (
                                                <span className="text-xs font-mono text-purple-400 border border-purple-400/30 px-2 py-0.5 rounded-full">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                        <motion.span
                                            className="text-white/30 group-hover:text-white/70 transition-colors duration-300 text-xl"
                                            whileHover={{ x: 3, y: -3 }}
                                        >
                                            ↗
                                        </motion.span>
                                    </div>

                                    <h3 className="text-white text-xl font-bold mb-3 group-hover:text-purple-200 transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-white/50 text-sm leading-relaxed mb-6">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="text-xs font-mono text-white/40 bg-white/5 px-3 py-1 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </SpotlightCard>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
