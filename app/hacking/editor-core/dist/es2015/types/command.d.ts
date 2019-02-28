import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
export declare type Command = (state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView) => boolean;
