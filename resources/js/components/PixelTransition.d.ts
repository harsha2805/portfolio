import { CSSProperties, ReactNode } from 'react';

interface PixelTransitionProps {
    firstContent: ReactNode;
    secondContent: ReactNode;
    gridSize?: number;
    pixelColor?: string;
    animationStepDuration?: number;
    once?: boolean;
    aspectRatio?: string;
    className?: string;
    style?: CSSProperties;
}

declare function PixelTransition(props: PixelTransitionProps): JSX.Element;

export default PixelTransition;
