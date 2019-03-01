import * as React from 'react';
import Editor from '../../editor';
export interface Props {
    placeholder?: string;
    children?: any;
    isExpanded?: boolean;
    onFocus?: (e: any) => void;
    onExpand?: () => void;
}
export interface State {
}
export default class CollapsedEditor extends React.Component<Props, State> {
    editorComponent?: Editor;
    shouldTriggerExpandEvent?: boolean;
    componentWillReceiveProps(nextProps: any, nextState: any): void;
    componentDidUpdate(): void;
    handleEditorRef: (editorRef?: Editor | undefined, editorRefCallback?: any) => void;
    render(): React.ReactElement<any>;
}
