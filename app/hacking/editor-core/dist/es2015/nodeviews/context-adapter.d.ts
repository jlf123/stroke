import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare const createContextAdapter: (createContextAdapter: any) => {
    new (props: Readonly<{}>): {
        contextState: {};
        getChildContext(): {
            contextAdapter: {};
        };
        zipProvidersWithValues(): {};
        render(): JSX.Element;
        setState<K extends "hasRendered">(state: {
            hasRendered: {};
        } | ((prevState: Readonly<{
            hasRendered: {};
        }>, props: Readonly<{}>) => {
            hasRendered: {};
        } | Pick<{
            hasRendered: {};
        }, K> | null) | Pick<{
            hasRendered: {};
        }, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<{}>;
        state: Readonly<{
            hasRendered: {};
        }>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: {}, context?: any): {
        contextState: {};
        getChildContext(): {
            contextAdapter: {};
        };
        zipProvidersWithValues(): {};
        render(): JSX.Element;
        setState<K extends "hasRendered">(state: {
            hasRendered: {};
        } | ((prevState: Readonly<{
            hasRendered: {};
        }>, props: Readonly<{}>) => {
            hasRendered: {};
        } | Pick<{
            hasRendered: {};
        }, K> | null) | Pick<{
            hasRendered: {};
        }, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<{}>;
        state: Readonly<{
            hasRendered: {};
        }>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    childContextTypes: {
        contextAdapter: PropTypes.Requireable<any>;
    };
};
