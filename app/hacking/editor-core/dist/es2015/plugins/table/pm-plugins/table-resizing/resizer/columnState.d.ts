export default class ColumnState {
    width: number;
    wrapWidth: number;
    minWidth: number;
    constructor(width: number, wrapWidth: number, minWidth?: number);
    readonly freeSpace: number;
    /**
     * Creates a new ResizeState based on the current
     * appearance of an element.
     * @param {HTMLElement} table Reference to the <table> node
     * @param {number} colIdx The column index
     * @param {number} minWidth Minimum width a column is permitted to be
     */
    static fromDOM(table: HTMLElement, colIdx: number, minWidth: number): ColumnState;
    clone(newWidth?: number): ColumnState;
}
