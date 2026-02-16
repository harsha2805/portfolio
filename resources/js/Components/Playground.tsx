import Section from '@/Components/Section';
import { FiCpu, FiFolder, FiTerminal, FiArrowRight } from 'react-icons/fi';
import AnimatedList from './AnimatedList';

// Your "Script" Data
const experiments = [
    {
        id: 1,
        title: "Image to PPTX",
        tech: "Python Automation",
        desc: "Stitches folder images into slides automatically.",
        link: "https://github.com/harsha2805/imageToPptx",
        icon: <FiCpu />,
    },
    {
        id: 2,
        title: "Junk File Organizer",
        tech: "OS / FileSystem",
        desc: "Instantly sorts massive file dumps by extension.",
        link: "https://github.com/harsha2805/junkFileOrganizer",
        icon: <FiFolder />,
    },
    {
        id: 3,
        title: "Smart Valuation AI",
        tech: "Machine Learning",
        desc: "Predictive model for pricing using regression.",
        link: "https://github.com/harsha2805/smartUsedCarValuation",
        icon: <FiTerminal />,
    }
];

export default function Playground() {
    return (
        <Section id="playground" className="bg-black py-24 border-t border-neutral-900">
            <div className="container mx-auto px-4 max-w-5xl">

                {/* Styled Header */}
                <div className="mb-16">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                        PLAYGROUND
                    </span>
                    <h2 className="text-4xl font-bold text-white md:text-5xl">
                        Code Experiments
                    </h2>
                </div>

                {/* The Animated List */}
                <AnimatedList
                    items={experiments}
                    className="w-full"
                    displayScrollbar={false}
                    enableArrowNavigation={true}
                    renderItem={(exp, index, isSelected) => (
                        <a
                            href={exp.link}
                            target="_blank"
                            rel="noreferrer"
                            className={`group relative flex items-center justify-between overflow-hidden rounded-lg border p-6 transition-all 
                                ${isSelected
                                    ? 'bg-neutral-800 border-[#0078D4]/50 shadow-[0_0_20px_rgba(0,120,212,0.1)]'
                                    : 'bg-neutral-900/40 border-white/5 hover:bg-neutral-800 hover:border-[#0078D4]/30'
                                }
                            `}
                        >
                            {/* Left Side: Icon & Info */}
                            <div className="flex items-center gap-6">
                                {/* Icon Box */}
                                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded bg-black border border-neutral-800 transition-colors
                                    ${isSelected ? 'text-white bg-[#0078D4]' : 'text-[#0078D4] group-hover:bg-[#0078D4] group-hover:text-white'}
                                `}>
                                    {exp.icon}
                                </div>

                                <div>
                                    <h3 className={`text-lg font-bold transition-colors ${isSelected ? 'text-[#0078D4]' : 'text-white group-hover:text-[#0078D4]'}`}>
                                        {exp.title}
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-mono text-[#0078D4]">
                                            {exp.tech}
                                        </span>
                                        <span className="hidden sm:inline-block text-xs text-neutral-500">•</span>
                                        <span className="hidden sm:inline-block text-sm text-neutral-400">
                                            {exp.desc}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Arrow & Mobile Desc */}
                            <div className="flex items-center gap-4">
                                <span className="block sm:hidden text-xs text-neutral-500 max-w-[100px] truncate">
                                    {exp.desc}
                                </span>
                                <FiArrowRight className={`transition-transform text-neutral-600 ${isSelected ? 'translate-x-1 text-white' : 'group-hover:translate-x-1 group-hover:text-white'}`} />
                            </div>
                        </a>
                    )}
                />

                {/* Footer Link */}
                <div className="mt-8 text-center">
                    <a href="https://github.com/harsha2805" className="text-xs font-mono text-neutral-600 hover:text-white transition-colors">
                        View all repositories →
                    </a>
                </div>

            </div>
        </Section>
    );
}
