import GradientHeading from '@/components/ui/GradientHeading';
import { motion } from 'motion/react';
import { type ComponentType } from 'react';
import type React from 'react';
import {
    SiLaravel,
    SiPhp,
    SiMysql,
    SiPostgresql,
    SiRedis,
    SiDocker,
    SiGit,
    SiGithub,
    SiLinux,
    SiTailwindcss,
    SiTypescript,
    SiVuedotjs,
    SiNodedotjs,
    SiVite,
    SiInertia,
    SiAlpinedotjs,
} from 'react-icons/si';
import { FaReact } from 'react-icons/fa';

type Tool = {
    name: string;
    icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
    color: string;
};

const rowOne: Tool[] = [
    { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
    { name: 'PHP', icon: SiPhp, color: '#777BB4' },
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Vue.js', icon: SiVuedotjs, color: '#42B883' },
    { name: 'Vite', icon: SiVite, color: '#646CFF' },
    { name: 'Inertia', icon: SiInertia, color: '#9553E9' },
];

const rowTwo: Tool[] = [
    { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
    { name: 'Redis', icon: SiRedis, color: '#DC382D' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'Git', icon: SiGit, color: '#F05032' },
    { name: 'GitHub', icon: SiGithub, color: '#ffffff' },
    { name: 'Linux', icon: SiLinux, color: '#FCC624' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
    { name: 'Alpine.js', icon: SiAlpinedotjs, color: '#8BC0D0' },
];

function LogoItem({ tool }: { tool: Tool }) {
    const Icon = tool.icon;
    return (
        <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mx-3 shrink-0 group hover:bg-white/[0.07] transition-colors duration-300">
            <Icon className="w-7 h-7 shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ color: tool.color }} />
            <span className="text-sm font-medium text-white/50 whitespace-nowrap group-hover:text-white/80 transition-colors duration-300">
                {tool.name}
            </span>
        </div>
    );
}

function MarqueeRow({ tools, reverse = false }: { tools: Tool[]; reverse?: boolean }) {
    const doubled = [...tools, ...tools];
    return (
        <div className="overflow-hidden w-full">
            <div className={reverse ? 'animate-marquee-reverse flex' : 'animate-marquee flex'}>
                {doubled.map((tool, i) => (
                    <LogoItem key={`${tool.name}-${i}`} tool={tool} />
                ))}
            </div>
        </div>
    );
}

export default function Skills() {
    return (
        <section id="skills" className="py-32 bg-[#050505] overflow-hidden">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-4"
                >
                    <span className="text-xs font-mono text-purple-400/60 tracking-[0.3em] uppercase">
                        02 / Skills
                    </span>
                </motion.div>

                <GradientHeading
                    text="Tools of the trade."
                    className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                />

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-white/40 text-base mb-16 max-w-lg"
                >
                    The stack I reach for when building for the web — from backend APIs to polished frontends.
                </motion.p>
            </div>

            {/* Edge fades */}
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />

                <div className="flex flex-col gap-4">
                    <MarqueeRow tools={rowOne} />
                    <MarqueeRow tools={rowTwo} reverse />
                </div>
            </div>
        </section>
    );
}
