"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gap_cursor_1 = require("../plugins/gap-cursor");
var filter = function (predicates, cmd) {
    return function (state, dispatch, view) {
        if (!Array.isArray(predicates)) {
            predicates = [predicates];
        }
        if (predicates.some(function (pred) { return !pred(state, view); })) {
            return false;
        }
        return cmd(state, dispatch, view) || false;
    };
};
exports.filter = filter;
var isEmptySelectionAtStart = function (state, view) {
    var _a = state.selection, empty = _a.empty, $from = _a.$from;
    return (empty &&
        ($from.parentOffset === 0 || state.selection instanceof gap_cursor_1.GapCursorSelection));
};
exports.isEmptySelectionAtStart = isEmptySelectionAtStart;
var isFirstChildOfParent = function (state, view) {
    var $from = state.selection.$from;
    return $from.depth > 1
        ? (state.selection instanceof gap_cursor_1.GapCursorSelection &&
            $from.parentOffset === 0) ||
            $from.index($from.depth - 1) === 0
        : true;
};
exports.isFirstChildOfParent = isFirstChildOfParent;
/**
 * Creates a filter that checks if the node at a given number of parents above the current
 * selection is of the correct node type.
 * @param nodeType The node type to compare the nth parent against
 * @param depthAway How many levels above the current node to check against. 0 refers to
 * the current selection's parent, which will be the containing node when the selection
 * is usually inside the text content.
 */
var isNthParentOfType = function (nodeType, depthAway) {
    return function (state) {
        var $from = state.selection.$from;
        var parent = $from.node($from.depth - depthAway);
        return !!parent && parent.type === state.schema.nodes[nodeType];
    };
};
exports.isNthParentOfType = isNthParentOfType;
// https://github.com/ProseMirror/prosemirror-commands/blob/master/src/commands.js#L90
// Keep going left up the tree, without going across isolating boundaries, until we
// can go along the tree at that same level
//
// You can think of this as, if you could construct each document like we do in the tests,
// return the position of the first ) backwards from the current selection.
function findCutBefore($pos) {
    // parent is non-isolating, so we can look across this boundary
    if (!$pos.parent.type.spec.isolating) {
        // search up the tree from the pos's *parent*
        for (var i = $pos.depth - 1; i >= 0; i--) {
            // starting from the inner most node's parent, find out
            // if we're not its first child
            if ($pos.index(i) > 0) {
                return $pos.doc.resolve($pos.before(i + 1));
            }
            if ($pos.node(i).type.spec.isolating) {
                break;
            }
        }
    }
    return null;
}
exports.findCutBefore = findCutBefore;
//# sourceMappingURL=commands.js.map