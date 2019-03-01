import { Component } from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { CardEvent } from '@atlaskit/media-card';
import { EventDispatcher } from '../../../event-dispatcher';
import { MediaStateStatus } from '../types';
import { EditorAppearance } from '../../../types';
export interface MediaSingleNodeProps {
    node: PMNode;
    eventDispatcher: EventDispatcher;
    view: EditorView;
    width: number;
    selected: Function;
    getPos: () => number;
    lineLength: number;
    editorAppearance: EditorAppearance;
}
export interface MediaSingleNodeState {
    width?: number;
    height?: number;
    lastMediaStatus?: MediaStateStatus;
}
export default class MediaSingleNode extends Component<MediaSingleNodeProps, MediaSingleNodeState> {
    private mediaPluginState;
    state: {
        height: undefined;
        width: undefined;
        lastMediaStatus: undefined;
    };
    constructor(props: any);
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    componentDidUpdate(): void;
    private onExternalImageLoaded;
    private getMediaNodeStatus;
    private hasMediaStateUpdated;
    private mediaChildHasUpdated;
    selectMediaSingle: ({ event }: CardEvent) => void;
    updateSize: (width: number | null, layout: import("../../../../../editor-common/node_modules/@atlaskit/adf-schema/src/schema/nodes/media-single").Layout) => void;
    render(): JSX.Element;
}
export declare const ReactMediaSingleNode: (portalProviderAPI: any, eventDispatcher: any, editorAppearance: any) => (node: PMNode<any>, view: EditorView<any>, getPos: () => number) => NodeView<any>;
