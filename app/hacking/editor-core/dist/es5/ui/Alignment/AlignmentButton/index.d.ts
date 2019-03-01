import * as React from 'react';
import { PureComponent } from 'react';
export interface Props {
    value: string;
    label: string;
    isSelected?: boolean;
    onClick: (value: string) => void;
    content: React.ReactElement<any>;
}
declare class AlignmentButton extends PureComponent<Props> {
    render(): JSX.Element;
    onClick: (e: any) => void;
}
export default AlignmentButton;
