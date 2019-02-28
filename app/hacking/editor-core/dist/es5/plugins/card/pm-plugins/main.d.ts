import { Plugin, PluginKey, EditorState } from 'prosemirror-state';
import { CardPluginState, Request } from '../types';
import { EditorView } from 'prosemirror-view';
export declare const pluginKey: PluginKey<any>;
export declare const getPluginState: (editorState: EditorState<any>) => CardPluginState | undefined;
export declare const resolveWithProvider: (view: EditorView<any>, outstandingRequests: any, provider: any, request: Request) => void;
export declare const createPlugin: ({ portalProviderAPI, dispatch, providerFactory, }: {
    portalProviderAPI: any;
    dispatch: any;
    providerFactory: any;
}) => Plugin<any>;
