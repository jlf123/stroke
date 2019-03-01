import { Node as PmNode } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
declare type ExtensionNode = {
    node: PmNode;
    pos: number;
} | undefined;
export declare const getExtensionNode: (state: EditorState<any>) => ExtensionNode;
export {};
