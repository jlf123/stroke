"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_utils_1 = require("prosemirror-utils");
var filter_1 = require("../../utils/filter");
var utils_1 = require("../hyperlink/utils");
var analytics_1 = require("../../analytics");
var macro_1 = require("../macro");
var prosemirror_history_1 = require("prosemirror-history");
var util_1 = require("./util");
var doc_1 = require("../card/pm-plugins/doc");
exports.handlePasteIntoTaskAndDecision = function (slice) { return function (state, dispatch) {
    var _a = state.schema.nodes, decisionItem = _a.decisionItem, decisionList = _a.decisionList, taskList = _a.taskList, taskItem = _a.taskItem;
    if (decisionItem && decisionList && taskList && taskItem) {
        if (prosemirror_utils_1.hasParentNodeOfType([decisionItem, taskItem])(state.selection)) {
            if (state.selection.empty) {
                slice = filter_1.taskDecisionSliceFilter(slice, state.schema);
                slice = utils_1.linkifyContent(state.schema, slice);
                var tr = prosemirror_history_1.closeHistory(state.tr)
                    .replaceSelection(slice)
                    .scrollIntoView();
                doc_1.queueCardsFromChangedTr(state, tr);
                dispatch(tr);
                return true;
            }
        }
    }
    return false;
}; };
exports.handlePasteAsPlainText = function (slice, event) { return function (state, dispatch, view) {
    // In case of SHIFT+CMD+V ("Paste and Match Style") we don't want to run the usual
    // fuzzy matching of content. ProseMirror already handles this scenario and will
    // provide us with slice containing paragraphs with plain text, which we decorate
    // with "stored marks".
    // @see prosemirror-view/src/clipboard.js:parseFromClipboard()).
    // @see prosemirror-view/src/input.js:doPaste().
    var tr = prosemirror_history_1.closeHistory(state.tr);
    if (view.shiftKey) {
        // <- using the same internal flag that prosemirror-view is using
        analytics_1.analyticsService.trackEvent('atlassian.editor.paste.alt', {
            source: util_1.getPasteSource(event),
        });
        tr.replaceSelection(slice);
        (state.storedMarks || []).forEach(function (mark) {
            tr.addMark(tr.selection.from, tr.selection.from + slice.size, mark);
        });
        tr.scrollIntoView();
        dispatch(tr);
        return true;
    }
    return false;
}; };
exports.handleMacroAutoConvert = function (text, slice) { return function (state, dispatch, view) {
    var macro = macro_1.runMacroAutoConvert(state, text);
    if (macro) {
        var selection = state.tr.selection;
        var tr = state.tr.replaceSelection(slice);
        var before = tr.mapping.map(selection.from, -1);
        // insert the text or linkified/md-converted clipboard data
        dispatch(tr);
        // replace the text with the macro as a separate transaction
        // so the autoconversion generates 2 undo steps
        dispatch(prosemirror_history_1.closeHistory(view.state.tr)
            .replaceRangeWith(before, before + slice.size, macro)
            .scrollIntoView());
    }
    return !!macro;
}; };
//# sourceMappingURL=handlers.js.map