import * as React from 'react';
import EditorActions from '../../../actions';
import { RenderOnClickHandler } from '../';
export interface Props {
    dropdownItems?: React.ReactElement<any> | React.ReactElement<any>[];
    isReducedSpacing?: boolean;
}
export interface State {
    isOpen: boolean;
    target?: HTMLElement;
    addonDropdownContent?: React.ReactElement<any> | null;
}
export default class AddonToolbar extends React.Component<Props, State> {
    state: State;
    togglePopup: () => void;
    handleDropdownClick: (editorActions: EditorActions, renderOnClick: RenderOnClickHandler) => void;
    render(): JSX.Element | null;
    private handleRef;
    private handlePopupClick;
}
