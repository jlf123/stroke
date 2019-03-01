import { Node as PmNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { EditorAppearance } from '../../../types';
export interface CellViewProps {
    node: PmNode;
    view: EditorView;
    portalProviderAPI: PortalProviderAPI;
    getPos: () => number;
    appearance?: EditorAppearance;
}
export declare type CellProps = {
    view: EditorView;
    forwardRef: (ref: HTMLElement | null) => void;
    withCursor: boolean;
    isContextualMenuOpen: boolean;
    disabled: boolean;
    appearance?: EditorAppearance;
};
export declare const createCellView: (portalProviderAPI: PortalProviderAPI, appearance?: "message" | "inline-comment" | "comment" | "full-page" | "chromeless" | "mobile" | undefined) => (node: any, view: any, getPos: any) => NodeView<any>;
