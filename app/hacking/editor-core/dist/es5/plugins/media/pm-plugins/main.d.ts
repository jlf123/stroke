import { Node as PMNode, Schema, Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
import { Context } from '@atlaskit/media-core';
import { MediaType, MediaSingleLayout } from '@atlaskit/adf-schema';
import { Dispatch } from '../../../event-dispatcher';
import { ProsemirrorGetPosHandler } from '../../../nodeviews';
import { EditorAppearance } from '../../../types/editor-props';
import { MediaPluginOptions } from '../media-plugin-options';
import PickerFacade from '../picker-facade';
import { MediaState, MediaProvider, MediaStateStatus, MediaStateManager } from '../types';
import DefaultMediaStateManager from '../default-state-manager';
export { DefaultMediaStateManager };
export { MediaState, MediaProvider, MediaStateStatus, MediaStateManager };
export declare type PluginStateChangeSubscriber = (state: MediaPluginState) => any;
export interface MediaNodeWithPosHandler {
    node: PMNode;
    getPos: ProsemirrorGetPosHandler;
}
export declare class MediaPluginState {
    allowsMedia: boolean;
    allowsUploads: boolean;
    mediaContext: Context;
    stateManager: MediaStateManager;
    ignoreLinks: boolean;
    waitForMediaUpload: boolean;
    allUploadsFinished: boolean;
    showDropzone: boolean;
    element?: HTMLElement;
    layout: MediaSingleLayout;
    mediaNodes: MediaNodeWithPosHandler[];
    mediaGroupNodes: object;
    private pendingTask;
    options: MediaPluginOptions;
    private view;
    private pluginStateChangeSubscribers;
    private useDefaultStateManager;
    private destroyed;
    mediaProvider: MediaProvider;
    private errorReporter;
    pickers: PickerFacade[];
    binaryPicker?: PickerFacade;
    private popupPicker?;
    private clipboardPicker?;
    private dropzonePicker?;
    private customPicker?;
    editorAppearance: EditorAppearance;
    private removeOnCloseListener;
    private reactContext;
    constructor(state: EditorState, options: MediaPluginOptions, reactContext: () => {}, editorAppearance?: EditorAppearance);
    subscribe(cb: PluginStateChangeSubscriber): void;
    unsubscribe(cb: PluginStateChangeSubscriber): void;
    setMediaProvider: (mediaProvider?: Promise<MediaProvider> | undefined) => Promise<void>;
    getMediaOptions: () => MediaPluginOptions;
    updateElement(): void;
    updateUploadStateDebounce: number | null;
    updateUploadState(): void;
    updateLayout(layout: MediaSingleLayout): void;
    private isMediaSingle;
    private getDomElement;
    insertFiles: (mediaStates: MediaState[]) => void;
    splitMediaGroup: () => boolean;
    insertFileFromDataUrl: (url: string, fileName: string) => void;
    onPopupPickerClose: () => void;
    showMediaPicker: () => void;
    /**
     * Returns a promise that is resolved after all pending operations have been finished.
     * An optional timeout will cause the promise to reject if the operation takes too long
     *
     * NOTE: The promise will resolve even if some of the media have failed to process.
     */
    waitForPendingTasks: (timeout?: number | undefined, lastTask?: Promise<MediaState | null> | undefined) => any;
    setView(view: EditorView): void;
    /**
     * Called from React UI Component when user clicks on "Delete" icon
     * inside of it
     */
    handleMediaNodeRemoval: (node: PMNode<any>, getPos: ProsemirrorGetPosHandler) => void;
    /**
     * Called from React UI Component on componentDidMount
     */
    handleMediaNodeMount: (node: PMNode<any>, getPos: ProsemirrorGetPosHandler) => void;
    /**
     * Called from React UI Component on componentWillUnmount and componentWillReceiveProps
     * when React component's underlying node property is replaced with a new node
     */
    handleMediaNodeUnmount: (oldNode: PMNode<any>) => void;
    align: (layout: import("../../../../../editor-common/node_modules/@atlaskit/adf-schema/src/schema/nodes/media-single").Layout, gridSize?: number) => boolean;
    destroy(): void;
    findMediaNode: (id: string) => MediaNodeWithPosHandler | null;
    private destroyPickers;
    private initPickers;
    private trackNewMediaEvent;
    private updateMediaNodeAttrs;
    private collectionFromProvider;
    private handleMediaState;
    private notifyPluginStateSubscribers;
    removeNodeById: (state: MediaState) => void;
    removeSelectedMediaNode: () => boolean;
    selectedMediaNode(): Node | undefined;
    isLayoutSupported(): boolean;
    /**
     * Since we replace nodes with public id when node is finalized
     * stateManager contains no information for public ids
     */
    getMediaNodeStateStatus: (id: string) => MediaStateStatus;
    getMediaNodeState: (id: string) => MediaState | undefined;
    private handleDrag;
}
export declare const stateKey: PluginKey<any>;
export declare const getMediaPluginState: (state: EditorState<any>) => MediaPluginState;
export declare const createPlugin: (schema: Schema<any, any>, options: MediaPluginOptions, reactContext: () => {}, dispatch?: Dispatch<any> | undefined, editorAppearance?: "message" | "inline-comment" | "comment" | "full-page" | "chromeless" | "mobile" | undefined) => Plugin<any>;
export interface MediaData {
    id: string;
    type?: MediaType;
}
