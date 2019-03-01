import * as React from 'react';
import { Color } from '@atlaskit/status';
import { StatusType } from '../plugin';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
export declare enum InputMethod {
    blur = "blur",
    escKey = "escKey",
    enterKey = "enterKey"
}
export interface Props {
    target: HTMLElement | null;
    closeStatusPicker: () => void;
    onSelect: (status: StatusType) => void;
    onTextChanged: (status: StatusType) => void;
    onEnter: (status: StatusType) => void;
    autoFocus?: boolean;
    defaultText?: string;
    defaultColor?: Color;
    defaultLocalId?: string;
    createAnalyticsEvent?: CreateUIAnalyticsEventSignature;
}
export interface State {
    color: Color;
    text: string;
    localId?: string;
}
declare const _default: React.ComponentClass<Pick<Props, "onSelect" | "autoFocus" | "target" | "onEnter" | "onTextChanged" | "closeStatusPicker" | "defaultText" | "defaultColor" | "defaultLocalId">, any>;
export default _default;
