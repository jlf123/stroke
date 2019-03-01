"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_keymap_1 = require("prosemirror-keymap");
var prosemirror_utils_1 = require("prosemirror-utils");
var utils_1 = require("../../../utils");
var commands_1 = require("../../../utils/commands");
var bracket_handling_1 = require("../ide-ux/bracket-handling");
var line_handling_1 = require("../ide-ux/line-handling");
var commands_2 = require("../ide-ux/commands");
exports.default = new prosemirror_state_1.Plugin({
    props: {
        handleTextInput: function (view, from, to, text) {
            var state = view.state, dispatch = view.dispatch;
            if (line_handling_1.isCursorInsideCodeBlock(state)) {
                var beforeText = line_handling_1.getStartOfCurrentLine(state).text;
                var afterText = line_handling_1.getEndOfCurrentLine(state).text;
                // If text is a closing bracket and we've already inserted it, move the selection after.
                if (bracket_handling_1.isCursorBeforeClosingBracket(afterText) &&
                    bracket_handling_1.isClosingBracket(text) &&
                    afterText.startsWith(text)) {
                    dispatch(prosemirror_utils_1.setTextSelection(to + text.length)(state.tr));
                    return true;
                }
                // Automatically add right-hand side bracket when user types the left bracket
                var _a = bracket_handling_1.getAutoClosingBracketInfo(beforeText + text, afterText), left = _a.left, right = _a.right;
                if (left && right) {
                    var bracketPair = state.schema.text(text + right);
                    var tr = state.tr.replaceWith(from, to, bracketPair);
                    dispatch(prosemirror_utils_1.setTextSelection(from + text.length)(tr));
                    return true;
                }
            }
            return false;
        },
        handleKeyDown: prosemirror_keymap_1.keydownHandler({
            Backspace: function (state, dispatch) {
                if (line_handling_1.isCursorInsideCodeBlock(state)) {
                    var $cursor = utils_1.getCursor(state.selection);
                    var beforeText = line_handling_1.getStartOfCurrentLine(state).text;
                    var afterText = line_handling_1.getEndOfCurrentLine(state).text;
                    var _a = bracket_handling_1.getAutoClosingBracketInfo(beforeText, afterText), left = _a.left, right = _a.right, hasTrailingMatchingBracket = _a.hasTrailingMatchingBracket;
                    if (left && right && hasTrailingMatchingBracket) {
                        dispatch(state.tr.delete($cursor.pos - left.length, $cursor.pos + right.length));
                        return true;
                    }
                    var _b = line_handling_1.getLineInfo(beforeText), _c = _b.indentToken, size = _c.size, token = _c.token, indentText = _b.indentText;
                    if (beforeText === indentText) {
                        if (indentText.endsWith(token.repeat(size))) {
                            dispatch(state.tr.delete($cursor.pos - (size - (indentText.length % size) || size), $cursor.pos));
                            return true;
                        }
                    }
                }
                return false;
            },
            Enter: commands_1.filter(line_handling_1.isSelectionEntirelyInsideCodeBlock, commands_2.insertNewlineWithIndent),
            'Mod-]': commands_1.filter(line_handling_1.isSelectionEntirelyInsideCodeBlock, commands_2.indent),
            'Mod-[': commands_1.filter(line_handling_1.isSelectionEntirelyInsideCodeBlock, commands_2.outdent),
            Tab: commands_1.filter(line_handling_1.isSelectionEntirelyInsideCodeBlock, function (state, dispatch) {
                if (line_handling_1.isCursorInsideCodeBlock(state)) {
                    return commands_2.insertIndent(state, dispatch);
                }
                return commands_2.indent(state, dispatch);
            }),
            'Shift-Tab': commands_1.filter(line_handling_1.isSelectionEntirelyInsideCodeBlock, commands_2.outdent),
            'Mod-a': function (state, dispatch) {
                if (line_handling_1.isSelectionEntirelyInsideCodeBlock(state)) {
                    var _a = state.selection, $from = _a.$from, $to = _a.$to;
                    var isFullCodeBlockSelection = $from.parentOffset === 0 &&
                        $to.parentOffset === $to.parent.nodeSize - 2;
                    if (!isFullCodeBlockSelection) {
                        dispatch(state.tr.setSelection(prosemirror_state_1.TextSelection.create(state.doc, $from.start(), $to.end())));
                        return true;
                    }
                }
                return false;
            },
        }),
    },
});
//# sourceMappingURL=ide-ux.js.map