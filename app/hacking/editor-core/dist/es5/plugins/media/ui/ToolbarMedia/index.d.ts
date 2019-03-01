import { PureComponent } from 'react';
import { PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
export interface Props {
    editorView: EditorView;
    pluginKey: PluginKey;
    isDisabled?: boolean;
    isReducedSpacing?: boolean;
}
export interface State {
    disabled: boolean;
}
export default class ToolbarMedia extends PureComponent<Props, State> {
    state: State;
    private pluginState?;
    componentDidMount(): void;
    componentWillUpdate(nextProps: Props): void;
    componentWillUnmount(): void;
    render(): JSX.Element | null;
    private setPluginState;
    private handlePluginStateChange;
    private handleClickMediaButton;
}
