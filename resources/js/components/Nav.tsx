import PillNav from '@/components/PillNav';
import { useEffect, useRef, useState } from 'react';

const LOGO_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Ccircle cx='18' cy='18' r='18' fill='%23050505'/%3E%3Ctext x='18' y='23' text-anchor='middle' font-family='system-ui%2Csans-serif' font-weight='700' font-size='12' fill='white'%3EHC%3Ctspan fill='%23a855f7'%3E.%3C/tspan%3E%3C/text%3E%3C/svg%3E`;

const NAV_ITEMS = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export default function Nav() {
    const [active, setActive] = useState('');
    const [show, setShow] = useState(false);
    const lastY = useRef(0);
    const enteredY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            const heroH = window.innerHeight;
            const pastHero = y > heroH * 0.85;

            if (!pastHero) {
                // Still in hero — always hidden
                setShow(false);
            } else if (y < lastY.current) {
                // Scrolling up past hero — always show
                setShow(true);
            } else if (y > enteredY.current + 80) {
                // Scrolled down 80px past where we entered — hide
                setShow(false);
            } else {
                // Just entered past-hero zone (downscroll) — show
                setShow(true);
                enteredY.current = y;
            }

            lastY.current = y;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const sections = NAV_ITEMS
            .map((l) => document.querySelector<HTMLElement>(l.href))
            .filter(Boolean) as HTMLElement[];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive('#' + e.target.id);
                });
            },
            { rootMargin: '-35% 0px -60% 0px' },
        );

        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${
                show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            }`}
        >
            <div className="pt-3">
                <PillNav
                    logo={LOGO_SVG}
                    logoAlt="HC"
                    items={NAV_ITEMS}
                    activeHref={active}
                    baseColor="#6c2ff2"
                    pillColor="rgba(255,255,255,0.04)"
                    hoveredPillTextColor="#ffffff"
                    pillTextColor="rgba(255,255,255,0.55)"
                />
            </div>
        </div>
    );
}
