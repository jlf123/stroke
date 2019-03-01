import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
import { Dispatch } from '../../event-dispatcher';
export declare const pluginKey: PluginKey<any>;
export declare function createPlugin(dispatch: Dispatch, maxContentSize?: number, onMaxContentSize?: (isMaxContentSizeReached: boolean) => void): Plugin | undefined;
declare const maxContentSizePlugin: EditorPlugin;
export default maxContentSizePlugin;
