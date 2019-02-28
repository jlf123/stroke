import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ActivityProvider } from '@atlaskit/activity';
import { HyperlinkState } from '../pm-plugins/main';
export declare const messages: {
    linkPlaceholder: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    linkTextPlaceholder: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    linkPlaceholderWithSearch: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export interface CommonProps {
    pos: number;
    node: Node;
    view: EditorView;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
}
export declare class AddDisplayTextToolbar extends React.PureComponent<CommonProps & InjectedIntlProps> {
    render(): JSX.Element;
}
export declare const AddDisplayTextToolbarWithIntl: React.ComponentClass<CommonProps, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<CommonProps & InjectedIntlProps>;
};
export declare class EditLinkHrefToolbar extends React.PureComponent<CommonProps & InjectedIntlProps> {
    render(): JSX.Element;
}
export declare const EditLinkHrefToolbarWithIntl: React.ComponentClass<CommonProps, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<CommonProps & InjectedIntlProps>;
};
export declare class InsertLinkToolbar extends React.PureComponent<{
    from: number;
    to: number;
    view: EditorView;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
} & InjectedIntlProps> {
    render(): JSX.Element;
}
export declare const InsertLinkToolbarWithIntl: React.ComponentClass<{
    from: number;
    to: number;
    view: EditorView<any>;
    popupsMountPoint?: HTMLElement | undefined;
    popupsBoundariesElement?: HTMLElement | undefined;
}, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<{
        from: number;
        to: number;
        view: EditorView<any>;
        popupsMountPoint?: HTMLElement | undefined;
        popupsBoundariesElement?: HTMLElement | undefined;
    } & InjectedIntlProps>;
};
export declare class ActivityPoweredInsertLinkToolbar extends React.PureComponent<{
    from: number;
    to: number;
    view: EditorView;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    activityProvider: Promise<ActivityProvider>;
} & InjectedIntlProps> {
    render(): JSX.Element;
}
export declare const ActivityPoweredInsertLinkToolbarWithIntl: React.ComponentClass<{
    from: number;
    to: number;
    view: EditorView<any>;
    popupsMountPoint?: HTMLElement | undefined;
    popupsBoundariesElement?: HTMLElement | undefined;
    activityProvider: Promise<ActivityProvider>;
}, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<{
        from: number;
        to: number;
        view: EditorView<any>;
        popupsMountPoint?: HTMLElement | undefined;
        popupsBoundariesElement?: HTMLElement | undefined;
        activityProvider: Promise<ActivityProvider>;
    } & InjectedIntlProps>;
};
export interface Props {
    hyperlinkState?: HyperlinkState;
    view: EditorView;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    activityProvider?: Promise<ActivityProvider>;
}
export default function HyperlinkToolbar(props: Props): JSX.Element | null;
