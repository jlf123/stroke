"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_utils_1 = require("prosemirror-utils");
var direction_1 = require("./direction");
var selection_1 = require("./selection");
var utils_1 = require("./utils");
var utils_2 = require("../../utils");
var main_1 = require("./pm-plugins/main");
exports.arrow = function (dir, endOfTextblock) { return function (state, dispatch) {
    var doc = state.doc, schema = state.schema, selection = state.selection, tr = state.tr;
    var $pos = direction_1.isBackward(dir) ? selection.$from : selection.$to;
    var mustMove = selection.empty;
    // start from text selection
    if (selection instanceof prosemirror_state_1.TextSelection) {
        // if cursor is in the middle of a text node, do nothing
        if (!endOfTextblock(dir.toString())) {
            return false;
        }
        // UP/DOWN jumps to the nearest texblock skipping gapcursor whenever possible
        if ((dir === direction_1.Direction.UP &&
            !utils_2.atTheBeginningOfDoc(state) &&
            utils_1.isTextBlockNearPos(doc, schema, $pos, -1)) ||
            (dir === direction_1.Direction.DOWN &&
                (utils_2.atTheEndOfDoc(state) || utils_1.isTextBlockNearPos(doc, schema, $pos, 1)))) {
            return false;
        }
        // otherwise resolve previous/next position
        $pos = doc.resolve(direction_1.isBackward(dir) ? $pos.before() : $pos.after());
        mustMove = false;
    }
    // when jumping between block nodes at the same depth, we need to reverse cursor without changing ProseMirror position
    if (selection instanceof selection_1.GapCursorSelection &&
        // next node allow gap cursor position
        utils_1.isValidTargetNode(direction_1.isBackward(dir) ? $pos.nodeBefore : $pos.nodeAfter) &&
        // gap cursor changes block node
        ((direction_1.isBackward(dir) && selection.side === selection_1.Side.LEFT) ||
            (direction_1.isForward(dir) && selection.side === selection_1.Side.RIGHT))) {
        // reverse cursor position
        if (dispatch) {
            dispatch(tr
                .setSelection(new selection_1.GapCursorSelection($pos, selection.side === selection_1.Side.RIGHT ? selection_1.Side.LEFT : selection_1.Side.RIGHT))
                .scrollIntoView());
        }
        return true;
    }
    var nextSelection = selection_1.GapCursorSelection.findFrom($pos, direction_1.isBackward(dir) ? -1 : 1, mustMove);
    if (!nextSelection) {
        return false;
    }
    if (!utils_1.isValidTargetNode(direction_1.isForward(dir)
        ? nextSelection.$from.nodeBefore
        : nextSelection.$from.nodeAfter)) {
        // reverse cursor position
        if (dispatch) {
            dispatch(tr
                .setSelection(new selection_1.GapCursorSelection(nextSelection.$from, direction_1.isForward(dir) ? selection_1.Side.LEFT : selection_1.Side.RIGHT))
                .scrollIntoView());
        }
        return true;
    }
    if (dispatch) {
        dispatch(tr.setSelection(nextSelection).scrollIntoView());
    }
    return true;
}; };
exports.deleteNode = function (dir) { return function (state, dispatch) {
    if (state.selection instanceof selection_1.GapCursorSelection) {
        var _a = state.selection, $from = _a.$from, $anchor = _a.$anchor;
        var tr = state.tr;
        if (direction_1.isBackward(dir)) {
            if (state.selection.side === 'left') {
                tr.setSelection(new selection_1.GapCursorSelection($anchor, selection_1.Side.RIGHT));
                if (dispatch) {
                    dispatch(tr);
                }
                return true;
            }
            tr = prosemirror_utils_1.removeNodeBefore(state.tr);
        }
        else if ($from.nodeAfter) {
            tr = tr.delete($from.pos, $from.pos + $from.nodeAfter.nodeSize);
        }
        if (dispatch) {
            dispatch(tr
                .setSelection(prosemirror_state_1.Selection.near(tr.doc.resolve(tr.mapping.map(state.selection.$from.pos))))
                .scrollIntoView());
        }
        return true;
    }
    return false;
}; };
exports.setGapCursorAtPos = function (position, side) {
    if (side === void 0) { side = selection_1.Side.LEFT; }
    return function (state, dispatch) {
        var $pos = state.doc.resolve(position);
        if (selection_1.GapCursorSelection.valid($pos)) {
            if (dispatch) {
                dispatch(state.tr.setSelection(new selection_1.GapCursorSelection($pos, side)));
            }
            return true;
        }
        return false;
    };
};
// This function captures clicks outside of the ProseMirror contentEditable area
// see also description of "handleClick" in gap-cursor pm-plugin
var captureCursorCoords = function (event, editorRef, posAtCoords, state) {
    var rect = editorRef.getBoundingClientRect();
    // capture clicks before the first block element
    if (event.clientY < rect.top) {
        return { position: 0, side: selection_1.Side.LEFT };
    }
    if (rect.left > 0) {
        // calculate start position of a node that is vertically at the same level
        var coords = posAtCoords({
            left: rect.left,
            top: event.clientY,
        });
        if (coords && coords.inside > -1) {
            var $from = state.doc.resolve(coords.inside);
            var start = $from.before(1);
            var side = event.clientX < rect.left ? selection_1.Side.LEFT : selection_1.Side.RIGHT;
            var position = void 0;
            if (side === selection_1.Side.LEFT) {
                position = start;
            }
            else {
                var node = state.doc.nodeAt(start);
                if (node) {
                    position = start + node.nodeSize;
                }
            }
            return { position: position, side: side };
        }
    }
    return null;
};
exports.setCursorForTopLevelBlocks = function (event, editorRef, posAtCoords) { return function (state, dispatch) {
    // plugin is disabled
    if (!main_1.pluginKey.get(state)) {
        return false;
    }
    var cursorCoords = captureCursorCoords(event, editorRef, posAtCoords, state);
    if (!cursorCoords) {
        return false;
    }
    var $pos = state.doc.resolve(cursorCoords.position);
    var isGapCursorAllowed = cursorCoords.side === selection_1.Side.LEFT
        ? utils_1.isValidTargetNode($pos.nodeAfter)
        : utils_1.isValidTargetNode($pos.nodeBefore);
    if (isGapCursorAllowed && selection_1.GapCursorSelection.valid($pos)) {
        // this forces PM to re-render the decoration node if we change the side of the gap cursor, it doesn't do it by default
        if (state.selection instanceof selection_1.GapCursorSelection) {
            if (dispatch) {
                dispatch(state.tr.setSelection(prosemirror_state_1.Selection.near($pos)));
            }
        }
        if (dispatch) {
            dispatch(state.tr.setSelection(new selection_1.GapCursorSelection($pos, cursorCoords.side)));
        }
        return true;
    }
    // try to set text selection
    else {
        var selection = prosemirror_state_1.Selection.findFrom($pos, cursorCoords.side === selection_1.Side.LEFT ? 1 : -1, true);
        if (selection) {
            if (dispatch) {
                dispatch(state.tr.setSelection(selection));
            }
            return true;
        }
    }
    return false;
}; };
//# sourceMappingURL=actions.js.map