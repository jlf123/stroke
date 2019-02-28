import ColumnState from './columnState';
export interface ColIdxPair {
    col: ColumnState[];
    idx: number;
}
export declare const makeColIdxPair: (cols: ColumnState[]) => {
    col: ColumnState;
    idx: number;
}[];
export declare const findFreeCol: (colIdxObj: any, direction: any) => number | null;
export declare const findNextFreeCol: (colIdxObj: any, direction: number) => number;
export declare const getRowChildren: (row: HTMLElement) => HTMLElement[];
export declare const calculateColWidth: (table: HTMLElement, colIdx: number, calculateColWidthCb?: (col: HTMLElement, colComputedStyle: CSSStyleDeclaration) => number) => number;
export declare const unitToNumber: (unit: string | null) => number;
export declare const addContainerLeftRightPadding: (amount: number, computedStyle: CSSStyleDeclaration) => number;
