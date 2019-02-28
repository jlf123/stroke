import * as React from 'react';
import { Node as PmNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ResizeState } from '../pm-plugins/table-resizing';
import { TablePluginState } from '../types';
import { Props } from './table';
import { WidthPluginState } from '../../width';
export interface ComponentProps extends Props {
    view: EditorView;
    node: PmNode;
    allowColumnResizing: boolean;
    onComponentMount: () => void;
    contentDOM: (element: HTMLElement | undefined) => void;
    containerWidth: WidthPluginState;
    pluginState: TablePluginState;
    tableResizingPluginState?: ResizeState;
    width: number;
}
declare class TableComponent extends React.Component<ComponentProps> {
    state: {
        scroll: number;
        tableContainerWidth: string;
    };
    private wrapper;
    private table;
    private rightShadow;
    private columnControls;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: any): void;
    render(): JSX.Element;
    private handleScroll;
    private handleScrollDebounced;
    private handleTableResizing;
}
export declare const updateRightShadow: (wrapper: HTMLElement | null, table: HTMLElement | null, rightShadow: HTMLElement | null) => void;
export default TableComponent;
