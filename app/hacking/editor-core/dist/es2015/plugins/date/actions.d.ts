import { EditorState, Transaction } from 'prosemirror-state';
import { DateType } from './index';
export declare const insertDate: (date?: DateType | undefined) => (state: EditorState<any>, dispatch: (tr: Transaction<any>) => void) => boolean;
export declare const setDatePickerAt: (showDatePickerAt: number | null) => (state: EditorState<any>, dispatch: (tr: Transaction<any>) => void) => boolean;
export declare const closeDatePicker: () => (state: any, dispatch: any) => false | undefined;
export declare const openDatePicker: (domAtPos: (pos: number) => {
    node: Node;
    offset: number;
}) => (state: EditorState<any>, dispatch: (tr: Transaction<any>) => void) => boolean;
