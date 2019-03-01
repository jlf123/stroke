import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
export interface Props {
    children?: React.ReactNode;
    view: EditorView;
    node: PMNode;
}
export declare type PanelComponentProps = {
    panelType: string;
    forwardRef: (ref: HTMLElement) => void;
};
export declare const panelNodeView: (portalProviderAPI: PortalProviderAPI) => (node: any, view: any, getPos: () => number) => NodeView<any>;
