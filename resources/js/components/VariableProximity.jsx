import { forwardRef, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import './VariableProximity.css';

// Throttled RAF — only runs when visible and skips every other frame on low-end
function useThrottledAnimationFrame(callback, containerRef) {
  const visibleRef = useRef(true);

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [containerRef]);

  useEffect(() => {
    let frameId;
    let skip = false;
    const loop = () => {
      frameId = requestAnimationFrame(loop);
      if (!visibleRef.current) return;
      // Throttle to ~30fps to halve DOM reads
      skip = !skip;
      if (skip) return;
      callback();
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);
}

function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;
    const updatePosition = (x, y) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = ev => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; });
      updatePosition(ev.clientX, ev.clientY);
    };
    const handleTouchMove = ev => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; });
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

const VariableProximity = forwardRef((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 50,
    falloff = 'linear',
    className = '',
    onClick,
    style,
    ...restProps
  } = props;

  const letterRefs = useRef([]);
  const interpolatedSettingsRef = useRef([]);
  const mousePositionRef = useMousePositionRef(containerRef);
  const lastPositionRef = useRef({ x: null, y: null });
  // Cache letter positions — invalidate on resize/scroll
  const letterRectsCache = useRef(null);
  const containerRectCache = useRef(null);

  useEffect(() => {
    const invalidate = () => {
      letterRectsCache.current = null;
      containerRectCache.current = null;
    };
    window.addEventListener('resize', invalidate, { passive: true });
    window.addEventListener('scroll', invalidate, { passive: true });
    return () => {
      window.removeEventListener('resize', invalidate);
      window.removeEventListener('scroll', invalidate);
    };
  }, []);

  const parsedSettings = useMemo(() => {
    const parseSettings = settingsStr =>
      new Map(
        settingsStr
          .split(',')
          .map(s => s.trim())
          .map(s => {
            const [name, value] = s.split(' ');
            return [name.replace(/['"]/g, ''), parseFloat(value)];
          })
      );

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const calculateDistance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const calculateFalloff = useCallback(distance => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    switch (falloff) {
      case 'exponential':
        return norm ** 2;
      case 'gaussian':
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      case 'linear':
      default:
        return norm;
    }
  }, [radius, falloff]);

  const animCallback = useCallback(() => {
    if (!containerRef?.current) return;
    const { x, y } = mousePositionRef.current;
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
      return;
    }
    lastPositionRef.current = { x, y };

    // Cache container + letter rects to avoid per-frame layout reads
    if (!containerRectCache.current) {
      containerRectCache.current = containerRef.current.getBoundingClientRect();
    }
    if (!letterRectsCache.current) {
      letterRectsCache.current = letterRefs.current.map(el =>
        el ? el.getBoundingClientRect() : null
      );
    }
    const containerRect = containerRectCache.current;

    letterRefs.current.forEach((letterRef, index) => {
      if (!letterRef) return;
      const rect = letterRectsCache.current[index];
      if (!rect) return;

      const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
      const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

      const distance = calculateDistance(x, y, letterCenterX, letterCenterY);

      if (distance >= radius) {
        letterRef.style.fontVariationSettings = fromFontVariationSettings;
        return;
      }

      const falloffValue = calculateFalloff(distance);
      const newSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
          return `'${axis}' ${interpolatedValue}`;
        })
        .join(', ');

      interpolatedSettingsRef.current[index] = newSettings;
      letterRef.style.fontVariationSettings = newSettings;
    });
  }, [containerRef, radius, fromFontVariationSettings, parsedSettings, calculateFalloff]);

  useThrottledAnimationFrame(animCallback, containerRef);

  const words = label.split(' ');
  let letterIndex = 0;

  return (
    <span
      ref={ref}
      className={`${className} variable-proximity`}
      onClick={onClick}
      style={{ display: 'inline', ...style }}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map(letter => {
            const currentLetterIndex = letterIndex++;
            return (
              <motion.span
                key={currentLetterIndex}
                ref={el => {
                  letterRefs.current[currentLetterIndex] = el;
                }}
                style={{
                  display: 'inline-block',
                  fontVariationSettings: interpolatedSettingsRef.current[currentLetterIndex]
                }}
                aria-hidden="true"
              >
                {letter}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
