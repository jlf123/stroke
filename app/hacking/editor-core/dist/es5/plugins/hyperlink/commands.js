"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("./utils");
var main_1 = require("./pm-plugins/main");
var prosemirror_state_1 = require("prosemirror-state");
var commands_1 = require("../../utils/commands");
var isLinkAtPos = function (pos) { return function (state) {
    var text = state.doc.nodeAt(pos);
    if (text) {
        var link = state.schema.marks.link;
        return !!link.isInSet(text.marks);
    }
    return false;
}; };
function setLinkHref(pos, href) {
    return commands_1.filter(isLinkAtPos(pos), function (state, dispatch) {
        var node = state.doc.nodeAt(pos);
        var link = state.schema.marks.link;
        var mark = link.isInSet(node.marks);
        var url = utils_1.normalizeUrl(href);
        var tr = state.tr.removeMark(pos, pos + node.nodeSize, mark);
        if (href.trim()) {
            tr.addMark(pos, pos + node.nodeSize, link.create(tslib_1.__assign({}, mark.attrs, { href: url })));
        }
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    });
}
exports.setLinkHref = setLinkHref;
function setLinkText(pos, text) {
    return commands_1.filter(isLinkAtPos(pos), function (state, dispatch) {
        var node = state.doc.nodeAt(pos);
        var link = state.schema.marks.link;
        var mark = link.isInSet(node.marks);
        if (node && text && text !== node.text) {
            var tr = state.tr;
            tr.insertText(text, pos, pos + node.nodeSize);
            tr.addMark(pos, pos + text.length, mark);
            if (dispatch) {
                dispatch(tr);
            }
            return true;
        }
        return false;
    });
}
exports.setLinkText = setLinkText;
function insertLink(from, to, href, text) {
    return commands_1.filter(main_1.canLinkBeCreatedInRange(from, to), function (state, dispatch) {
        var link = state.schema.marks.link;
        if (href.trim()) {
            var tr = state.tr;
            if (from === to) {
                var textContent = text || href;
                tr.insertText(textContent, from, to);
                tr.addMark(from, from + textContent.length, link.create({ href: utils_1.normalizeUrl(href) }));
            }
            else {
                tr.addMark(from, to, link.create({ href: utils_1.normalizeUrl(href) }));
                tr.setSelection(prosemirror_state_1.Selection.near(tr.doc.resolve(to)));
            }
            if (dispatch) {
                dispatch(tr);
            }
            return true;
        }
        return false;
    });
}
exports.insertLink = insertLink;
function removeLink(pos) {
    return setLinkHref(pos, '');
}
exports.removeLink = removeLink;
function showLinkToolbar() {
    return function (state, dispatch) {
        if (dispatch) {
            dispatch(state.tr.setMeta(main_1.stateKey, main_1.LinkAction.SHOW_INSERT_TOOLBAR));
        }
        return true;
    };
}
exports.showLinkToolbar = showLinkToolbar;
function hideLinkToolbar() {
    return function (state, dispatch) {
        if (dispatch) {
            dispatch(state.tr.setMeta(main_1.stateKey, main_1.LinkAction.HIDE_TOOLBAR));
        }
        return true;
    };
}
exports.hideLinkToolbar = hideLinkToolbar;
//# sourceMappingURL=commands.js.map