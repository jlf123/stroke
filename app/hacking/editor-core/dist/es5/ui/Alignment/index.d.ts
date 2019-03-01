import { PureComponent } from 'react';
export interface Props {
    selectedAlignment?: string;
    onClick: (value: string) => void;
    className?: string;
}
export default class Alignment extends PureComponent<Props, any> {
    render(): JSX.Element;
}
