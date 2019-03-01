import { Node as PMNode, Schema } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { MediaState } from '../types';
export interface MediaSingleState extends MediaState {
    dimensions: {
        width: number;
        height: number;
    };
    scaleFactor?: number;
}
export declare const insertMediaAsMediaSingle: (view: EditorView<any>, node: PMNode<any>) => boolean;
export declare const insertMediaSingleNode: (view: EditorView<any>, mediaState: MediaState, collection?: string | undefined) => boolean;
export declare const createMediaSingleNode: (schema: Schema<any, any>, collection: string) => (mediaState: MediaSingleState) => PMNode<Schema<any, any>>;
