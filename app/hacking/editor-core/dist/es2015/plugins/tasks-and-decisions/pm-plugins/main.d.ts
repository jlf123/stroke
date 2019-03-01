import { Plugin, PluginKey } from 'prosemirror-state';
import { ProviderFactory } from '@atlaskit/editor-common';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
export declare const stateKey: PluginKey<any>;
export declare function createPlugin(portalProviderAPI: PortalProviderAPI, providerFactory: ProviderFactory): Plugin<any>;
