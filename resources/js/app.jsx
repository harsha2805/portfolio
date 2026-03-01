import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import Portfolio from './components/Portfolio';

const root = document.getElementById('app');
if (root) {
    createRoot(root).render(<Portfolio />);
}
