import * as React from 'react';
import { MediaSingleLayout } from '@atlaskit/adf-schema';
import { Props, EnabledHandles } from './types';
import Resizable from 're-resizable';
import { ResizableDirection, NumberSize } from 're-resizable';
export declare const handleSides: string[];
export declare const alignementLayouts: string[];
export default class Resizer extends React.Component<Props & {
    selected: boolean;
    enable: EnabledHandles;
    calcNewSize: (newWidth: number, stop: boolean) => {
        layout: MediaSingleLayout;
        width: number | null;
    };
    snapPoints: number[];
    scaleFactor?: number;
    getColumnLeft: () => number;
    isInlineLike: boolean;
}, {
    isResizing: boolean;
}> {
    resizable: Resizable;
    state: {
        isResizing: boolean;
    };
    handleResizeStart: () => void;
    handleResize: (event: MouseEvent | TouchEvent, direction: ResizableDirection, elementRef: HTMLDivElement, delta: NumberSize) => void;
    highlights: (newWidth: any) => number[] | string[];
    handleResizeStop: (event: any, direction: any, refToElement: any, delta: {
        width: number;
        height: number;
    }) => void;
    setResizableRef: (ref: any) => void;
    render(): JSX.Element;
}
