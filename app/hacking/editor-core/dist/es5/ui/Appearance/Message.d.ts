import * as React from 'react';
import { EditorAppearanceComponentProps } from '../../types';
export interface MessageEditorProps {
    isMaxContentSizeReached?: boolean;
    maxHeight?: number;
}
export default class Editor extends React.Component<EditorAppearanceComponentProps, any> {
    static displayName: string;
    private appearance;
    private containerElement;
    private focusEditor;
    private renderChrome;
    render(): JSX.Element;
}
