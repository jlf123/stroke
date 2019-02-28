import { TableLayout } from '@atlaskit/adf-schema';
/**
 * Translates named layouts in number values.
 * @param tableLayout
 * @param containerWidth
 */
export declare function getLayoutSize(tableLayout: TableLayout, containerWidth?: number): number;
/**
 * Does the current position point at a cell.
 * @param $pos
 */
export declare function pointsAtCell($pos: any): any;
/**
 * Returns the pos of the cell on the side requested.
 * @param view
 * @param event
 * @param side
 */
export declare function edgeCell(view: any, event: any, side: any): number;
/**
 * Get the current col width, handles colspan.
 * @param view
 * @param cellPos
 * @param param2
 */
export declare function currentColWidth(view: any, cellPos: any, { colspan, colwidth }: {
    colspan: any;
    colwidth: any;
}): any;
/**
 * Attempts to find a parent TD/TH depending on target element.
 * @param target
 */
export declare function domCellAround(target: any): any;
