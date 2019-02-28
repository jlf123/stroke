import { EditorView } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { TableLayout } from '@atlaskit/adf-schema';
import ResizeState from './resizer/resizeState';
export declare function updateColumnWidth(view: any, cell: any, movedWidth: any, resizer: any): void;
export declare function applyColumnWidths(view: any, state: any, table: any, start: any): any;
export declare function handleBreakoutContent(view: EditorView, elem: HTMLElement, start: number, minWidth: number, node: PMNode): void;
export declare function resizeColumn(view: any, cell: any, width: any, resizer: any): any;
/**
 * Updates the column controls on resize
 */
export declare const updateControls: (state: EditorState<any>) => void;
/**
 * Scale the table to meet new requirements (col, layout change etc)
 * @param view
 * @param tableElem
 * @param node
 * @param pos
 * @param containerWidth
 * @param currentLayout
 */
export declare function scaleTable(view: EditorView, tableElem: HTMLTableElement | null, node: PMNode, pos: number, containerWidth: number | undefined, currentLayout: TableLayout): void;
/**
 * Hydate a table with column widths.
 * @param tableElem
 * @param node
 * @param containerWidth
 * @param currentLayout
 */
export declare function setColumnWidths(tableElem: HTMLTableElement | null, node: PMNode, containerWidth: number | undefined, currentLayout: TableLayout): ResizeState | undefined;
/**
 * Light wrapper over Resizer.resize
 * Mainly used to re-set a columns width.
 * @param elem
 * @param colIdx
 * @param amount
 * @param node
 */
export declare function resizeColumnTo(elem: HTMLElement, colIdx: number, amount: number, node: PMNode): ResizeState;
