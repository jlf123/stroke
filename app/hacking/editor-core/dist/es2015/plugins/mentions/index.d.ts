import { PluginKey } from 'prosemirror-state';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
import { MentionProvider, MentionDescription } from '@atlaskit/mention';
import { ContextIdentifierProvider } from '@atlaskit/editor-common';
import { EditorPlugin, Command } from '../../types';
declare const mentionsPlugin: (createAnalyticsEvent?: CreateUIAnalyticsEventSignature | undefined) => EditorPlugin;
export default mentionsPlugin;
/**
 * Actions
 */
export declare const ACTIONS: {
    SET_PROVIDER: string;
    SET_RESULTS: string;
    SET_CONTEXT: string;
};
export declare const setProvider: (provider: any) => Command;
export declare const setResults: (results: any) => Command;
export declare const setContext: (context: any) => Command;
/**
 *
 * ProseMirror Plugin
 *
 */
export declare const mentionPluginKey: PluginKey<any>;
export declare function getMentionPluginState(state: any): MentionPluginState;
export declare type MentionPluginState = {
    provider?: MentionProvider;
    contextIdentifier?: ContextIdentifierProvider;
    mentions?: Array<MentionDescription>;
};
