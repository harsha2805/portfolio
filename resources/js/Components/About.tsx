import LogoLoop from '@/Components/LogoLoop';
import RotatingText from '@/Components/RotatingText';
import Section from '@/Components/Section';
import { FaServer } from 'react-icons/fa6';
import { SiCss3, SiDocker, SiLaravel, SiMysql, SiPhp, SiPostgresql, SiPython, SiReact } from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';

const focusAreas = [
    'Full-stack web applications with Laravel and React',
    'Scalable APIs, clean architecture, and maintainable code',
    'Cloud-hosted deployments and backend automation'
];

const quickFacts = [
    { label: 'Primary Focus', value: 'Web Engineering' },
    { label: 'Experience', value: 'Product + Client Work' },
    { label: 'Based In', value: 'India' }
];

const techLogos = [
    { node: <SiLaravel className="text-[#FF2D20]" />, title: 'Laravel', href: 'https://laravel.com' },
    { node: <SiPhp className="text-[#777BB4]" />, title: 'PHP', href: 'https://www.php.net' },
    { node: <SiPostgresql className="text-[#336791]" />, title: 'PostgreSQL', href: 'https://www.postgresql.org' },
    { node: <SiMysql className="text-[#4479A1]" />, title: 'MySQL', href: 'https://www.mysql.com' },
    { node: <SiCss3 className="text-[#1572B6]" />, title: 'CSS', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { node: <VscAzure className="text-[#0078D4]" />, title: 'Azure', href: 'https://azure.microsoft.com' },
    { node: <SiDocker className="text-[#2496ED]" />, title: 'Docker', href: 'https://www.docker.com' },
    { node: <FaServer className="text-[#F15A24]" />, title: 'Hosting (DirectAdmin)', href: 'https://www.directadmin.com' },
    { node: <SiPython className="text-[#3776AB]" />, title: 'Python', href: 'https://www.python.org' },
    { node: <SiReact className="text-[#61DAFB]" />, title: 'React', href: 'https://react.dev' }
];

export default function About() {
    return (
        <Section id="about" className="bg-neutral-900/50">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <div className="space-y-8 lg:col-span-7">
                    <div className="mb-8">
                        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                            ABOUT
                        </span>
                        <h2 className="text-4xl font-bold text-white md:text-5xl">
                            Who I Am
                        </h2>
                    </div>

                    <div className="text-2xl font-light leading-snug text-neutral-300 md:text-3xl flex flex-wrap items-center gap-x-2">
                        <span>Building digital products that are</span>
                        <div className="inline-flex min-w-[150px] items-center font-bold text-white">
                            <RotatingText
                                texts={['Reliable', 'Scalable', 'Secure', 'Efficient', 'Timeless']}
                                mainClassName="rounded-md bg-[#0078D4] px-3 py-1 text-white"
                                staggerFrom="last"
                                staggerDuration={0.025}
                                rotationInterval={2000}
                            />
                        </div>
                    </div>

                    <p className="text-lg leading-relaxed text-neutral-400">
                        My workflow focuses on shipping practical features quickly while keeping the codebase clean and
                        scalable. I work primarily with <span className="text-white">Laravel</span> and{' '}
                        <span className="text-white">React</span>.
                    </p>

                    <div className="space-y-3 border-l-2 border-white/10 pl-6">
                        {focusAreas.map((item) => (
                            <p key={item} className="text-sm uppercase tracking-[0.14em] text-neutral-500">
                                {item}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1 lg:content-start">
                    {quickFacts.map((fact) => (
                        <div
                            key={fact.label}
                            className="rounded-lg border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10"
                        >
                            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{fact.label}</p>
                            <p className="mt-2 text-lg font-medium text-white">{fact.value}</p>
                        </div>
                    ))}
                </div>

                <div className="relative w-full border-t border-white/5 pt-12 lg:col-span-12">
                    <h3 className="mb-8 text-center text-xs font-bold uppercase tracking-[0.4em] text-neutral-600">
                        Technology Stack
                    </h3>
                    <div className="relative h-[60px] w-full overflow-hidden">
                        <LogoLoop
                            logos={techLogos}
                            speed={50}
                            direction="left"
                            logoHeight={32}
                            gap={34}
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
}
