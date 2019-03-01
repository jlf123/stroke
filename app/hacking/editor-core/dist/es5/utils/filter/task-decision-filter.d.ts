import { Schema, Slice } from 'prosemirror-model';
import { JSONDocNode, JSONNode } from '../';
export declare const taskDecisionDocFilter: (doc: JSONDocNode, schema?: Schema<any, any> | undefined) => JSONNode[];
export declare const taskDecisionSliceFilter: (slice: Slice<any>, schema: Schema<any, any>) => Slice<any>;
