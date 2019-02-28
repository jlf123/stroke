import { NodeType } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
export declare const insertBlock: (state: EditorState<any>, nodeType: NodeType<any>, nodeName: string, start: any, end: any, attrs?: {
    [key: string]: any;
} | undefined) => Transaction<any> | null;
