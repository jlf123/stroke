"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_model_1 = require("prosemirror-model");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_transform_1 = require("prosemirror-transform");
var utils_1 = require("./utils");
function liftListItem(state, selection, tr) {
    var $from = selection.$from, $to = selection.$to;
    var nodeType = state.schema.nodes.listItem;
    var range = $from.blockRange($to, function (node) { return node.childCount && node.firstChild.type === nodeType; });
    if (!range ||
        range.depth < 2 ||
        $from.node(range.depth - 1).type !== nodeType) {
        return tr;
    }
    var end = range.end;
    var endOfList = $to.end(range.depth);
    if (end < endOfList) {
        tr.step(new prosemirror_transform_1.ReplaceAroundStep(end - 1, endOfList, end, endOfList, new prosemirror_model_1.Slice(prosemirror_model_1.Fragment.from(nodeType.create(undefined, range.parent.copy())), 1, 0), 1, true));
        range = new prosemirror_model_1.NodeRange(tr.doc.resolve($from.pos), tr.doc.resolve(endOfList), range.depth);
    }
    return tr.lift(range, prosemirror_transform_1.liftTarget(range)).scrollIntoView();
}
// Function will lift list item following selection to level-1.
function liftFollowingList(state, from, to, rootListDepth, tr) {
    var listItem = state.schema.nodes.listItem;
    var lifted = false;
    tr.doc.nodesBetween(from, to, function (node, pos) {
        if (!lifted && node.type === listItem && pos > from) {
            lifted = true;
            var listDepth = rootListDepth + 3;
            while (listDepth > rootListDepth + 2) {
                var start = tr.doc.resolve(tr.mapping.map(pos));
                listDepth = start.depth;
                var end = tr.doc.resolve(tr.mapping.map(pos + node.textContent.length));
                var sel = new prosemirror_state_1.TextSelection(start, end);
                tr = liftListItem(state, sel, tr);
            }
        }
    });
    return tr;
}
exports.liftFollowingList = liftFollowingList;
// The function will list paragraphs in selection out to level 1 below root list.
function liftSelectionList(state, tr) {
    var _a = state.selection, from = _a.from, to = _a.to;
    var paragraph = state.schema.nodes.paragraph;
    var listCol = [];
    tr.doc.nodesBetween(from, to, function (node, pos) {
        if (node.type === paragraph) {
            listCol.push({ node: node, pos: pos });
        }
    });
    for (var i = listCol.length - 1; i >= 0; i--) {
        var paragraph_1 = listCol[i];
        var start = tr.doc.resolve(tr.mapping.map(paragraph_1.pos));
        if (start.depth > 0) {
            var end = void 0;
            if (paragraph_1.node.textContent && paragraph_1.node.textContent.length > 0) {
                end = tr.doc.resolve(tr.mapping.map(paragraph_1.pos + paragraph_1.node.textContent.length));
            }
            else {
                end = tr.doc.resolve(tr.mapping.map(paragraph_1.pos + 1));
            }
            var range = start.blockRange(end);
            if (range) {
                tr.lift(range, utils_1.getListLiftTarget(state.schema, start));
            }
        }
    }
    return tr;
}
exports.liftSelectionList = liftSelectionList;
//# sourceMappingURL=transforms.js.map