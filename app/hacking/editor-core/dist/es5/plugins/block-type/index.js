"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var quote_1 = require("@atlaskit/icon/glyph/editor/quote");
var adf_schema_1 = require("@atlaskit/adf-schema");
var Toolbar_1 = require("../../ui/Toolbar");
var main_1 = require("./pm-plugins/main");
var keymap_1 = require("./pm-plugins/keymap");
var input_rule_1 = require("./pm-plugins/input-rule");
var ToolbarBlockType_1 = require("./ui/ToolbarBlockType");
var WithPluginState_1 = require("../../ui/WithPluginState");
var commands_1 = require("./commands");
var types_1 = require("./types");
var blockType = {
    nodes: function (_a) {
        var allowBlockType = _a.allowBlockType;
        var nodes = [
            { name: 'heading', node: adf_schema_1.heading },
            { name: 'blockquote', node: adf_schema_1.blockquote },
            { name: 'hardBreak', node: adf_schema_1.hardBreak },
        ];
        if (allowBlockType) {
            var exclude_1 = allowBlockType.exclude ? allowBlockType.exclude : [];
            return nodes.filter(function (node) { return exclude_1.indexOf(node.name) === -1; });
        }
        return nodes;
    },
    pmPlugins: function () {
        return [
            {
                name: 'blockType',
                plugin: function (_a) {
                    var props = _a.props, dispatch = _a.dispatch;
                    return main_1.createPlugin(dispatch, props.appearance);
                },
            },
            {
                name: 'blockTypeInputRule',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return input_rule_1.default(schema);
                },
            },
            // Needs to be lower priority than prosemirror-tables.tableEditing
            // plugin as it is currently swallowing right/down arrow events inside tables
            {
                name: 'blockTypeKeyMap',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return keymap_1.default(schema);
                },
            },
        ];
    },
    primaryToolbarComponent: function (_a) {
        var editorView = _a.editorView, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, toolbarSize = _a.toolbarSize, disabled = _a.disabled, isToolbarReducedSpacing = _a.isToolbarReducedSpacing, eventDispatcher = _a.eventDispatcher;
        var isSmall = toolbarSize < Toolbar_1.ToolbarSize.XL;
        var boundSetBlockType = function (name) {
            return commands_1.setBlockType(name)(editorView.state, editorView.dispatch);
        };
        return (React.createElement(WithPluginState_1.default, { editorView: editorView, eventDispatcher: eventDispatcher, plugins: {
                pluginState: main_1.pluginKey,
            }, render: function (_a) {
                var pluginState = _a.pluginState;
                return (React.createElement(ToolbarBlockType_1.default, { isSmall: isSmall, isDisabled: disabled, isReducedSpacing: isToolbarReducedSpacing, setBlockType: boundSetBlockType, pluginState: pluginState, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement }));
            } }));
    },
    pluginsOptions: {
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(types_1.messages.blockquote),
                    priority: 1300,
                    icon: function () { return (React.createElement(quote_1.default, { label: formatMessage(types_1.messages.blockquote) })); },
                    action: function (insert, state) {
                        return insert(state.schema.nodes.blockquote.createChecked({}, state.schema.nodes.paragraph.createChecked()));
                    },
                },
            ];
        },
    },
};
exports.default = blockType;
var main_2 = require("./pm-plugins/main");
exports.pluginKey = main_2.pluginKey;
//# sourceMappingURL=index.js.map