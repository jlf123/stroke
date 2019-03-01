import * as React from 'react';
import { EventDispatcher } from '../../event-dispatcher';
export declare type PortalProviderProps = {
    render: (portalProviderAPI: PortalProviderAPI) => React.ReactChild | null;
};
export declare type PortalRendererState = {
    portals: Map<HTMLElement, React.ReactChild>;
};
declare type MountedPortal = {
    children: () => React.ReactChild | null;
    hasReactContext: boolean;
};
export declare class PortalProviderAPI extends EventDispatcher {
    portals: Map<HTMLElement, MountedPortal>;
    context: any;
    setContext: (context: any) => void;
    render(children: () => React.ReactChild | null, container: HTMLElement, hasReactContext?: boolean): void;
    forceUpdate(): void;
    remove(container: HTMLElement): void;
}
export declare class PortalProvider extends React.Component<PortalProviderProps> {
    portalProviderAPI: PortalProviderAPI;
    constructor(props: any);
    render(): string | number | React.ReactElement<any> | null;
    componentDidUpdate(): void;
}
export declare class PortalRenderer extends React.Component<{
    portalProviderAPI: PortalProviderAPI;
}, PortalRendererState> {
    constructor(props: any);
    handleUpdate: (portals: any) => void;
    render(): JSX.Element;
}
export {};
