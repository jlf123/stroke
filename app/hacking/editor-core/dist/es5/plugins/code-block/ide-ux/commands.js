"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
var line_handling_1 = require("./line-handling");
var analytics_1 = require("../../../analytics");
function indent(state, dispatch) {
    var _a = line_handling_1.getLinesFromSelection(state), text = _a.text, start = _a.start;
    var tr = state.tr, selection = state.selection;
    line_handling_1.forEachLine(text, function (line, offset) {
        var _a = line_handling_1.getLineInfo(line), indentText = _a.indentText, indentToken = _a.indentToken;
        var indentToAdd = indentToken.token.repeat(indentToken.size - (indentText.length % indentToken.size) ||
            indentToken.size);
        tr.insertText(indentToAdd, tr.mapping.map(start + offset, -1));
        if (!selection.empty) {
            tr.setSelection(prosemirror_state_1.TextSelection.create(tr.doc, tr.mapping.map(selection.from, -1), tr.selection.to));
        }
    });
    dispatch(tr);
    analytics_1.analyticsService.trackEvent("atlassian.editor.codeblock.indent");
    return true;
}
exports.indent = indent;
function outdent(state, dispatch) {
    var _a = line_handling_1.getLinesFromSelection(state), text = _a.text, start = _a.start;
    var tr = state.tr;
    line_handling_1.forEachLine(text, function (line, offset) {
        var _a = line_handling_1.getLineInfo(line), indentText = _a.indentText, indentToken = _a.indentToken;
        if (indentText) {
            var unindentLength = indentText.length % indentToken.size || indentToken.size;
            tr.delete(tr.mapping.map(start + offset), tr.mapping.map(start + offset + unindentLength));
        }
    });
    dispatch(tr);
    analytics_1.analyticsService.trackEvent('atlassian.editor.codeblock.outdent');
    return true;
}
exports.outdent = outdent;
function insertIndent(state, dispatch) {
    var textAtStartOfLine = line_handling_1.getStartOfCurrentLine(state).text;
    var indentToken = line_handling_1.getLineInfo(textAtStartOfLine).indentToken;
    var indentToAdd = indentToken.token.repeat(indentToken.size - (textAtStartOfLine.length % indentToken.size) ||
        indentToken.size);
    dispatch(state.tr.insertText(indentToAdd));
    analytics_1.analyticsService.trackEvent('atlassian.editor.codeblock.indent.insert');
    return true;
}
exports.insertIndent = insertIndent;
function insertNewlineWithIndent(state, dispatch) {
    var textAtStartOfLine = line_handling_1.getStartOfCurrentLine(state).text;
    var indentText = line_handling_1.getLineInfo(textAtStartOfLine).indentText;
    if (indentText) {
        dispatch(state.tr.insertText('\n' + indentText));
        return true;
    }
    return false;
}
exports.insertNewlineWithIndent = insertNewlineWithIndent;
//# sourceMappingURL=commands.js.map