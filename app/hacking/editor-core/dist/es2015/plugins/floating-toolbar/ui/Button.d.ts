import * as React from 'react';
import { ReactElement, MouseEvent } from 'react';
export declare type ButtonAppearance = 'subtle' | 'danger';
export interface Props {
    title: string;
    icon: ReactElement<any>;
    onClick: React.MouseEventHandler;
    onMouseEnter?: <T>(event: MouseEvent<T>) => void;
    onMouseLeave?: <T>(event: MouseEvent<T>) => void;
    selected?: boolean;
    disabled?: boolean;
    appearance?: ButtonAppearance;
}
declare const _default: ({ title, icon, onClick, onMouseEnter, onMouseLeave, selected, disabled, appearance, }: Props) => JSX.Element;
export default _default;
