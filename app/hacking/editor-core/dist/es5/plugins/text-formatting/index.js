"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var adf_schema_1 = require("@atlaskit/adf-schema");
var styles_1 = require("../../ui/styles");
var main_1 = require("./pm-plugins/main");
var clear_formatting_1 = require("./pm-plugins/clear-formatting");
var cursor_1 = require("./pm-plugins/cursor");
var input_rule_1 = require("./pm-plugins/input-rule");
var clear_formatting_keymap_1 = require("./pm-plugins/clear-formatting-keymap");
var smart_input_rule_1 = require("./pm-plugins/smart-input-rule");
var keymap_1 = require("./pm-plugins/keymap");
var ToolbarAdvancedTextFormatting_1 = require("./ui/ToolbarAdvancedTextFormatting");
var ToolbarTextFormatting_1 = require("./ui/ToolbarTextFormatting");
var WithPluginState_1 = require("../../ui/WithPluginState");
var textFormatting = function (options) { return ({
    marks: function () {
        return [
            { name: 'em', mark: adf_schema_1.em },
            { name: 'strong', mark: adf_schema_1.strong },
            { name: 'strike', mark: adf_schema_1.strike },
        ]
            .concat(options.disableCode ? [] : { name: 'code', mark: adf_schema_1.code })
            .concat(options.disableSuperscriptAndSubscript
            ? []
            : { name: 'subsup', mark: adf_schema_1.subsup })
            .concat(options.disableUnderline ? [] : { name: 'underline', mark: adf_schema_1.underline });
    },
    pmPlugins: function () {
        return [
            {
                name: 'textFormatting',
                plugin: function (_a) {
                    var dispatch = _a.dispatch;
                    return main_1.plugin(dispatch);
                },
            },
            {
                name: 'textFormattingCursor',
                plugin: function () { return cursor_1.default; },
            },
            {
                name: 'textFormattingInputRule',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return input_rule_1.default(schema);
                },
            },
            {
                name: 'textFormattingSmartRule',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return !options.disableSmartTextCompletion
                        ? smart_input_rule_1.default
                        : undefined;
                },
            },
            {
                name: 'textFormattingClear',
                plugin: function (_a) {
                    var dispatch = _a.dispatch;
                    return clear_formatting_1.plugin(dispatch);
                },
            },
            {
                name: 'textFormattingClearKeymap',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return clear_formatting_keymap_1.default(schema);
                },
            },
            {
                name: 'textFormattingKeymap',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return keymap_1.default(schema);
                },
            },
        ];
    },
    primaryToolbarComponent: function (_a) {
        var editorView = _a.editorView, popupsMountPoint = _a.popupsMountPoint, popupsScrollableElement = _a.popupsScrollableElement, isToolbarReducedSpacing = _a.isToolbarReducedSpacing, disabled = _a.disabled;
        return (React.createElement(WithPluginState_1.default, { plugins: {
                textFormattingState: main_1.pluginKey,
                clearFormattingState: clear_formatting_1.pluginKey,
            }, render: function (_a) {
                var textFormattingState = _a.textFormattingState, clearFormattingState = _a.clearFormattingState;
                return (React.createElement(styles_1.ButtonGroup, { width: isToolbarReducedSpacing ? 'small' : 'large' },
                    React.createElement(ToolbarTextFormatting_1.default, { disabled: disabled, editorView: editorView, textFormattingState: textFormattingState, isReducedSpacing: isToolbarReducedSpacing }),
                    React.createElement(ToolbarAdvancedTextFormatting_1.default, { editorView: editorView, isDisabled: disabled, isReducedSpacing: isToolbarReducedSpacing, textFormattingState: textFormattingState, clearFormattingState: clearFormattingState, popupsMountPoint: popupsMountPoint, popupsScrollableElement: popupsScrollableElement })));
            } }));
    },
}); };
exports.default = textFormatting;
//# sourceMappingURL=index.js.map