import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { MediaState } from '../types';
export interface Range {
    start: number;
    end: number;
}
export declare const insertMediaGroupNode: (view: EditorView<any>, mediaStates: MediaState[], collection?: string | undefined) => void;
export declare const isNonImagesBanned: (node?: PMNode<any> | undefined) => boolean | undefined;
