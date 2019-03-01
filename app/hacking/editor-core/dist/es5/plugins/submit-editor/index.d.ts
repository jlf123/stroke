import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { EditorPlugin } from '../../types';
export declare function createPlugin(onSave?: (editorView: EditorView) => void): Plugin | undefined;
declare const submitEditorPlugin: EditorPlugin;
export default submitEditorPlugin;
