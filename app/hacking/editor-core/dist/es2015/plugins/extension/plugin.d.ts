import { Plugin, PluginKey } from 'prosemirror-state';
import { Node as PMNode } from 'prosemirror-model';
import { ExtensionLayout } from '@atlaskit/adf-schema';
import { ProviderFactory, ExtensionHandlers } from '@atlaskit/editor-common';
import { Dispatch } from '../../event-dispatcher';
import { PortalProviderAPI } from '../../ui/PortalProvider';
export declare const pluginKey: PluginKey<any>;
export declare type ExtensionState = {
    element: HTMLElement | undefined;
    layout: ExtensionLayout;
    node: PMNode;
    allowBreakout: boolean;
    stickToolbarToBottom: boolean;
};
declare const _default: (dispatch: Dispatch<any>, providerFactory: ProviderFactory, extensionHandlers: ExtensionHandlers, portalProviderAPI: PortalProviderAPI, allowExtension: any) => Plugin<any>;
export default _default;
