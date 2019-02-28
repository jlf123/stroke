import { Selection } from 'prosemirror-state';
import { toggleMark } from 'prosemirror-commands';
import { removeIgnoredNodesLeft, hasCode } from '../utils';
import { markActive } from '../utils';
import { transformToCodeAction } from './transform-to-code';
import { analyticsService } from '../../../analytics';
export var moveRight = function () {
    return function (state, dispatch) {
        var code = state.schema.marks.code;
        var _a = state.selection, empty = _a.empty, $cursor = _a.$cursor;
        if (!empty || !$cursor) {
            return false;
        }
        var storedMarks = state.tr.storedMarks;
        if (code) {
            var insideCode = markActive(state, code.create());
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
export var moveLeft = function (view) {
    return function (state, dispatch) {
        var code = state.schema.marks.code;
        var _a = state.selection, empty = _a.empty, $cursor = _a.$cursor;
        if (!empty || !$cursor) {
            return false;
        }
        var storedMarks = state.tr.storedMarks;
        if (code) {
            var insideCode = code && markActive(state, code.create());
            var currentPosHasCode = hasCode(state, $cursor.pos);
            var nextPosHasCode = hasCode(state, $cursor.pos - 1);
            var nextNextPosHasCode = hasCode(state, $cursor.pos - 2);
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
                removeIgnoredNodesLeft(view);
            }
            // at the right edge: remove code mark and move the cursor to the left
            if (!insideCode && atRightEdge) {
                var tr = state.tr.setSelection(Selection.near(state.doc.resolve($cursor.pos - 1)));
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
                var tr = state.tr.setSelection(Selection.near(state.doc.resolve($cursor.pos - 1)));
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
export var removeIgnoredNodes = function (view) {
    return function (state) {
        var _a = state.selection, empty = _a.empty, $cursor = _a.$cursor;
        if (empty && $cursor && $cursor.nodeBefore) {
            removeIgnoredNodesLeft(view);
        }
        return false;
    };
};
export var toggleEm = function () {
    return function (state, dispatch) {
        var em = state.schema.marks.em;
        if (em) {
            return toggleMark(em)(state, dispatch);
        }
        return false;
    };
};
export var toggleStrike = function () {
    return function (state, dispatch) {
        var strike = state.schema.marks.strike;
        if (strike) {
            return toggleMark(strike)(state, dispatch);
        }
        return false;
    };
};
export var toggleStrong = function () {
    return function (state, dispatch) {
        var strong = state.schema.marks.strong;
        if (strong) {
            return toggleMark(strong)(state, dispatch);
        }
        return false;
    };
};
export var toggleUnderline = function () {
    return function (state, dispatch) {
        var underline = state.schema.marks.underline;
        if (underline) {
            return toggleMark(underline)(state, dispatch);
        }
        return false;
    };
};
export var toggleSuperscript = function () {
    return function (state, dispatch) {
        var subsup = state.schema.marks.subsup;
        if (subsup) {
            if (markActive(state, subsup.create({ type: 'sub' }))) {
                // If subscript is enabled, turn it off first.
                return toggleMark(subsup)(state, dispatch);
            }
            return toggleMark(subsup, { type: 'sup' })(state, dispatch);
        }
        return false;
    };
};
export var toggleSubscript = function () {
    return function (state, dispatch) {
        var subsup = state.schema.marks.subsup;
        if (subsup) {
            if (markActive(state, subsup.create({ type: 'sup' }))) {
                return toggleMark(subsup)(state, dispatch);
            }
            return toggleMark(subsup, { type: 'sub' })(state, dispatch);
        }
        return false;
    };
};
export var toggleCode = function () {
    return function (state, dispatch) {
        var code = state.schema.marks.code;
        var _a = state.selection, from = _a.from, to = _a.to;
        if (code) {
            if (!markActive(state, code.create())) {
                if (dispatch) {
                    dispatch(transformToCodeAction(from, to, state.tr));
                }
                return true;
            }
            return toggleMark(code)(state, dispatch);
        }
        return false;
    };
};
export var createInlineCodeFromTextInput = function (from, to, text) {
    return function (state, dispatch) {
        if (state.selection.empty) {
            var before = state.doc.resolve(from).nodeBefore;
            var after = state.doc.resolve(to).nodeAfter;
            var hasTickBefore = before && before.text && before.text.endsWith('`');
            var hasTickAfter = after && after.text && after.text.startsWith('`');
            if (hasTickBefore && hasTickAfter) {
                analyticsService.trackEvent("atlassian.editor.format.code.autoformatting");
                var tr = state.tr.replaceRangeWith(from - 1, to + 1, state.schema.text(text));
                if (dispatch) {
                    dispatch(transformToCodeAction(tr.mapping.map(from - 1), tr.mapping.map(to + 1), tr));
                }
                return true;
            }
        }
        return false;
    };
};
//# sourceMappingURL=text-formatting.js.map