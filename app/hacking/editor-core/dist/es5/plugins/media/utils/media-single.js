"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_model_1 = require("prosemirror-model");
var utils_1 = require("../../../utils");
var commands_1 = require("../../../commands");
var media_common_1 = require("../utils/media-common");
var prosemirror_utils_1 = require("prosemirror-utils");
exports.insertMediaAsMediaSingle = function (view, node) {
    var state = view.state, dispatch = view.dispatch;
    var _a = state.schema.nodes, mediaSingle = _a.mediaSingle, media = _a.media;
    if (!mediaSingle) {
        return false;
    }
    // if not an image type media node
    if (node.type !== media ||
        (!utils_1.isImage(node.attrs.__fileMimeType) && node.attrs.type !== 'external')) {
        return false;
    }
    var mediaSingleNode = mediaSingle.create({}, node);
    var nodes = [mediaSingleNode];
    return commands_1.insertNodesEndWithNewParagraph(nodes)(state, dispatch);
};
exports.insertMediaSingleNode = function (view, mediaState, collection) {
    if (collection === undefined) {
        return false;
    }
    var state = view.state, dispatch = view.dispatch;
    var grandParent = state.selection.$from.node(-1);
    var node = exports.createMediaSingleNode(state.schema, collection)(mediaState);
    var shouldSplit = grandParent && grandParent.type.validContent(prosemirror_model_1.Fragment.from(node));
    if (shouldSplit) {
        commands_1.insertNodesEndWithNewParagraph([node])(state, dispatch);
    }
    else {
        dispatch(prosemirror_utils_1.safeInsert(commands_1.shouldAppendParagraphAfterBlockNode(view.state)
            ? prosemirror_model_1.Fragment.fromArray([node, state.schema.nodes.paragraph.create()])
            : node)(state.tr));
    }
    return true;
};
exports.createMediaSingleNode = function (schema, collection) { return function (mediaState) {
    var id = mediaState.id, dimensions = mediaState.dimensions, _a = mediaState.scaleFactor, scaleFactor = _a === void 0 ? 1 : _a;
    var _b = dimensions || {
        height: undefined,
        width: undefined,
    }, width = _b.width, height = _b.height;
    var _c = schema.nodes, media = _c.media, mediaSingle = _c.mediaSingle;
    var mediaNode = media.create({
        id: id,
        type: 'file',
        collection: collection,
        width: width / scaleFactor,
        height: height / scaleFactor,
        __key: id,
    });
    media_common_1.copyOptionalAttrsFromMediaState(mediaState, mediaNode);
    return mediaSingle.create({}, mediaNode);
}; };
//# sourceMappingURL=media-single.js.map