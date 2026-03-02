import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        tailwindcss(),
        react(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react':  ['react', 'react-dom', 'react-router-dom'],
                    'vendor-motion': ['motion/react'],
                    'vendor-three':  ['three'],
                    'vendor-ogl':    ['ogl'],
                    'vendor-cobe':   ['cobe'],
                },
            },
        },
    },
});
