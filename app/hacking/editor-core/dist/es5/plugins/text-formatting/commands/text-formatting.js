"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_commands_1 = require("prosemirror-commands");
var utils_1 = require("../utils");
var utils_2 = require("../utils");
var transform_to_code_1 = require("./transform-to-code");
var analytics_1 = require("../../../analytics");
exports.moveRight = function () {
    return function (state, dispatch) {
        var code = state.schema.marks.code;
        var _a = state.selection, empty = _a.empty, $cursor = _a.$cursor;
        if (!empty || !$cursor) {
            return false;
        }
        var storedMarks = state.tr.storedMarks;
        if (code) {
            var insideCode = utils_2.markActive(state, code.create());
            var currentPosHasCode = state.doc.rangeHasMark($cursor.pos, $cursor.pos, code);
            var nextPosHasCode = state.doc.rangeHasMark($cursor.pos, $cursor.pos + 1, code);
            var exitingCode = !currentPosHasCode &&
                !nextPosHasCode &&
                (!storedMarks || !!storedMarks.length);
            var enteringCode = !currentPosHasCode &&
                nextPosHasCode &&
                (!storedMarks || !storedMarks.length);
            // entering code mark (from the left edge): don't move the cursor, just add the mark
            if (!insideCode && enteringCode) {
                if (dispatch) {
                    dispatch(state.tr.addStoredMark(code.create()));
                }
                return true;
            }
            // exiting code mark: don't move the cursor, just remove the mark
            if (insideCode && exitingCode) {
                if (dispatch) {
                    dispatch(state.tr.removeStoredMark(code));
                }
                return true;
            }
        }
        return false;
    };
};
exports.moveLeft = function (view) {
    return function (state, dispatch) {
        var code = state.schema.marks.code;
        var _a = state.selection, empty = _a.empty, $cursor = _a.$cursor;
        if (!empty || !$cursor) {
            return false;
        }
        var storedMarks = state.tr.storedMarks;
        if (code) {
            var insideCode = code && utils_2.markActive(state, code.create());
            var currentPosHasCode = utils_1.hasCode(state, $cursor.pos);
            var nextPosHasCode = utils_1.hasCode(state, $cursor.pos - 1);
            var nextNextPosHasCode = utils_1.hasCode(state, $cursor.pos - 2);
            var exitingCode = currentPosHasCode && !nextPosHasCode && Array.isArray(storedMarks);
            var atLeftEdge = nextPosHasCode &&
                !nextNextPosHasCode &&
                (storedMarks === null ||
                    (Array.isArray(storedMarks) && !!storedMarks.length));
            var atRightEdge = ((exitingCode && Array.isArray(storedMarks) && !storedMarks.length) ||
                (!exitingCode && storedMarks === null)) &&
                !nextPosHasCode &&
                nextNextPosHasCode;
            var enteringCode = !currentPosHasCode &&
                nextPosHasCode &&
                Array.isArray(storedMarks) &&
                !storedMarks.length;
            // removing ignored nodes (cursor wrapper) to make sure cursor isn't stuck
            if (view.cursorWrapper && !atLeftEdge && !atRightEdge) {
                utils_1.removeIgnoredNodesLeft(view);
            }
            // at the right edge: remove code mark and move the cursor to the left
            if (!insideCode && atRightEdge) {
                var tr = state.tr.setSelection(prosemirror_state_1.Selection.near(state.doc.resolve($cursor.pos - 1)));
                if (dispatch) {
                    dispatch(tr.removeStoredMark(code));
                }
                return true;
            }
            // entering code mark (from right edge): don't move the cursor, just add the mark
            if (!insideCode && enteringCode) {
                if (dispatch) {
                    dispatch(state.tr.addStoredMark(code.create()));
                }
                return true;
            }
            // at the left edge: add code mark and move the cursor to the left
            if (insideCode && atLeftEdge) {
                var tr = state.tr.setSelection(prosemirror_state_1.Selection.near(state.doc.resolve($cursor.pos - 1)));
                if (dispatch) {
                    dispatch(tr.addStoredMark(code.create()));
                }
                return true;
            }
            // exiting code mark (or at the beginning of the line): don't move the cursor, just remove the mark
            var isFirstChild = $cursor.index($cursor.depth - 1) === 0;
            if (insideCode &&
                (exitingCode || (!$cursor.nodeBefore && isFirstChild))) {
                if (dispatch) {
                    dispatch(state.tr.removeStoredMark(code));
                }
                return true;
            }
        }
        return false;
    };
};
// removing ignored nodes (cursor wrapper) when pressing Backspace to make sure cursor isn't stuck
exports.removeIgnoredNodes = function (view) {
    return function (state) {
        var _a = state.selection, empty = _a.empty, $cursor = _a.$cursor;
        if (empty && $cursor && $cursor.nodeBefore) {
            utils_1.removeIgnoredNodesLeft(view);
        }
        return false;
    };
};
exports.toggleEm = function () {
    return function (state, dispatch) {
        var em = state.schema.marks.em;
        if (em) {
            return prosemirror_commands_1.toggleMark(em)(state, dispatch);
        }
        return false;
    };
};
exports.toggleStrike = function () {
    return function (state, dispatch) {
        var strike = state.schema.marks.strike;
        if (strike) {
            return prosemirror_commands_1.toggleMark(strike)(state, dispatch);
        }
        return false;
    };
};
exports.toggleStrong = function () {
    return function (state, dispatch) {
        var strong = state.schema.marks.strong;
        if (strong) {
            return prosemirror_commands_1.toggleMark(strong)(state, dispatch);
        }
        return false;
    };
};
exports.toggleUnderline = function () {
    return function (state, dispatch) {
        var underline = state.schema.marks.underline;
        if (underline) {
            return prosemirror_commands_1.toggleMark(underline)(state, dispatch);
        }
        return false;
    };
};
exports.toggleSuperscript = function () {
    return function (state, dispatch) {
        var subsup = state.schema.marks.subsup;
        if (subsup) {
            if (utils_2.markActive(state, subsup.create({ type: 'sub' }))) {
                // If subscript is enabled, turn it off first.
                return prosemirror_commands_1.toggleMark(subsup)(state, dispatch);
            }
            return prosemirror_commands_1.toggleMark(subsup, { type: 'sup' })(state, dispatch);
        }
        return false;
    };
};
exports.toggleSubscript = function () {
    return function (state, dispatch) {
        var subsup = state.schema.marks.subsup;
        if (subsup) {
            if (utils_2.markActive(state, subsup.create({ type: 'sup' }))) {
                return prosemirror_commands_1.toggleMark(subsup)(state, dispatch);
            }
            return prosemirror_commands_1.toggleMark(subsup, { type: 'sub' })(state, dispatch);
        }
        return false;
    };
};
exports.toggleCode = function () {
    return function (state, dispatch) {
        var code = state.schema.marks.code;
        var _a = state.selection, from = _a.from, to = _a.to;
        if (code) {
            if (!utils_2.markActive(state, code.create())) {
                if (dispatch) {
                    dispatch(transform_to_code_1.transformToCodeAction(from, to, state.tr));
                }
                return true;
            }
            return prosemirror_commands_1.toggleMark(code)(state, dispatch);
        }
        return false;
    };
};
exports.createInlineCodeFromTextInput = function (from, to, text) {
    return function (state, dispatch) {
        if (state.selection.empty) {
            var before = state.doc.resolve(from).nodeBefore;
            var after = state.doc.resolve(to).nodeAfter;
            var hasTickBefore = before && before.text && before.text.endsWith('`');
            var hasTickAfter = after && after.text && after.text.startsWith('`');
            if (hasTickBefore && hasTickAfter) {
                analytics_1.analyticsService.trackEvent("atlassian.editor.format.code.autoformatting");
                var tr = state.tr.replaceRangeWith(from - 1, to + 1, state.schema.text(text));
                if (dispatch) {
                    dispatch(transform_to_code_1.transformToCodeAction(tr.mapping.map(from - 1), tr.mapping.map(to + 1), tr));
                }
                return true;
            }
        }
        return false;
    };
};
//# sourceMappingURL=text-formatting.js.map