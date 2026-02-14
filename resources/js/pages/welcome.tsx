import { Head } from '@inertiajs/react';
import About from '@/Components/About';
import Footer from '@/Components/Footer';
import Hero from '@/Components/Hero';
import Experience from '@/Components/Experince';
import Playground from '@/Components/Playground';
import AppLayout from '@/Layouts/AppLayout';

export default function Welcome() {
    return (
        <AppLayout>
            <Head title="Welcome" />

            <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black">
                <Hero />
                <About />
                <Experience />
                <Playground />
                <Footer />
            </div>
        </AppLayout>
    );
}
