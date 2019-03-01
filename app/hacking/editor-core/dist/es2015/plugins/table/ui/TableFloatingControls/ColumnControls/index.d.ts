import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
import { Selection } from 'prosemirror-state';
export interface Props {
    editorView: EditorView;
    hoveredColumns?: number[];
    isInDanger?: boolean;
    insertColumnButtonIndex?: number;
    numberOfColumns?: number;
    selection?: Selection;
    tableRef?: HTMLTableElement;
}
export default class ColumnControls extends Component<Props, any> {
    shouldComponentUpdate(nextProps: any): boolean;
    render(): JSX.Element | null;
    private deleteColumns;
    private selectColumn;
    private hoverColumns;
    private clearHoverSelection;
    private insertColumn;
}
