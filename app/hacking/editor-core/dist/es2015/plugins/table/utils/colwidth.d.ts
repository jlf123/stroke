export declare type ColumnInfo = {
    width: number;
    span: number;
};
declare class ColumnWidths {
    private columns;
    constructor();
    /**
     * Returns an array with individual column widths, with each column spread evenly across
     * the columns it spans.
     */
    readonly dividedWidths: number[];
    readonly columnInfo: ColumnInfo[];
    /**
     * Returns an array representing the widths of each (possibly spanned) column within a range.
     * @param colIdx 0-based index for the start column.
     * @param span The number of columns the cell spans.
     * @param autosizeEnd Whether to return 0 for the very last column of the table.
     */
    width(colIdx: number, span?: number, autosizeEnd?: boolean): number[];
    visit(colIdx: number, width: number, span?: number): void;
}
declare function parseDOMColumnWidths(node: HTMLElement): ColumnWidths;
export { ColumnWidths, parseDOMColumnWidths };
