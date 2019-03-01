import { Component } from 'react';
import { FloatingToolbarItem } from '../types';
export interface Props {
    items: Array<FloatingToolbarItem<Function>>;
    dispatchCommand: (command?: Function) => void;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
}
export default class Toolbar extends Component<Props> {
    render(): JSX.Element | null;
    shouldComponentUpdate(nextProps: Props): boolean;
}
