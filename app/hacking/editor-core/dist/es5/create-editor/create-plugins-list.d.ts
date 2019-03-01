import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
import { EditorPlugin, EditorProps } from '../types';
/**
 * Returns list of plugins that are absolutely necessary for editor to work
 */
export declare function getDefaultPluginsList(props: EditorProps): EditorPlugin[];
/**
 * Maps EditorProps to EditorPlugins
 */
export default function createPluginsList(props: EditorProps, createAnalyticsEvent?: CreateUIAnalyticsEventSignature): EditorPlugin[];