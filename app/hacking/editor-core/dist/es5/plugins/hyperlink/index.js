"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var adf_schema_1 = require("@atlaskit/adf-schema");
var editor_common_1 = require("@atlaskit/editor-common");
var WithPluginState_1 = require("../../ui/WithPluginState");
var input_rule_1 = require("./pm-plugins/input-rule");
var keymap_1 = require("./pm-plugins/keymap");
var main_1 = require("./pm-plugins/main");
var fake_cursor_for_toolbar_1 = require("./pm-plugins/fake-cursor-for-toolbar");
var sync_text_and_url_1 = require("./pm-plugins/sync-text-and-url");
var ui_1 = require("./ui");
var success_1 = require("@atlaskit/icon/glyph/editor/success");
var hyperlinkPlugin = {
    marks: function () {
        return [{ name: 'link', mark: adf_schema_1.link }];
    },
    pmPlugins: function () {
        return [
            {
                name: 'syncUrlText',
                plugin: function (_a) {
                    var appearance = _a.props.appearance;
                    return appearance === 'message' ? sync_text_and_url_1.default : undefined;
                },
            },
            { name: 'hyperlink', plugin: function (_a) {
                    var dispatch = _a.dispatch;
                    return main_1.plugin(dispatch);
                } },
            {
                name: 'fakeCursorToolbarPlugin',
                plugin: function () { return fake_cursor_for_toolbar_1.default; },
            },
            {
                name: 'hyperlinkInputRule',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return input_rule_1.createInputRulePlugin(schema);
                },
            },
            {
                name: 'hyperlinkKeymap',
                plugin: function (_a) {
                    var schema = _a.schema, props = _a.props;
                    return keymap_1.createKeymapPlugin(schema, props);
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
                    icon: function () { return React.createElement(success_1.default, { label: 'Hyperlink' }); },
                    action: function (insert, state) {
                        var pos = state.selection.from;
                        var nodeBefore = state.selection.$from.nodeBefore;
                        if (!nodeBefore) {
                            return false;
                        }
                        return state.tr
                            .setMeta(main_1.stateKey, main_1.LinkAction.SHOW_INSERT_TOOLBAR)
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
        var renderToolbar = function (providers) { return (React.createElement(WithPluginState_1.default, { plugins: { hyperlinkState: main_1.stateKey }, render: function (_a) {
                var hyperlinkState = _a.hyperlinkState;
                return (React.createElement(ui_1.default, { hyperlinkState: hyperlinkState, view: editorView, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, activityProvider: providers ? providers.activityProvider : undefined }));
            } })); };
        return (React.createElement(editor_common_1.WithProviders, { providerFactory: providerFactory, providers: ['activityProvider'], renderNode: renderToolbar }));
    },
};
exports.default = hyperlinkPlugin;
//# sourceMappingURL=index.js.map