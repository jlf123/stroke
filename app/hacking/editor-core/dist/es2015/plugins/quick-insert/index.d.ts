import { PluginKey } from 'prosemirror-state';
import { EditorPlugin, Command } from '../../types';
declare const quickInsertPlugin: EditorPlugin;
export default quickInsertPlugin;
/**
 *
 * ProseMirror Plugin
 *
 */
export declare const pluginKey: PluginKey<any>;
export declare const setProvider: (provider: any) => Command;
