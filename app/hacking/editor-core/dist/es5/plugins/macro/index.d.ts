import { Plugin, PluginKey } from 'prosemirror-state';
import { MacroProvider } from './types';
import { ProviderFactory } from '@atlaskit/editor-common';
import { Dispatch } from '../../event-dispatcher';
export * from './types';
export * from './actions';
export declare const pluginKey: PluginKey<any>;
export declare type MacroState = {
    macroProvider: MacroProvider | null;
};
export declare const createPlugin: (dispatch: Dispatch<any>, providerFactory: ProviderFactory) => Plugin<any>;
declare const _default: {
    pmPlugins(): {
        name: string;
        plugin: ({ dispatch, providerFactory }: {
            dispatch: any;
            providerFactory: any;
        }) => Plugin<any>;
    }[];
};
export default _default;
