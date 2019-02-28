import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { TextColorPluginState } from '../../pm-plugins/main';
export declare const messages: {
    textColor: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export interface State {
    isOpen: boolean;
}
export interface Props {
    pluginState: TextColorPluginState;
    changeColor: (color: string) => void;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
    isReducedSpacing?: boolean;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
