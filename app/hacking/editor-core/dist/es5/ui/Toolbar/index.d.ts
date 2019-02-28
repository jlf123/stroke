import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import { EditorAppearance, ToolbarUIComponentFactory } from '../../types';
import { EventDispatcher } from '../../event-dispatcher';
import EditorActions from '../../actions';
export declare enum ToolbarSize {
    XXL = 6,
    XL = 5,
    L = 4,
    M = 3,
    S = 2,
    XXXS = 1
}
export interface ToolbarProps {
    items?: Array<ToolbarUIComponentFactory>;
    editorView: EditorView;
    editorActions?: EditorActions;
    eventDispatcher: EventDispatcher;
    providerFactory: ProviderFactory;
    appearance: EditorAppearance;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
    disabled: boolean;
    width?: number;
}
export interface ToolbarInnerProps extends ToolbarProps {
    toolbarSize: ToolbarSize;
    isToolbarReducedSpacing: boolean;
}
export declare class ToolbarInner extends React.Component<ToolbarInnerProps> {
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    render(): JSX.Element | null;
}
export declare function Toolbar(props: ToolbarProps): JSX.Element;
export default function ToolbarWithSizeDetector(props: ToolbarProps): JSX.Element;
