import { Plugin, PluginKey } from 'prosemirror-state';
import { Node } from 'prosemirror-model';
import { EditorPlugin } from '../../types';
import { Dispatch } from '../../event-dispatcher';
export declare const pluginKey: PluginKey<any>;
export declare const isMultiline: (doc: Node<any>) => boolean;
export declare function createPlugin(dispatch: Dispatch): Plugin | undefined;
declare const isMultilineContentPlugin: EditorPlugin;
export default isMultilineContentPlugin;
