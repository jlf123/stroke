import * as tslib_1 from "tslib";
import { normalizeUrl } from './utils';
import { stateKey, LinkAction, canLinkBeCreatedInRange, } from './pm-plugins/main';
import { Selection } from 'prosemirror-state';
import { filter } from '../../utils/commands';
var isLinkAtPos = function (pos) { return function (state) {
    var text = state.doc.nodeAt(pos);
    if (text) {
        var link = state.schema.marks.link;
        return !!link.isInSet(text.marks);
    }
    return false;
}; };
export function setLinkHref(pos, href) {
    return filter(isLinkAtPos(pos), function (state, dispatch) {
        var node = state.doc.nodeAt(pos);
        var link = state.schema.marks.link;
        var mark = link.isInSet(node.marks);
        var url = normalizeUrl(href);
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
export function setLinkText(pos, text) {
    return filter(isLinkAtPos(pos), function (state, dispatch) {
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
export function insertLink(from, to, href, text) {
    return filter(canLinkBeCreatedInRange(from, to), function (state, dispatch) {
        var link = state.schema.marks.link;
        if (href.trim()) {
            var tr = state.tr;
            if (from === to) {
                var textContent = text || href;
                tr.insertText(textContent, from, to);
                tr.addMark(from, from + textContent.length, link.create({ href: normalizeUrl(href) }));
            }
            else {
                tr.addMark(from, to, link.create({ href: normalizeUrl(href) }));
                tr.setSelection(Selection.near(tr.doc.resolve(to)));
            }
            if (dispatch) {
                dispatch(tr);
            }
            return true;
        }
        return false;
    });
}
export function removeLink(pos) {
    return setLinkHref(pos, '');
}
export function showLinkToolbar() {
    return function (state, dispatch) {
        if (dispatch) {
            dispatch(state.tr.setMeta(stateKey, LinkAction.SHOW_INSERT_TOOLBAR));
        }
        return true;
    };
}
export function hideLinkToolbar() {
    return function (state, dispatch) {
        if (dispatch) {
            dispatch(state.tr.setMeta(stateKey, LinkAction.HIDE_TOOLBAR));
        }
        return true;
    };
}
//# sourceMappingURL=commands.js.map