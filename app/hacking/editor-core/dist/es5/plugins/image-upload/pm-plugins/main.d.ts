import { Plugin, PluginKey } from 'prosemirror-state';
export declare const stateKey: PluginKey<any>;
export declare const createPlugin: ({ dispatch, providerFactory }: {
    dispatch: any;
    providerFactory: any;
}) => Plugin<any>;
