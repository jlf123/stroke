"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var emoji_1 = require("@atlaskit/icon/glyph/editor/emoji");
var adf_schema_1 = require("@atlaskit/adf-schema");
var editor_common_1 = require("@atlaskit/editor-common");
var ToolbarInsertBlock_1 = require("../insert-block/ui/ToolbarInsertBlock");
var main_1 = require("./pm-plugins/main");
var input_rules_1 = require("./pm-plugins/input-rules");
var keymap_1 = require("./pm-plugins/keymap");
var ascii_input_rules_1 = require("./pm-plugins/ascii-input-rules");
var ToolbarEmojiPicker_1 = require("./ui/ToolbarEmojiPicker");
var EmojiTypeAhead_1 = require("./ui/EmojiTypeAhead");
var emojiPlugin = {
    nodes: function () {
        return [{ name: 'emoji', node: adf_schema_1.emoji }];
    },
    marks: function () {
        return [{ name: 'emojiQuery', mark: adf_schema_1.emojiQuery }];
    },
    pmPlugins: function () {
        return [
            {
                name: 'emoji',
                plugin: function (_a) {
                    var providerFactory = _a.providerFactory, portalProviderAPI = _a.portalProviderAPI;
                    return main_1.createPlugin(portalProviderAPI, providerFactory);
                },
            },
            {
                name: 'emojiInputRule',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return input_rules_1.default(schema);
                },
            },
            { name: 'emojiKeymap', plugin: function (_a) {
                    var schema = _a.schema;
                    return keymap_1.default(schema);
                } },
            {
                name: 'emojiAsciiInputRule',
                plugin: function (_a) {
                    var schema = _a.schema, providerFactory = _a.providerFactory;
                    return ascii_input_rules_1.inputRulePlugin(schema, providerFactory);
                },
            },
        ];
    },
    contentComponent: function (_a) {
        var editorView = _a.editorView, providerFactory = _a.providerFactory, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement;
        var renderNode = function (providers) {
            return (React.createElement(EmojiTypeAhead_1.default, { editorView: editorView, pluginKey: main_1.emojiPluginKey, emojiProvider: providers.emojiProvider, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement }));
        };
        return (React.createElement(editor_common_1.WithProviders, { providerFactory: providerFactory, providers: ['emojiProvider'], renderNode: renderNode }));
    },
    secondaryToolbarComponent: function (_a) {
        var editorView = _a.editorView, eventDispatcher = _a.eventDispatcher, providerFactory = _a.providerFactory, appearance = _a.appearance, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, disabled = _a.disabled;
        var renderNode = function (providers) {
            // numFollowingButtons must be changed if buttons are added after ToolbarEmojiPicker to the message editor
            return (React.createElement(ToolbarEmojiPicker_1.default, { editorView: editorView, pluginKey: main_1.emojiPluginKey, emojiProvider: providers.emojiProvider, numFollowingButtons: 4, isReducedSpacing: true, isDisabled: disabled, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement }));
        };
        return (React.createElement(editor_common_1.WithProviders, { providerFactory: providerFactory, providers: ['emojiProvider'], renderNode: renderNode }));
    },
    pluginsOptions: {
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(ToolbarInsertBlock_1.messages.emoji),
                    priority: 500,
                    icon: function () { return React.createElement(emoji_1.default, { label: formatMessage(ToolbarInsertBlock_1.messages.emoji) }); },
                    action: function (insert, state) {
                        var mark = state.schema.mark('emojiQuery');
                        var emojiText = state.schema.text(':', [mark]);
                        return insert(emojiText);
                    },
                },
            ];
        },
    },
};
exports.default = emojiPlugin;
//# sourceMappingURL=index.js.map