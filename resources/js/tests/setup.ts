import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => {
            store[key] = value.toString();
        }),
        clear: vi.fn(() => {
            store = {};
        }),
        removeItem: vi.fn((key: string) => {
            delete store[key];
        }),
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock IntersectionObserver
class IntersectionObserverMock {
    readonly root: Element | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];
    
    constructor(private callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {}
    
    observe(target: Element) {
        // Immediately trigger callback with a mock entry
        this.callback([{
            isIntersecting: true,
            target,
            intersectionRatio: 1,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
            time: Date.now(),
        }], this);
    }
    
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] { return []; }
}

Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: IntersectionObserverMock,
});

// Mock ogl
vi.mock('ogl', () => {
    return {
        Renderer: vi.fn().mockImplementation(function() {
            return {
                gl: {
                    clearColor: vi.fn(),
                    enable: vi.fn(),
                    blendFunc: vi.fn(),
                    canvas: document.createElement('canvas'),
                    getExtension: vi.fn().mockReturnValue({ loseContext: vi.fn() }),
                },
                setSize: vi.fn(),
                render: vi.fn(),
            };
        }),
        Program: vi.fn().mockImplementation(function() {
            return {
                uniforms: {
                    uTime: { value: 0 },
                    uAmplitude: { value: 0 },
                    uColorStops: { value: [] },
                    uResolution: { value: [0, 0] },
                    uBlend: { value: 0 },
                },
            };
        }),
        Mesh: vi.fn().mockImplementation(function() {
            return {};
        }),
        Color: vi.fn().mockImplementation(function(hex) {
            return { r: 0, g: 0, b: 0 };
        }),
        Triangle: vi.fn().mockImplementation(function() {
            return {
                attributes: { uv: {} },
            };
        }),
    };
});

// Cleanup after each test case
afterEach(() => {
    cleanup();
});
