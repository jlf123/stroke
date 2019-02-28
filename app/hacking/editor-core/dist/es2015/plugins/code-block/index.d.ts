/// <reference types="react" />
export interface CodeBlockOptions {
    enableKeybindingsForIDE?: boolean;
}
declare const codeBlockPlugin: (options?: CodeBlockOptions) => {
    nodes(): {
        name: string;
        node: import("prosemirror-model").NodeSpec;
    }[];
    pmPlugins(): ({
        name: string;
        plugin: ({ portalProviderAPI, dispatch, providerFactory, }: {
            portalProviderAPI: any;
            dispatch: any;
            providerFactory: any;
        }) => import("prosemirror-state").Plugin<any>;
    } | {
        name: string;
        plugin: ({ schema }: {
            schema: any;
        }) => import("prosemirror-state").Plugin<any> | undefined;
    })[];
    pluginsOptions: {
        quickInsert: ({ formatMessage }: {
            formatMessage: any;
        }) => {
            title: any;
            priority: number;
            icon: () => JSX.Element;
            action(insert: any, state: any): any;
        }[];
        floatingToolbar: import("../floating-toolbar/types").FloatingToolbarHandler;
    };
};
export default codeBlockPlugin;
