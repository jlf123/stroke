"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
var main_1 = require("./main");
var actions_1 = require("./actions");
var utils_1 = require("../utils");
var utils_2 = require("../../../utils");
exports.replaceQueuedUrlWithCard = function (url, cardData) { return function (editorState, dispatch) {
    var state = main_1.pluginKey.getState(editorState);
    if (!state) {
        return false;
    }
    // find the requests for this URL
    var requests = state.requests.filter(function (req) { return req.url === url; });
    // try to transform response to ADF
    var schema = editorState.schema;
    var cardAdf = utils_2.processRawValue(schema, cardData);
    var tr = editorState.tr;
    if (cardAdf) {
        requests.forEach(function (request) {
            // replace all the outstanding links with their cards
            var pos = tr.mapping.map(request.pos);
            var node = tr.doc.nodeAt(pos);
            if (!node || !node.type.isText) {
                return;
            }
            // not a link anymore
            var linkMark = node.marks.find(function (mark) { return mark.type.name === 'link'; });
            if (!linkMark) {
                return;
            }
            var textSlice = node.text;
            if (linkMark.attrs.href !== url || textSlice !== url) {
                return;
            }
            tr = tr.replaceWith(pos, pos + url.length, cardAdf);
        });
    }
    if (dispatch) {
        dispatch(actions_1.resolveCard(url)(tr));
    }
    return true;
}; };
exports.queueCardsFromChangedTr = function (state, tr) {
    var schema = state.schema;
    var link = schema.marks.link;
    var stepRange = utils_2.getStepRange(tr);
    if (!stepRange) {
        // no steps mutate this document, do nothing
        return tr;
    }
    var requests = [];
    tr.doc.nodesBetween(stepRange.from, stepRange.to, function (node, pos) {
        if (!node.isText) {
            return true;
        }
        var linkMark = node.marks.find(function (mark) { return mark.type === link; });
        if (linkMark) {
            // don't bother queueing nodes that have user-defined text for a link
            if (node.text !== linkMark.attrs.href) {
                return false;
            }
            requests.push({
                url: linkMark.attrs.href,
                pos: pos,
                appearance: 'inline',
            });
        }
        return false;
    });
    return actions_1.queueCards(requests)(tr);
};
exports.changeSelectedCardToLink = function (state, dispatch) {
    var selectedNode = state.selection instanceof prosemirror_state_1.NodeSelection && state.selection.node;
    if (!selectedNode) {
        return false;
    }
    var link = state.schema.marks.link;
    var tr = state.tr.replaceSelectionWith(state.schema.text(selectedNode.attrs.url, [
        link.create({ href: selectedNode.attrs.url }),
    ]), false);
    if (dispatch) {
        dispatch(tr.scrollIntoView());
    }
    return true;
};
exports.setSelectedCardAppearance = function (appearance) { return function (state, dispatch) {
    var selectedNode = state.selection instanceof prosemirror_state_1.NodeSelection && state.selection.node;
    if (!selectedNode) {
        return false;
    }
    if (utils_1.appearanceForNodeType(selectedNode.type) === appearance) {
        return false;
    }
    var _a = state.schema.nodes, inlineCard = _a.inlineCard, blockCard = _a.blockCard;
    var pos = state.selection.from;
    if (appearance === 'block' && state.selection.$from.parent.childCount === 1) {
        var tr_1 = state.tr.replaceRangeWith(pos - 1, pos + selectedNode.nodeSize + 1, blockCard.createChecked(selectedNode.attrs, undefined, selectedNode.marks));
        if (dispatch) {
            dispatch(tr_1.scrollIntoView());
        }
        return true;
    }
    var tr = state.tr.setNodeMarkup(pos, appearance === 'inline' ? inlineCard : blockCard, selectedNode.attrs, selectedNode.marks);
    if (dispatch) {
        dispatch(tr.scrollIntoView());
    }
    return true;
}; };
//# sourceMappingURL=doc.js.map