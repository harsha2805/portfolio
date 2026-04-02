import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AppDetailPage from '../AppDetailPage';
import { ThemeProvider } from '../../context/ThemeContext';
import { apps } from '../../data/apps';

// Mock getAppById to return our test app
vi.mock('../../data/apps', async () => {
    const actual = await vi.importActual('../../data/apps');
    return {
        ...actual as any,
        getAppById: (id: string) => apps.find(a => a.id === id),
    };
});

describe('AppDetailPage', () => {
    it('renders the SmartAwake detail page with the correct theme elements', () => {
        render(
            <ThemeProvider>
                <MemoryRouter initialEntries={['/apps/smartawake']}>
                    <Routes>
                        <Route path="/apps/:id" element={<AppDetailPage />} />
                    </Routes>
                </MemoryRouter>
            </ThemeProvider>
        );

        // Check if SmartAwake name is visible in the heading
        expect(screen.getByRole('heading', { name: /SmartAwake/i })).toBeInTheDocument();

        // Check if tagline is visible
        expect(screen.getByText(apps[0].tagline)).toBeInTheDocument();

        // Check for version and platform tags
        expect(screen.getByText(`v${apps[0].version}`)).toBeInTheDocument();
        expect(screen.getByText(apps[0].platform)).toBeInTheDocument();

        // Check for features
        apps[0].features.forEach(feature => {
            expect(screen.getByText(feature.title)).toBeInTheDocument();
        });
    });

    it('displays the download buttons', () => {
        render(
            <ThemeProvider>
                <MemoryRouter initialEntries={['/apps/smartawake']}>
                    <Routes>
                        <Route path="/apps/:id" element={<AppDetailPage />} />
                    </Routes>
                </MemoryRouter>
            </ThemeProvider>
        );

        apps[0].downloads.forEach(d => {
            expect(screen.getAllByText(d.label).length).toBeGreaterThan(0);
            expect(screen.getByText(d.size)).toBeInTheDocument();
        });
    });

    it('renders the testimonials section', () => {
        render(
            <ThemeProvider>
                <MemoryRouter initialEntries={['/apps/smartawake']}>
                    <Routes>
                        <Route path="/apps/:id" element={<AppDetailPage />} />
                    </Routes>
                </MemoryRouter>
            </ThemeProvider>
        );

        // Check if testimonials heading is present
        expect(screen.getByText(/What Users Say/i)).toBeInTheDocument();
    });
});
