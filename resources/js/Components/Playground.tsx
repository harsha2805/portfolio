
import { FiGithub, FiTerminal, FiCpu, FiFolder, FiX, FiExternalLink } from 'react-icons/fi';
import CircularGallery from './CircularGallery';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const experiments = [
    {
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
        text: 'BERR',
        link: 'https://berr.in',
        description: 'A real-world project built for modern logistics. BERR simplifies delivery management with smart tracking and routing.',
        tech: 'Laravel / Vue / Mapbox',
        icon: <FiFolder />
    },
    {
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop',
        text: 'Web Scripts',
        link: 'https://www.webdevelopmentscripts.com',
        description: 'A curated collection of essential web development scripts and utilities for developers.',
        tech: 'JS / Node',
        icon: <FiTerminal />
    },
    {
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
        text: 'Image to PPTX',
        link: 'https://github.com/harsha2805/imageToPptx',
        description: 'Automated Python script to stitch folder images into presentation slides instantly.',
        tech: 'Python',
        icon: <FiCpu />
    },
    {
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop',
        text: 'File Organizer',
        link: 'https://github.com/harsha2805/junkFileOrganizer',
        description: 'System utility that instantly sorts massive file dumps by extension type.',
        tech: 'Python / OS',
        icon: <FiFolder />
    },
    {
        image: 'https://images.unsplash.com/photo-1526628953301-3e5f7702a5f5?q=80&w=2070&auto=format&fit=crop',
        text: 'Valuation AI',
        link: 'https://github.com/harsha2805/smartUsedCarValuation',
        description: 'Predictive model for used car pricing using regression analysis.',
        tech: 'Jupyter / ML',
        icon: <FiTerminal />
    },
    // Duplicates for infinite scroll feel
    {
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
        text: 'BERR',
        link: 'https://berr.in',
        description: 'A real-world project built for modern logistics.',
        tech: 'Laravel / Vue',
        icon: <FiFolder />
    },
    {
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
        text: 'Web Scripts',
        link: 'https://www.webdevelopmentscripts.com',
        description: 'Curated web dev scripts.',
        tech: 'JS / Node',
        icon: <FiTerminal />
    },
];

interface Project {
    image: string;
    text: string;
    link: string;
    description?: string;
    tech?: string;
    icon?: React.ReactNode;
}

export default function Playground() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleProjectClick = (item: Project) => {
        setSelectedProject(item);
    };

    return (
        <section id="playground" className="bg-black py-32 border-t border-neutral-900 overflow-hidden">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="mb-8 flex items-end justify-between relative z-10 pointer-events-none">
                    <div className="pointer-events-auto">
                        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.3em] text-[#0078D4]">
                            The Lab
                        </span>
                        <h2 className="text-4xl font-black uppercase tracking-tighter text-white md:text-5xl">
                            Code <span className="text-neutral-600">Playground</span>
                        </h2>
                    </div>

                    <a
                        href="https://github.com/harsha2805"
                        target="_blank"
                        rel="noreferrer"
                        className="hidden md:flex pointer-events-auto items-center gap-2 text-sm font-mono text-neutral-400 hover:text-white transition-colors"
                    >
                        <FiGithub /> github.com/harsha2805
                    </a>
                </div>
            </div>

            {/* Circular Gallery Container - Full Width */}
            <div style={{ height: '600px', position: 'relative' }}>
                <CircularGallery
                    items={experiments}
                    bend={1}
                    textColor="#ffffff"
                    borderRadius={0.05}
                    scrollEase={0.05}
                    onItemClick={handleProjectClick}
                />
            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        {/* Modal Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-[#0a0a0a] border border-neutral-800 shadow-2xl ring-1 ring-white/10"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-white/10 transition-colors"
                            >
                                <FiX />
                            </button>

                            {/* Image Header */}
                            <div className="h-48 w-full overflow-hidden relative">
                                <img
                                    src={selectedProject.image}
                                    alt={selectedProject.text}
                                    className="h-full w-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-8 relative -mt-12">
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                                    {selectedProject.tech || 'Project'}
                                </div>

                                <h3 className="mb-3 text-3xl font-bold text-white">
                                    {selectedProject.text}
                                </h3>

                                <p className="mb-8 text-neutral-400 leading-relaxed">
                                    {selectedProject.description || "A cool project from the lab."}
                                </p>

                                <a
                                    href={selectedProject.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
                                >
                                    View Project <FiExternalLink />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
