import { ResolvedPos, Schema } from 'prosemirror-model';
import { EditorState, Selection, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
export declare type TaskDecisionListType = 'taskList' | 'decisionList';
export declare const insertTaskDecision: (view: EditorView<any>, listType: TaskDecisionListType) => boolean;
export declare const isSupportedSourceNode: (schema: Schema<any, any>, selection: Selection<any>) => boolean;
export declare const changeInDepth: (before: ResolvedPos<any>, after: ResolvedPos<any>) => number;
export declare const createListAtSelection: (tr: Transaction<any>, list: any, item: any, schema: Schema<any, any>, state: EditorState<any>) => boolean;
export declare const splitListAtSelection: (tr: Transaction<any>, schema: Schema<any, any>) => Transaction<any>;
