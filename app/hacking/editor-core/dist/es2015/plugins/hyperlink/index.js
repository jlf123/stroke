import * as React from 'react';
import { link } from '@atlaskit/adf-schema';
import { WithProviders } from '@atlaskit/editor-common';
import WithPluginState from '../../ui/WithPluginState';
import { createInputRulePlugin } from './pm-plugins/input-rule';
import { createKeymapPlugin } from './pm-plugins/keymap';
import { plugin, stateKey, LinkAction, } from './pm-plugins/main';
import fakeCursorToolbarPlugin from './pm-plugins/fake-cursor-for-toolbar';
import syncTextAndUrlPlugin from './pm-plugins/sync-text-and-url';
import HyperlinkToolbar from './ui';
import EditorSuccessIcon from '@atlaskit/icon/glyph/editor/success';
var hyperlinkPlugin = {
    marks: function () {
        return [{ name: 'link', mark: link }];
    },
    pmPlugins: function () {
        return [
            {
                name: 'syncUrlText',
                plugin: function (_a) {
                    var appearance = _a.props.appearance;
                    return appearance === 'message' ? syncTextAndUrlPlugin : undefined;
                },
            },
            { name: 'hyperlink', plugin: function (_a) {
                    var dispatch = _a.dispatch;
                    return plugin(dispatch);
                } },
            {
                name: 'fakeCursorToolbarPlugin',
                plugin: function () { return fakeCursorToolbarPlugin; },
            },
            {
                name: 'hyperlinkInputRule',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return createInputRulePlugin(schema);
                },
            },
            {
                name: 'hyperlinkKeymap',
                plugin: function (_a) {
                    var schema = _a.schema, props = _a.props;
                    return createKeymapPlugin(schema, props);
                },
            },
        ];
    },
    pluginsOptions: {
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: 'Hyperlink',
                    keywords: ['url', 'link', 'hyperlink'],
                    priority: 1200,
                    icon: function () { return React.createElement(EditorSuccessIcon, { label: 'Hyperlink' }); },
                    action: function (insert, state) {
                        var pos = state.selection.from;
                        var nodeBefore = state.selection.$from.nodeBefore;
                        if (!nodeBefore) {
                            return false;
                        }
                        return state.tr
                            .setMeta(stateKey, LinkAction.SHOW_INSERT_TOOLBAR)
                            .delete(pos - nodeBefore.nodeSize, pos);
                    },
                },
            ];
        },
    },
    contentComponent: function (_a) {
        var appearance = _a.appearance, editorView = _a.editorView, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, providerFactory = _a.providerFactory;
        if (appearance === 'message') {
            return null;
        }
        var renderToolbar = function (providers) { return (React.createElement(WithPluginState, { plugins: { hyperlinkState: stateKey }, render: function (_a) {
                var hyperlinkState = _a.hyperlinkState;
                return (React.createElement(HyperlinkToolbar, { hyperlinkState: hyperlinkState, view: editorView, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, activityProvider: providers ? providers.activityProvider : undefined }));
            } })); };
        return (React.createElement(WithProviders, { providerFactory: providerFactory, providers: ['activityProvider'], renderNode: renderToolbar }));
    },
};
export default hyperlinkPlugin;
//# sourceMappingURL=index.js.map