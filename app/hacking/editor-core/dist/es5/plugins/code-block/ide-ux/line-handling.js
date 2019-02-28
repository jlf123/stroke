"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../../utils");
exports.isSelectionEntirelyInsideCodeBlock = function (state) {
    return state.selection.$from.sameParent(state.selection.$to) &&
        state.selection.$from.parent.type === state.schema.nodes.codeBlock;
};
exports.isCursorInsideCodeBlock = function (state) {
    return !!utils_1.getCursor(state.selection) && exports.isSelectionEntirelyInsideCodeBlock(state);
};
exports.getStartOfCurrentLine = function (state) {
    var $from = state.selection.$from;
    if ($from.nodeBefore && $from.nodeBefore.isText) {
        var prevNewLineIndex = $from.nodeBefore.text.lastIndexOf('\n');
        return {
            text: $from.nodeBefore.text.substring(prevNewLineIndex + 1),
            pos: $from.start() + prevNewLineIndex + 1,
        };
    }
    return { text: '', pos: $from.pos };
};
exports.getEndOfCurrentLine = function (state) {
    var $to = state.selection.$to;
    if ($to.nodeAfter && $to.nodeAfter.isText) {
        var nextNewLineIndex = $to.nodeAfter.text.indexOf('\n');
        return {
            text: $to.nodeAfter.text.substring(0, nextNewLineIndex >= 0 ? nextNewLineIndex : undefined),
            pos: nextNewLineIndex >= 0 ? $to.pos + nextNewLineIndex : $to.end(),
        };
    }
    return { text: '', pos: $to.pos };
};
function getLinesFromSelection(state) {
    var start = exports.getStartOfCurrentLine(state).pos;
    var end = exports.getEndOfCurrentLine(state).pos;
    var text = state.doc.textBetween(start, end);
    return { text: text, start: start, end: end };
}
exports.getLinesFromSelection = getLinesFromSelection;
exports.forEachLine = function (text, callback) {
    var offset = 0;
    text.split('\n').forEach(function (line) {
        callback(line, offset);
        offset += line.length + 1;
    });
};
var SPACE = { token: ' ', size: 2, regex: /[^ ]/ };
var TAB = { token: '\t', size: 1, regex: /[^\t]/ };
exports.getLineInfo = function (line) {
    var indentToken = line.startsWith('\t') ? TAB : SPACE;
    var indentLength = line.search(indentToken.regex);
    var indentText = line.substring(0, indentLength >= 0 ? indentLength : line.length);
    return { indentToken: indentToken, indentText: indentText };
};
//# sourceMappingURL=line-handling.js.map