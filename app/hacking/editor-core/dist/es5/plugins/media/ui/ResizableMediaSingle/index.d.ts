import * as React from 'react';
import { Props } from './types';
export default class ResizableMediaSingle extends React.Component<Props> {
    readonly wrappedLayout: boolean;
    calcNewSize: (newWidth: number, stop: boolean) => {
        width: number;
        layout: import("../../../../../../editor-common/node_modules/@atlaskit/adf-schema/src/schema/nodes/media-single").Layout;
    } | {
        width: number | null;
        layout: "full-width" | "wide";
    };
    readonly $pos: import("prosemirror-model").ResolvedPos<any> | null;
    /**
     * The maxmimum number of grid columns this node can resize to.
     */
    readonly gridWidth: number;
    calcOffsetLeft(): number;
    calcColumnLeft: () => number;
    wrapper: HTMLElement | null;
    readonly snapPoints: number[];
    readonly insideInlineLike: boolean;
    render(): JSX.Element;
}
