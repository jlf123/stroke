"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_commands_1 = require("prosemirror-commands");
var prosemirror_model_1 = require("prosemirror-model");
var prosemirror_state_1 = require("prosemirror-state");
var commands_1 = require("../../../commands");
var utils_1 = require("../../../utils");
exports.posOfMediaGroupNearby = function (state) {
    return (exports.posOfParentMediaGroup(state) ||
        posOfFollowingMediaGroup(state) ||
        exports.posOfPrecedingMediaGroup(state));
};
exports.isSelectionNonMediaBlockNode = function (state) {
    var node = state.selection.node;
    return node && node.type !== state.schema.nodes.media && node.isBlock;
};
exports.posOfPrecedingMediaGroup = function (state) {
    if (!utils_1.atTheBeginningOfBlock(state)) {
        return;
    }
    return posOfMediaGroupAbove(state, state.selection.$from);
};
var posOfFollowingMediaGroup = function (state) {
    if (!utils_1.atTheEndOfBlock(state)) {
        return;
    }
    return exports.posOfMediaGroupBelow(state, state.selection.$to);
};
var posOfMediaGroupAbove = function (state, $pos) {
    var adjacentPos;
    var adjacentNode;
    if (exports.isSelectionNonMediaBlockNode(state)) {
        adjacentPos = $pos.pos;
        adjacentNode = $pos.nodeBefore;
    }
    else {
        adjacentPos = utils_1.startPositionOfParent($pos) - 1;
        adjacentNode = state.doc.resolve(adjacentPos).nodeBefore;
    }
    if (adjacentNode && adjacentNode.type === state.schema.nodes.mediaGroup) {
        return adjacentPos - adjacentNode.nodeSize + 1;
    }
};
/**
 * Determine whether the cursor is inside empty paragraph
 * or the selection is the entire paragraph
 */
exports.isInsidePotentialEmptyParagraph = function (state) {
    var $from = state.selection.$from;
    return ($from.parent.type === state.schema.nodes.paragraph &&
        utils_1.atTheBeginningOfBlock(state) &&
        utils_1.atTheEndOfBlock(state));
};
exports.posOfMediaGroupBelow = function (state, $pos, prepend) {
    if (prepend === void 0) { prepend = true; }
    var adjacentPos;
    var adjacentNode;
    if (exports.isSelectionNonMediaBlockNode(state)) {
        adjacentPos = $pos.pos;
        adjacentNode = $pos.nodeAfter;
    }
    else {
        adjacentPos = utils_1.endPositionOfParent($pos);
        adjacentNode = state.doc.nodeAt(adjacentPos);
    }
    if (adjacentNode && adjacentNode.type === state.schema.nodes.mediaGroup) {
        return prepend ? adjacentPos + 1 : adjacentPos + adjacentNode.nodeSize - 1;
    }
};
exports.posOfParentMediaGroup = function (state, $pos, prepend) {
    if (prepend === void 0) { prepend = false; }
    var $from = state.selection.$from;
    $pos = $pos || $from;
    if ($pos.parent.type === state.schema.nodes.mediaGroup) {
        return prepend
            ? utils_1.startPositionOfParent($pos)
            : utils_1.endPositionOfParent($pos) - 1;
    }
};
/**
 * The function will return the position after current selection where mediaGroup can be inserted.
 */
function endPositionForMedia(state, resolvedPos) {
    var mediaGroup = state.schema.nodes.mediaGroup;
    var i = resolvedPos.depth;
    for (; i > 1; i--) {
        var nodeType = resolvedPos.node(i).type;
        if (nodeType.validContent(prosemirror_model_1.Fragment.from(mediaGroup.create()))) {
            break;
        }
    }
    return resolvedPos.end(i) + 1;
}
exports.endPositionForMedia = endPositionForMedia;
exports.removeMediaNode = function (view, node, getPos) {
    var id = node.attrs.id;
    var state = view.state;
    var tr = state.tr, selection = state.selection, doc = state.doc;
    var currentMediaNodePos = getPos();
    tr.deleteRange(currentMediaNodePos, currentMediaNodePos + node.nodeSize);
    if (utils_1.isTemporary(id)) {
        tr.setMeta('addToHistory', false);
    }
    view.dispatch(tr);
    var $currentMediaNodePos = doc.resolve(currentMediaNodePos);
    var isLastMediaNode = $currentMediaNodePos.index() === $currentMediaNodePos.parent.childCount - 1;
    // If deleting a selected media node, we need to tell where the cursor to go next.
    // Prosemirror didn't gave us the behaviour of moving left if the media node is not the last one.
    // So we handle it ourselves.
    if (selection.from === currentMediaNodePos &&
        !isLastMediaNode &&
        !utils_1.atTheBeginningOfDoc(state)) {
        utils_1.moveLeft(view);
    }
};
exports.splitMediaGroup = function (view) {
    var selection = view.state.selection;
    // if selection is not a media node, do nothing.
    if (!(selection instanceof prosemirror_state_1.NodeSelection) ||
        selection.node.type !== view.state.schema.nodes.media) {
        return false;
    }
    prosemirror_commands_1.deleteSelection(view.state, view.dispatch);
    if (selection.$to.nodeAfter) {
        prosemirror_commands_1.splitBlock(view.state, view.dispatch);
        commands_1.createParagraphNear(false)(view.state, view.dispatch);
    }
    else {
        commands_1.createNewParagraphBelow(view.state, view.dispatch);
    }
    return true;
};
var isOptionalAttr = function (attr) {
    return attr.length > 1 && attr[0] === '_' && attr[1] === '_';
};
exports.copyOptionalAttrsFromMediaState = function (mediaState, node) {
    Object.keys(node.attrs)
        .filter(isOptionalAttr)
        .forEach(function (key) {
        var mediaStateKey = key.substring(2);
        var attrValue = mediaState[mediaStateKey];
        if (attrValue !== undefined) {
            node.attrs[key] = attrValue;
        }
    });
};
//# sourceMappingURL=media-common.js.map