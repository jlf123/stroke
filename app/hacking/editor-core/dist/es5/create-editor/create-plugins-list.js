"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var plugins_1 = require("../plugins");
/**
 * Returns list of plugins that are absolutely necessary for editor to work
 */
function getDefaultPluginsList(props) {
    return [
        plugins_1.pastePlugin,
        plugins_1.basePlugin,
        plugins_1.blockTypePlugin,
        plugins_1.placeholderPlugin,
        plugins_1.clearMarksOnChangeToEmptyDocumentPlugin,
        plugins_1.hyperlinkPlugin,
        plugins_1.textFormattingPlugin(props.textFormatting || {}),
        plugins_1.widthPlugin,
        plugins_1.typeAheadPlugin,
        plugins_1.unsupportedContentPlugin,
        plugins_1.editorDisabledPlugin,
    ];
}
exports.getDefaultPluginsList = getDefaultPluginsList;
/**
 * Maps EditorProps to EditorPlugins
 */
function createPluginsList(props, createAnalyticsEvent) {
    var plugins = getDefaultPluginsList(props);
    if (props.allowBreakout && props.appearance === 'full-page') {
        plugins.push(plugins_1.breakoutPlugin);
    }
    if (props.allowTextAlignment) {
        plugins.push(plugins_1.alignment);
    }
    if (props.allowInlineAction) {
        plugins.push(plugins_1.inlineActionPlugin);
    }
    if (props.allowTextColor) {
        plugins.push(plugins_1.textColorPlugin);
    }
    if (props.allowLists) {
        plugins.push(plugins_1.listsPlugin);
    }
    if (props.allowRule) {
        plugins.push(plugins_1.rulePlugin);
    }
    if (props.media || props.mediaProvider) {
        plugins.push(plugins_1.mediaPlugin(props.media));
    }
    if (props.allowCodeBlocks) {
        var options = props.allowCodeBlocks !== true ? props.allowCodeBlocks : {};
        plugins.push(plugins_1.codeBlockPlugin(options));
    }
    if (props.mentionProvider) {
        plugins.push(plugins_1.mentionsPlugin(createAnalyticsEvent));
    }
    if (props.emojiProvider) {
        plugins.push(plugins_1.emojiPlugin);
    }
    if (props.allowTables) {
        plugins.push(plugins_1.tablesPlugin(props.allowTables));
    }
    if (props.allowTasksAndDecisions || props.taskDecisionProvider) {
        plugins.push(plugins_1.tasksAndDecisionsPlugin);
    }
    if (props.allowHelpDialog) {
        plugins.push(plugins_1.helpDialogPlugin);
    }
    if (props.saveOnEnter) {
        plugins.push(plugins_1.saveOnEnterPlugin);
    }
    if (props.legacyImageUploadProvider) {
        plugins.push(plugins_1.imageUploadPlugin);
        if (!props.media && !props.mediaProvider) {
            plugins.push(plugins_1.mediaPlugin({
                allowMediaSingle: { disableLayout: true },
                allowMediaGroup: false,
            }));
        }
    }
    if (props.collabEdit || props.collabEditProvider) {
        plugins.push(plugins_1.collabEditPlugin(props.collabEdit));
    }
    if (props.maxContentSize) {
        plugins.push(plugins_1.maxContentSizePlugin);
    }
    if (props.allowJiraIssue) {
        plugins.push(plugins_1.jiraIssuePlugin);
    }
    if (props.allowPanel) {
        plugins.push(plugins_1.panelPlugin);
    }
    if (props.allowExtension) {
        plugins.push(plugins_1.extensionPlugin);
    }
    if (props.macroProvider) {
        plugins.push(plugins_1.macroPlugin);
    }
    if (props.allowConfluenceInlineComment) {
        plugins.push(plugins_1.confluenceInlineComment);
    }
    if (props.allowDate) {
        plugins.push(plugins_1.datePlugin);
    }
    if (props.allowTemplatePlaceholders) {
        var options = props.allowTemplatePlaceholders !== true
            ? props.allowTemplatePlaceholders
            : {};
        plugins.push(plugins_1.placeholderTextPlugin(options));
    }
    if (props.allowLayouts) {
        plugins.push(plugins_1.layoutPlugin);
    }
    if (props.UNSAFE_cards) {
        plugins.push(plugins_1.cardPlugin);
    }
    var statusMenuDisabled = true;
    if (props.allowStatus) {
        statusMenuDisabled =
            typeof props.allowStatus === 'object'
                ? props.allowStatus.menuDisabled
                : false;
        plugins.push(plugins_1.statusPlugin({ menuDisabled: statusMenuDisabled }));
    }
    if (props.allowIndentation) {
        plugins.push(plugins_1.indentationPlugin);
    }
    // UI only plugins
    plugins.push(plugins_1.insertBlockPlugin({
        insertMenuItems: props.insertMenuItems,
        horizontalRuleEnabled: props.allowRule,
        nativeStatusSupported: !statusMenuDisabled,
    }));
    plugins.push(plugins_1.gapCursorPlugin);
    plugins.push(plugins_1.gridPlugin);
    plugins.push(plugins_1.submitEditorPlugin);
    plugins.push(plugins_1.fakeTextCursorPlugin);
    plugins.push(plugins_1.floatingToolbarPlugin);
    if (props.appearance !== 'mobile') {
        plugins.push(plugins_1.quickInsertPlugin);
    }
    if (props.appearance === 'message') {
        plugins.push(plugins_1.isMultilineContentPlugin);
    }
    return plugins;
}
exports.default = createPluginsList;
//# sourceMappingURL=create-plugins-list.js.map