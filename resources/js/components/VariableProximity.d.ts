import { type CSSProperties, type RefObject } from 'react';

interface VariableProximityProps {
    label: string;
    fromFontVariationSettings: string;
    toFontVariationSettings: string;
    containerRef: RefObject<HTMLElement | null>;
    radius?: number;
    falloff?: 'linear' | 'exponential' | 'gaussian';
    className?: string;
    onClick?: () => void;
    style?: CSSProperties;
}

declare const VariableProximity: React.ForwardRefExoticComponent<
    VariableProximityProps & React.RefAttributes<HTMLSpanElement>
>;

export default VariableProximity;
