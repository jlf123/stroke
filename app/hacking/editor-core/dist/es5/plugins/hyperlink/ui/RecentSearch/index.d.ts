import { PureComponent } from 'react';
import { ActivityProvider, ActivityItem } from '@atlaskit/activity';
export interface Props {
    onBlur?: (text: string) => void;
    onSubmit?: (href: string, text?: string) => void;
    target: Node;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    autoFocus?: boolean;
    placeholder: string;
    activityProvider: Promise<ActivityProvider>;
}
export interface State {
    activityProvider?: ActivityProvider;
    items: Array<ActivityItem>;
    selectedIndex: number;
    text: string;
    isLoading: boolean;
}
export default class RecentSearch extends PureComponent<Props, State> {
    state: State;
    resolveProvider(): Promise<ActivityProvider>;
    componentDidMount(): Promise<void>;
    private loadRecentItems;
    private updateInput;
    render(): JSX.Element;
    private handleSelected;
    private handleMouseMove;
    private handleSubmit;
    private handleKeyDown;
    private handleBlur;
    private trackAutoCompleteAnalyticsEvent;
}
