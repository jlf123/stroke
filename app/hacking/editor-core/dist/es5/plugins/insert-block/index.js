"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var editor_common_1 = require("@atlaskit/editor-common");
var main_1 = require("../block-type/pm-plugins/main");
var main_2 = require("../media/pm-plugins/main");
var main_3 = require("../hyperlink/pm-plugins/main");
var mentions_1 = require("../mentions");
var main_4 = require("../table/pm-plugins/main");
var main_5 = require("../image-upload/pm-plugins/main");
var placeholder_text_1 = require("../placeholder-text");
var layout_1 = require("../layout");
var macro_1 = require("../macro");
var plugin_1 = require("../date/plugin");
var main_6 = require("../emoji/pm-plugins/main");
var WithPluginState_1 = require("../../ui/WithPluginState");
var Toolbar_1 = require("../../ui/Toolbar");
var ToolbarInsertBlock_1 = require("./ui/ToolbarInsertBlock");
var commands_1 = require("../block-type/commands");
var commands_2 = require("../image-upload/pm-plugins/commands");
var main_7 = require("../type-ahead/pm-plugins/main");
var toolbarSizeToButtons = function (toolbarSize) {
    switch (toolbarSize) {
        case Toolbar_1.ToolbarSize.XXL:
        case Toolbar_1.ToolbarSize.XL:
        case Toolbar_1.ToolbarSize.L:
        case Toolbar_1.ToolbarSize.M:
            return 6;
        case Toolbar_1.ToolbarSize.S:
            return 2;
        default:
            return 0;
    }
};
var insertBlockPlugin = function (options) { return ({
    primaryToolbarComponent: function (_a) {
        var editorView = _a.editorView, appearance = _a.appearance, editorActions = _a.editorActions, eventDispatcher = _a.eventDispatcher, providerFactory = _a.providerFactory, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, toolbarSize = _a.toolbarSize, disabled = _a.disabled, isToolbarReducedSpacing = _a.isToolbarReducedSpacing;
        var buttons = toolbarSizeToButtons(toolbarSize);
        var renderNode = function (providers) {
            return (React.createElement(WithPluginState_1.default, { plugins: {
                    typeAheadState: main_7.pluginKey,
                    blockTypeState: main_1.pluginKey,
                    mediaState: main_2.stateKey,
                    mentionState: mentions_1.mentionPluginKey,
                    tablesState: main_4.pluginKey,
                    macroState: macro_1.pluginKey,
                    hyperlinkState: main_3.stateKey,
                    emojiState: main_6.emojiPluginKey,
                    dateState: plugin_1.pluginKey,
                    imageUpload: main_5.stateKey,
                    placeholderTextState: placeholder_text_1.pluginKey,
                    layoutState: layout_1.pluginKey,
                }, render: function (_a) {
                    var typeAheadState = _a.typeAheadState, mentionState = _a.mentionState, blockTypeState = _a.blockTypeState, mediaState = _a.mediaState, tablesState = _a.tablesState, _b = _a.macroState, macroState = _b === void 0 ? {} : _b, hyperlinkState = _a.hyperlinkState, emojiState = _a.emojiState, dateState = _a.dateState, imageUpload = _a.imageUpload, placeholderTextState = _a.placeholderTextState, layoutState = _a.layoutState;
                    return (React.createElement(ToolbarInsertBlock_1.default, { buttons: buttons, isReducedSpacing: isToolbarReducedSpacing, isDisabled: disabled, isTypeAheadAllowed: typeAheadState.isAllowed, editorView: editorView, tableSupported: !!tablesState, actionSupported: !!editorView.state.schema.nodes.taskItem, mentionsSupported: !!(mentionState && mentionState.provider), mentionsEnabled: mentionState, decisionSupported: !!editorView.state.schema.nodes.decisionItem, dateEnabled: !!dateState, placeholderTextEnabled: placeholderTextState && placeholderTextState.allowInserting, layoutSectionEnabled: !!layoutState, mediaUploadsEnabled: mediaState && mediaState.allowsUploads, onShowMediaPicker: mediaState && mediaState.showMediaPicker, mediaSupported: !!mediaState, imageUploadSupported: !!imageUpload, imageUploadEnabled: imageUpload && imageUpload.enabled, handleImageUpload: commands_2.startImageUpload, availableWrapperBlockTypes: blockTypeState.availableWrapperBlockTypes, linkSupported: !!hyperlinkState, linkDisabled: !hyperlinkState ||
                            !hyperlinkState.canInsertLink ||
                            hyperlinkState.activeLinkMark, emojiDisabled: !emojiState || !emojiState.enabled, insertEmoji: emojiState && emojiState.insertEmoji, emojiProvider: providers.emojiProvider, nativeStatusSupported: options.nativeStatusSupported, horizontalRuleEnabled: options.horizontalRuleEnabled, onInsertBlockType: commands_1.insertBlockType, onInsertMacroFromMacroBrowser: macro_1.insertMacroFromMacroBrowser, macroProvider: macroState.macroProvider, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement, insertMenuItems: options.insertMenuItems, editorActions: editorActions }));
                } }));
        };
        return (React.createElement(editor_common_1.WithProviders, { providerFactory: providerFactory, providers: ['emojiProvider'], renderNode: renderNode }));
    },
}); };
exports.default = insertBlockPlugin;
//# sourceMappingURL=index.js.map