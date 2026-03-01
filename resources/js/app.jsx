import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import TestimonialsPage from './pages/TestimonialsPage';

const root = document.getElementById('app');
if (root) {
    createRoot(root).render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
            </Routes>
        </BrowserRouter>
    );
}
