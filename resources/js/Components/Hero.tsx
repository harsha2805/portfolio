import { useEffect, useState } from 'react';
import FloatingLines from '@/Components/FloatingLines';

export default function Hero() {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffset(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative h-screen min-h-[600px] w-full flex flex-col justify-center items-center overflow-hidden bg-black">

            {/* 1. Background: Floating Lines */}
            <div className="absolute inset-0 z-0 opacity-60">
                <FloatingLines
                    enabledWaves={["top", "middle", "bottom"]}
                    lineCount={9}
                    lineDistance={5}
                    bendRadius={5}
                    bendStrength={-0.5}
                    interactive={true}
                    parallax={true}
                />
            </div>

            {/* 2. Atmospheric Glow */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-blue-700/20 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[100px] mix-blend-screen" />
                {/* Vignette to keep edges dark */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
            </div>

            {/* 3. Main Content */}
            <div
                className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full"
                style={{ transform: `translateY(${offset * 0.2}px)` }} // Slight parallax on container
            >
                {/* Top Name */}
                <h2 className="text-sm md:text-base text-neutral-500 font-medium tracking-[0.4em] uppercase mb-4 animate-fade-in-up">
                    Harshavardhan C
                </h2>

                {/* Main Title Group */}
                <div
                    className="flex flex-col items-center leading-[0.85] tracking-tighter"
                    style={{
                        transform: `scale(${1 + offset * 0.0005})`, // Subtle zoom on scroll
                        transition: 'transform 0.1s ease-out'
                    }}
                >
                    {/* "CREATIVE" - Solid White with subtle glow */}
                    <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white uppercase drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                        Creative
                    </h1>

                    {/* "DEVELOPER" - Metallic/Silver Gradient */}
                    <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-400 to-neutral-800 pb-2">
                        Developer
                    </h1>
                </div>

                {/* Tagline */}
                <p className="mt-8 max-w-lg text-neutral-400 text-xs md:text-sm font-medium tracking-[0.2em] uppercase opacity-80">
                    Building digital experiences that leave a mark.
                </p>
            </div>

            {/* 4. Scroll Indicator */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20 opacity-60">
                <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">Scroll</span>
                {/* The vertical line from the image */}
                <div className="w-[1px] h-16 bg-gradient-to-b from-neutral-400 to-transparent opacity-50"></div>
            </div>
        </div>
    );
}