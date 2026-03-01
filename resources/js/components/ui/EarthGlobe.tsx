import createGlobe from 'cobe';
import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';

const INDIA_PHI   =  1.48;   // longitude offset so India faces forward
const INDIA_THETA =  0.18;   // slight downward tilt for ~11°N

export default function EarthGlobe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const phi       = useRef(INDIA_PHI);
    const dragging  = useRef<number | null>(null);
    const lastX     = useRef(0);
    const vel       = useRef(0);
    const globe     = useRef<ReturnType<typeof createGlobe> | null>(null);

    const init = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const size = canvas.offsetWidth;
        const dpr  = Math.min(window.devicePixelRatio, 2);

        globe.current?.destroy();
        globe.current = createGlobe(canvas, {
            devicePixelRatio: dpr,
            width:  size * dpr,
            height: size * dpr,
            phi:    INDIA_PHI,
            theta:  INDIA_THETA,
            dark:   1,
            diffuse:       1.1,
            mapSamples:    20000,
            mapBrightness: 5.5,
            baseColor:     [0.06, 0.02, 0.14],
            markerColor:   [0.76, 0.33, 1.0],
            glowColor:     [0.28, 0.05, 0.75],
            markers: [
                { location: [11.1271, 78.6569], size: 0.06 },
            ],
            onRender(state) {
                if (dragging.current === null) {
                    vel.current  *= 0.92;
                    phi.current  += 0.004 + vel.current;
                }
                state.phi   = phi.current;
                state.theta = INDIA_THETA;
            },
        });
    }, []);

    useEffect(() => {
        init();
        const ro = new ResizeObserver(init);
        if (canvasRef.current) ro.observe(canvasRef.current);
        return () => { globe.current?.destroy(); ro.disconnect(); };
    }, [init]);

    const onPointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
        dragging.current = e.clientX;
        lastX.current    = e.clientX;
        vel.current      = 0;
        e.currentTarget.setPointerCapture(e.pointerId);
    }, []);

    const onPointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
        if (dragging.current === null) return;
        const dx   = (e.clientX - lastX.current) / 180;
        vel.current  = dx;
        phi.current += dx;
        lastX.current = e.clientX;
    }, []);

    const onPointerUp = useCallback(() => { dragging.current = null; }, []);

    return (
        <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="w-full h-full"
            style={{ cursor: dragging.current ? 'grabbing' : 'grab' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
        />
    );
}
