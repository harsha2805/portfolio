import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Portfolio from './components/Portfolio';

const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));

const root = document.getElementById('app');
if (root) {
    createRoot(root).render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/testimonials" element={
                    <Suspense fallback={null}>
                        <TestimonialsPage />
                    </Suspense>
                } />
            </Routes>
        </BrowserRouter>
    );
}
