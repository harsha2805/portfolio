import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './pages/HomePage';

const Portfolio = lazy(() => import('./components/Portfolio'));
const AppsPage = lazy(() => import('./pages/AppsPage'));
const AppDetailPage = lazy(() => import('./pages/AppDetailPage'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));

const root = document.getElementById('app');
if (root) {
    createRoot(root).render(
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/portfolio" element={
                        <Suspense fallback={null}>
                            <Portfolio />
                        </Suspense>
                    } />
                    <Route path="/apps" element={
                        <Suspense fallback={null}>
                            <AppsPage />
                        </Suspense>
                    } />
                    <Route path="/apps/:id" element={
                        <Suspense fallback={null}>
                            <AppDetailPage />
                        </Suspense>
                    } />
                    <Route path="/testimonials" element={
                        <Suspense fallback={null}>
                            <TestimonialsPage />
                        </Suspense>
                    } />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
