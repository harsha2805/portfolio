import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Experience from '@/sections/Experience';
import Projects from '@/sections/Projects';
import Testimonials from '@/sections/Testimonials';
import Contact from '@/sections/Contact';
import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function Portfolio() {
    // Every refresh (current):
    const [loaded, setLoaded] = useState(false);

    //// First visit only (old behaviour):
    // const alreadySeen = sessionStorage.getItem('loader_seen') === '1';
    // const [loaded, setLoaded] = useState(alreadySeen);
    //// + add sessionStorage.setItem('loader_seen', '1') inside onDone

    return (
        <>
            {!loaded && <Loader onDone={() => setLoaded(true)} />}

            <Nav />
            <motion.main
                className="bg-[#050505] antialiased"
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ duration: 0.6 }}
            >
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Projects />
                <Testimonials />
                <Contact />
            </motion.main>
        </>
    );
}
