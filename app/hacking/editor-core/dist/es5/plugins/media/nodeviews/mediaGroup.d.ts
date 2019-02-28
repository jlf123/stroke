import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { EditorAppearance } from '../../../types';
export interface Props {
    children?: React.ReactNode;
    view: EditorView;
    node: PMNode;
}
export declare type MediaGroupProps = {
    forwardRef?: (ref: HTMLElement) => void;
    node: PMNode;
    view: EditorView;
    getPos: () => number;
    selected: number | null;
    disabled?: boolean;
    editorAppearance: EditorAppearance;
};
export default class MediaGroup extends React.Component<MediaGroupProps> {
    private mediaPluginState;
    private mediaNodes;
    state: {
        selected: null;
    };
    constructor(props: any);
    componentWillReceiveProps(props: any): void;
    shouldComponentUpdate(nextProps: any): boolean;
    setMediaItems: (props: any) => void;
    renderChildNodes: (node: any) => JSX.Element;
    render(): JSX.Element;
}
export declare const ReactMediaGroupNode: (portalProviderAPI: PortalProviderAPI, editorAppearance: EditorAppearance) => (node: PMNode<any>, view: EditorView<any>, getPos: () => number) => NodeView<any>;
