/// <reference types="react" />
import { Node as PmNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
export interface Props {
    node: PmNode;
    view: EditorView;
    allowColumnResizing?: boolean;
    cellMinWidth?: number;
    portalProviderAPI: PortalProviderAPI;
    getPos: () => number;
}
export default class TableView extends ReactNodeView {
    private table;
    constructor(props: Props);
    getContentDOM(): {
        dom: Node;
        contentDOM?: Node | null | undefined;
    };
    setDomAttrs(node: any): void;
    render(props: any, forwardRef: any): JSX.Element;
    componentDidMount: () => void;
    ignoreMutation(record: MutationRecord): boolean;
}
export declare const createTableView: (portalProviderAPI: PortalProviderAPI) => (node: any, view: any, getPos: any) => NodeView<any>;
