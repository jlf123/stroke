"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var adf_schema_1 = require("@atlaskit/adf-schema");
var Toolbar_1 = require("../../ui/Toolbar");
var ToolbarLists_1 = require("./ui/ToolbarLists");
var main_1 = require("./pm-plugins/main");
var input_rule_1 = require("./pm-plugins/input-rule");
var keymap_1 = require("./pm-plugins/keymap");
var WithPluginState_1 = require("../../ui/WithPluginState");
var bullet_list_1 = require("@atlaskit/icon/glyph/editor/bullet-list");
var number_list_1 = require("@atlaskit/icon/glyph/editor/number-list");
var ToolbarInsertBlock_1 = require("../insert-block/ui/ToolbarInsertBlock");
var listPlugin = {
    nodes: function () {
        return [
            { name: 'bulletList', node: adf_schema_1.bulletList },
            { name: 'orderedList', node: adf_schema_1.orderedList },
            { name: 'listItem', node: adf_schema_1.listItem },
        ];
    },
    pmPlugins: function () {
        return [
            { name: 'lists', plugin: function (_a) {
                    var dispatch = _a.dispatch;
                    return main_1.createPlugin(dispatch);
                } },
            {
                name: 'listsInputRule',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return input_rule_1.default(schema);
                },
            },
            { name: 'listsKeymap', plugin: function (_a) {
                    var schema = _a.schema;
                    return keymap_1.default(schema);
                } },
        ];
    },
    pluginsOptions: {
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(ToolbarInsertBlock_1.messages.bulletList),
                    keywords: ['ul', 'unordered list'],
                    priority: 1100,
                    icon: function () { return (React.createElement(bullet_list_1.default, { label: formatMessage(ToolbarInsertBlock_1.messages.bulletList) })); },
                    action: function (insert, state) {
                        return insert(state.schema.nodes.bulletList.createChecked({}, state.schema.nodes.listItem.createChecked({}, state.schema.nodes.paragraph.createChecked())));
                    },
                },
                {
                    title: formatMessage(ToolbarInsertBlock_1.messages.orderedList),
                    keywords: ['ol', 'ordered list', 'numbered list'],
                    priority: 1200,
                    icon: function () { return (React.createElement(number_list_1.default, { label: formatMessage(ToolbarInsertBlock_1.messages.orderedList) })); },
                    action: function (insert, state) {
                        return insert(state.schema.nodes.orderedList.createChecked({}, state.schema.nodes.listItem.createChecked({}, state.schema.nodes.paragraph.createChecked())));
                    },
                },
            ];
        },
    },
    primaryToolbarComponent: function (_a) {
        var editorView = _a.editorView, appearance = _a.appearance, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, toolbarSize = _a.toolbarSize, disabled = _a.disabled, isToolbarReducedSpacing = _a.isToolbarReducedSpacing;
        var isSmall = toolbarSize < Toolbar_1.ToolbarSize.L;
        var isSeparator = toolbarSize >= Toolbar_1.ToolbarSize.S;
        return (React.createElement(WithPluginState_1.default, { plugins: { listsState: main_1.pluginKey }, render: function (_a) {
                var listsState = _a.listsState;
                return (React.createElement(ToolbarLists_1.default, { isSmall: isSmall, isSeparator: isSeparator, isReducedSpacing: isToolbarReducedSpacing, disabled: disabled, editorView: editorView, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement, bulletListActive: listsState.bulletListActive, bulletListDisabled: listsState.bulletListDisabled, orderedListActive: listsState.orderedListActive, orderedListDisabled: listsState.orderedListDisabled }));
            } }));
    },
};
exports.default = listPlugin;
//# sourceMappingURL=index.js.map