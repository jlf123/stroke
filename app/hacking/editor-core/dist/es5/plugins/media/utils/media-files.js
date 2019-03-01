"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_model_1 = require("prosemirror-model");
var utils_1 = require("../../../utils");
var media_common_1 = require("./media-common");
var prosemirror_utils_1 = require("prosemirror-utils");
/** These nodes don't allow non images to exist inside them */
var nonImagesBannedNodes = ['listItem'];
exports.insertMediaGroupNode = function (view, mediaStates, collection) {
    var state = view.state, dispatch = view.dispatch;
    var tr = state.tr, schema = state.schema;
    var _a = schema.nodes, media = _a.media, paragraph = _a.paragraph;
    if (!collection || !media || !mediaStates.length) {
        return;
    }
    var mediaNodes = createMediaFileNodes(mediaStates, collection, media);
    var mediaInsertPos = findMediaInsertPos(state);
    var resolvedInsertPos = tr.doc.resolve(mediaInsertPos);
    var parent = resolvedInsertPos.parent;
    var grandParent = state.selection.$from.node(-1);
    var selectionParent = state.selection.$anchor.node();
    var shouldSplit = selectionParent &&
        selectionParent.type !== schema.nodes.mediaGroup &&
        grandParent &&
        grandParent.type.validContent(prosemirror_model_1.Fragment.from(state.schema.nodes.mediaGroup.createChecked({}, mediaNodes)));
    // insert a paragraph after if reach the end of doc
    // and there is no media group in the front or selection is a non media block node
    var shouldAppendParagraph = utils_1.isTableCell(state) ||
        utils_1.isInListItem(state) ||
        (utils_1.atTheEndOfDoc(state) &&
            (!media_common_1.posOfPrecedingMediaGroup(state) ||
                media_common_1.isSelectionNonMediaBlockNode(state)));
    if (shouldSplit) {
        var content_1 = shouldAppendParagraph
            ? mediaNodes.concat(paragraph.create())
            : mediaNodes;
        // delete the selection or empty paragraph
        var deleteRange = findDeleteRange(state);
        if (!deleteRange) {
            tr.insert(mediaInsertPos, content_1);
        }
        else if (mediaInsertPos <= deleteRange.start) {
            tr.deleteRange(deleteRange.start, deleteRange.end).insert(mediaInsertPos, content_1);
        }
        else {
            tr.insert(mediaInsertPos, content_1).deleteRange(deleteRange.start, deleteRange.end);
        }
        dispatch(tr);
        setSelectionAfterMediaInsertion(view, mediaInsertPos);
        return;
    }
    var content = parent.type === schema.nodes.mediaGroup
        ? mediaNodes // If parent is a mediaGroup do not wrap items again.
        : [schema.nodes.mediaGroup.createChecked({}, mediaNodes)];
    // Don't append new paragraph when adding media to a existing mediaGroup
    if (shouldAppendParagraph && parent.type !== schema.nodes.mediaGroup) {
        content.push(paragraph.create());
    }
    dispatch(prosemirror_utils_1.safeInsert(prosemirror_model_1.Fragment.fromArray(content), mediaInsertPos)(tr));
};
var createMediaFileNodes = function (mediaStates, collection, media) {
    var nodes = mediaStates.map(function (mediaState) {
        var id = mediaState.id;
        var node = media.create({
            id: id,
            type: 'file',
            collection: collection,
            __key: id,
        });
        media_common_1.copyOptionalAttrsFromMediaState(mediaState, node);
        return node;
    });
    return nodes;
};
var findMediaInsertPos = function (state) {
    var _a = state.selection, $from = _a.$from, $to = _a.$to;
    var nearbyMediaGroupPos = media_common_1.posOfMediaGroupNearby(state);
    if (nearbyMediaGroupPos &&
        (!media_common_1.isSelectionNonMediaBlockNode(state) ||
            ($from.pos < nearbyMediaGroupPos && $to.pos < nearbyMediaGroupPos))) {
        return nearbyMediaGroupPos;
    }
    if (media_common_1.isSelectionNonMediaBlockNode(state)) {
        return $to.pos;
    }
    if (utils_1.atTheEndOfBlock(state)) {
        return $to.pos + 1;
    }
    if (utils_1.atTheBeginningOfBlock(state)) {
        return $from.pos - 1;
    }
    return $to.pos;
};
var findDeleteRange = function (state) {
    var _a = state.selection, $from = _a.$from, $to = _a.$to;
    if (media_common_1.posOfParentMediaGroup(state)) {
        return;
    }
    if (!media_common_1.isInsidePotentialEmptyParagraph(state) || media_common_1.posOfMediaGroupNearby(state)) {
        return range($from.pos, $to.pos);
    }
    return range(utils_1.startPositionOfParent($from) - 1, utils_1.endPositionOfParent($to));
};
var range = function (start, end) {
    if (end === void 0) { end = start; }
    return { start: start, end: end };
};
var setSelectionAfterMediaInsertion = function (view, insertPos) {
    var state = view.state;
    var doc = state.doc;
    var mediaPos = media_common_1.posOfMediaGroupNearby(state);
    if (!mediaPos) {
        return;
    }
    var $mediaPos = doc.resolve(mediaPos);
    var endOfMediaGroup = utils_1.endPositionOfParent($mediaPos);
    if (endOfMediaGroup + 1 >= doc.nodeSize - 1) {
        // if nothing after the media group, fallback to select the newest uploaded media item
        utils_1.setNodeSelection(view, mediaPos);
    }
    else {
        utils_1.setTextSelection(view, endOfMediaGroup + 1);
    }
};
exports.isNonImagesBanned = function (node) {
    return node && nonImagesBannedNodes.indexOf(node.type.name) > -1;
};
//# sourceMappingURL=media-files.js.map