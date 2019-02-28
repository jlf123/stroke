import { Schema } from 'prosemirror-model';
import { Plugin, EditorState } from 'prosemirror-state';
export declare const createHorizontalRule: (state: EditorState<any>, start: any, end: any) => import("prosemirror-state").Transaction<any> | null;
export declare function inputRulePlugin(schema: Schema): Plugin | undefined;
export default inputRulePlugin;
