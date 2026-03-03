import { CSSProperties, ReactNode } from 'react';

interface GlareHoverProps {
    width?: string;
    height?: string;
    background?: string;
    borderRadius?: string;
    borderColor?: string;
    children?: ReactNode;
    glareColor?: string;
    glareOpacity?: number;
    glareAngle?: number;
    glareSize?: number;
    transitionDuration?: number;
    playOnce?: boolean;
    className?: string;
    style?: CSSProperties;
}

declare function GlareHover(props: GlareHoverProps): JSX.Element;

export default GlareHover;
