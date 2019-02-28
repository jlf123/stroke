"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MarkdownIt = require("markdown-it");
// @ts-ignore
var prosemirror_tables_1 = require("prosemirror-tables");
var prosemirror_model_1 = require("prosemirror-model");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_history_1 = require("prosemirror-history");
var prosemirror_utils_1 = require("prosemirror-utils");
var editor_markdown_transformer_1 = require("@atlaskit/editor-markdown-transformer");
var analytics_1 = require("../../../analytics");
var clipboard = require("../../../utils/clipboard");
var media_single_1 = require("../../media/utils/media-single");
var linkify_md_plugin_1 = require("../linkify-md-plugin");
var util_1 = require("../util");
var actions_1 = require("../../extension/actions");
var utils_1 = require("../../layout/utils");
var utils_2 = require("../../hyperlink/utils");
var main_1 = require("../../table/pm-plugins/main");
var utils_3 = require("../../table/utils");
var actions_2 = require("../../table/actions");
var handlers_1 = require("../handlers");
var utils_4 = require("../../code-block/utils");
var doc_1 = require("../../card/pm-plugins/doc");
exports.stateKey = new prosemirror_state_1.PluginKey('pastePlugin');
function createPlugin(schema, editorAppearance) {
    var md = MarkdownIt('zero', { html: false });
    md.enable([
        // Process html entity - &#123;, &#xAF;, &quot;, ...
        'entity',
        // Process escaped chars and hardbreaks
        'escape',
        'newline',
    ]);
    // enable modified version of linkify plugin
    // @see https://product-fabric.atlassian.net/browse/ED-3097
    md.use(linkify_md_plugin_1.default);
    var atlassianMarkDownParser = new editor_markdown_transformer_1.MarkdownTransformer(schema, md);
    return new prosemirror_state_1.Plugin({
        key: exports.stateKey,
        props: {
            handlePaste: function (view, rawEvent, slice) {
                var event = rawEvent;
                if (!event.clipboardData) {
                    return false;
                }
                var text = event.clipboardData.getData('text/plain');
                var html = event.clipboardData.getData('text/html');
                // Bail if copied content has files
                if (clipboard.isPastedFile(event)) {
                    if (!html) {
                        return true;
                    }
                    /**
                     * Microsoft Office, Number, Pages, etc. adds an image to clipboard
                     * with other mime-types so we don't let the event reach media
                     */
                    event.stopPropagation();
                }
                var state = view.state, dispatch = view.dispatch;
                var _a = state.schema.nodes, codeBlock = _a.codeBlock, media = _a.media, decisionItem = _a.decisionItem, taskItem = _a.taskItem;
                if (handlers_1.handlePasteAsPlainText(slice, event)(state, dispatch, view)) {
                    return true;
                }
                // send analytics
                if (prosemirror_utils_1.hasParentNodeOfType([decisionItem, taskItem])(state.selection)) {
                    analytics_1.analyticsService.trackEvent('atlassian.fabric.action-decision.editor.paste');
                }
                else {
                    analytics_1.analyticsService.trackEvent('atlassian.editor.paste', {
                        source: util_1.getPasteSource(event),
                    });
                }
                var markdownSlice;
                if (text && !html) {
                    var doc = atlassianMarkDownParser.parse(util_1.escapeLinks(text));
                    if (doc && doc.content) {
                        markdownSlice = new prosemirror_model_1.Slice(doc.content, slice.openStart, slice.openEnd);
                    }
                    // run macro autoconvert prior to other conversions
                    if (markdownSlice &&
                        handlers_1.handleMacroAutoConvert(text, markdownSlice)(state, dispatch, view)) {
                        return true;
                    }
                }
                if (handlers_1.handlePasteIntoTaskAndDecision(slice)(state, dispatch)) {
                    return true;
                }
                // If we're in a code block, append the text contents of clipboard inside it
                if (text && prosemirror_utils_1.hasParentNodeOfType(codeBlock)(state.selection)) {
                    var tr = prosemirror_history_1.closeHistory(state.tr);
                    dispatch(tr.insertText(text));
                    return true;
                }
                if (editorAppearance !== 'message' &&
                    slice.content.childCount === 1 &&
                    slice.content.firstChild.type === media) {
                    return media_single_1.insertMediaAsMediaSingle(view, slice.content.firstChild);
                }
                // If the clipboard only contains plain text, attempt to parse it as Markdown
                if (text && !html && markdownSlice) {
                    analytics_1.analyticsService.trackEvent('atlassian.editor.paste.markdown');
                    var tr = prosemirror_history_1.closeHistory(state.tr);
                    tr.replaceSelection(markdownSlice);
                    doc_1.queueCardsFromChangedTr(state, tr);
                    dispatch(tr.scrollIntoView());
                    return true;
                }
                // finally, handle rich-text copy-paste
                if (html) {
                    // linkify the text where possible
                    slice = utils_2.linkifyContent(state.schema, slice);
                    // run macro autoconvert prior to other conversions
                    if (handlers_1.handleMacroAutoConvert(text, slice)(state, dispatch, view)) {
                        return true;
                    }
                    var _b = state.schema.nodes, table = _b.table, tableCell = _b.tableCell;
                    // if we're pasting to outside a table or outside a table
                    // header, ensure that we apply any table headers to the first
                    // row of content we see, if required
                    if (!prosemirror_utils_1.hasParentNodeOfType([table, tableCell])(state.selection)) {
                        var tableState = main_1.pluginKey.getState(state);
                        if (tableState && tableState.pluginConfig.isHeaderRowRequired) {
                            slice = actions_2.transformSliceToAddTableHeaders(slice, state.schema);
                        }
                    }
                    // In case user is pasting inline code,
                    // any backtick ` immediately preceding it should be removed.
                    var tr = state.tr;
                    if (slice.content.firstChild &&
                        slice.content.firstChild.marks.some(function (m) { return m.type === state.schema.marks.code; })) {
                        var _c = tr.selection, nodeBefore = _c.$from.nodeBefore, from = _c.from;
                        if (nodeBefore &&
                            nodeBefore.isText &&
                            nodeBefore.text.endsWith('`')) {
                            tr.delete(from - 1, from);
                        }
                    }
                    // get prosemirror-tables to handle pasting tables if it can
                    // otherwise, just the replace the selection with the content
                    if (prosemirror_tables_1.handlePaste(view, null, slice)) {
                        return true;
                    }
                    prosemirror_history_1.closeHistory(tr);
                    tr.replaceSelection(slice);
                    tr.setStoredMarks([]);
                    if (tr.selection.empty &&
                        tr.selection.$from.parent.type === codeBlock) {
                        tr.setSelection(prosemirror_state_1.TextSelection.near(tr.selection.$from, 1));
                    }
                    // queue link cards, ignoring any errors
                    dispatch(doc_1.queueCardsFromChangedTr(state, tr));
                    return true;
                }
                return false;
            },
            transformPasted: function (slice) {
                // remove table number column if its part of the node
                slice = utils_3.transformSliceToRemoveNumberColumn(slice, schema);
                /** If a partial paste of table, paste only table's content */
                slice = utils_3.transformSliceToRemoveOpenTable(slice, schema);
                // We do this separately so it also applies to drag/drop events
                slice = utils_1.transformSliceToRemoveOpenLayoutNodes(slice, schema);
                /** If a partial paste of bodied extension, paste only text */
                slice = actions_1.transformSliceToRemoveOpenBodiedExtension(slice, schema);
                /* Bitbucket copies diffs as multiple adjacent code blocks
                 * so we merge ALL adjacent code blocks to support paste here */
                slice = utils_4.transformSliceToJoinAdjacentCodeBlocks(slice);
                slice = utils_4.transformSingleLineCodeBlockToCodeMark(slice, schema);
                if (slice.content.childCount &&
                    slice.content.lastChild.type === schema.nodes.codeBlock) {
                    slice = new prosemirror_model_1.Slice(slice.content.append(prosemirror_model_1.Fragment.from(schema.nodes.paragraph.createAndFill())), slice.openStart, 1);
                }
                return slice;
            },
            transformPastedHTML: function (html) {
                // Fix for issue ED-4438
                // text from google docs should not be pasted as inline code
                if (html.indexOf('id="docs-internal-guid-') >= 0) {
                    html = html.replace(/white-space:pre/g, '');
                    html = html.replace(/white-space:pre-wrap/g, '');
                }
                return html;
            },
        },
    });
}
exports.createPlugin = createPlugin;
//# sourceMappingURL=main.js.map