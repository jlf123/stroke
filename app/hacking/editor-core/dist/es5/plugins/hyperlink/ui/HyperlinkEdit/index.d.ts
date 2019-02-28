import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
export declare const messages: {
    openLink: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    unlink: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export interface Props {
    onBlur?: (text: string) => void;
    onSubmit?: (text: string) => void;
    onUnlink?: () => void;
    onOpenLink?: () => void;
    target: Node;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    autoFocus?: boolean;
    defaultValue?: string;
    alwaysOpenLinkAt?: string;
    placeholder: string;
}
export interface State {
    text: string;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
