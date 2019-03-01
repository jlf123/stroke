import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { MediaSingleLayout } from '@atlaskit/adf-schema';
import { MediaPluginState } from '../../pm-plugins/main';
export declare const messages: {
    wrapLeft: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    wrapRight: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export interface Props {
    target?: HTMLElement;
    layout?: MediaSingleLayout;
    allowBreakout: boolean;
    allowLayout: boolean;
    pluginState: MediaPluginState;
    allowResizing?: boolean;
    editorDisabled?: boolean;
}
export declare type IconMap = {
    value: string;
    Icon?: React.ComponentClass<any>;
}[];
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
