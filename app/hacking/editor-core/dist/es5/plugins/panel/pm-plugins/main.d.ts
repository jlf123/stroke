import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
export declare type PanelState = {
    element?: HTMLElement;
    activePanelType?: string | undefined;
    toolbarVisible?: boolean | undefined;
};
export declare const availablePanelType: string[];
export declare const getPluginState: (state: EditorState<any>) => PanelState;
export declare const setPluginState: (stateProps: Object) => (state: EditorState<any>, dispatch: (tr: any) => void) => boolean;
export declare type PanelStateSubscriber = (state: PanelState) => any;
export declare const pluginKey: PluginKey<any>;
export declare const createPlugin: ({ portalProviderAPI, dispatch, providerFactory, }: {
    portalProviderAPI: any;
    dispatch: any;
    providerFactory: any;
}) => Plugin<any>;
