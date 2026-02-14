import type { PropsWithChildren } from 'react';

interface SectionProps extends PropsWithChildren {
    id?: string;
    className?: string;
    title?: string;
}

export default function Section({ id, className = '', title, children }: SectionProps) {
    return (
        <section id={id} className={`py-20 px-6 md:px-12 lg:px-24 ${className}`}>
            {title && (
                <h2 className="text-3xl md:text-5xl font-bold mb-12 text-white uppercase tracking-widest opacity-80" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
                    {title}
                </h2>
            )}
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </section>
    );
}
