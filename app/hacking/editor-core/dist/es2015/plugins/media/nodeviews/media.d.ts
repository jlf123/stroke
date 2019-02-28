import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory, ImageLoaderProps } from '@atlaskit/editor-common';
import { ProsemirrorGetPosHandler, ReactNodeProps } from '../../../nodeviews';
import { Context, ImageResizeMode } from '@atlaskit/media-core';
import { MediaProvider } from '../pm-plugins/main';
import { CardDimensions, CardEventHandler, CardOnClickCallback } from '@atlaskit/media-card';
import { MediaType, MediaBaseAttributes } from '@atlaskit/adf-schema';
import { ImageStatus } from '@atlaskit/editor-common';
import { EditorAppearance } from '../../../types';
export declare const MEDIA_HEIGHT = 125;
export declare const FILE_WIDTH = 156;
export declare type Appearance = 'small' | 'image' | 'horizontal' | 'square';
export interface MediaNodeProps extends ReactNodeProps {
    getPos: ProsemirrorGetPosHandler;
    view: EditorView;
    node: PMNode;
    providerFactory?: ProviderFactory;
    cardDimensions: CardDimensions;
    isMediaSingle?: boolean;
    mediaProvider?: Promise<MediaProvider>;
    onClick?: CardOnClickCallback;
    onExternalImageLoaded?: (dimensions: {
        width: number;
        height: number;
    }) => void;
    editorAppearance: EditorAppearance;
}
export interface Props extends Partial<MediaBaseAttributes> {
    type: MediaType;
    mediaProvider?: Promise<MediaProvider>;
    cardDimensions?: CardDimensions;
    onClick?: CardOnClickCallback;
    onDelete?: CardEventHandler;
    resizeMode?: ImageResizeMode;
    appearance?: Appearance;
    selected?: boolean;
    url?: string;
    imageStatus?: ImageStatus;
    context: Context;
    disableOverlay?: boolean;
}
export interface MediaNodeState {
    viewContext?: Context;
}
declare const _default: React.ComponentClass<MediaNodeProps & ImageLoaderProps, any>;
export default _default;
