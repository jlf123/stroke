"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_view_1 = require("prosemirror-view");
var theme_1 = require("@atlaskit/theme");
var editor_common_1 = require("@atlaskit/editor-common");
var R400 = theme_1.colors.R400, Y400 = theme_1.colors.Y400, G400 = theme_1.colors.G400, B400 = theme_1.colors.B400, T400 = theme_1.colors.T400, P400 = theme_1.colors.P400, N800 = theme_1.colors.N800;
exports.colors = [R400, Y400, G400, T400, B400, P400, N800].map(function (solid) { return ({
    solid: solid,
    selection: editor_common_1.hexToRgba(solid, 0.2),
}); });
// tslint:disable:no-bitwise
exports.getAvatarColor = function (str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash = hash & hash;
    }
    var index = Math.abs(hash) % exports.colors.length;
    return { index: index, color: exports.colors[index] };
};
// tslint:enable:no-bitwise
exports.findPointers = function (id, decorations) {
    return decorations
        .find()
        .reduce(function (arr, deco) {
        return deco.spec.pointer.sessionId === id ? arr.concat(deco) : arr;
    }, []);
};
function style(options) {
    var color = (options && options.color) || 'black';
    return "border-left: 1px solid " + color + "; border-right: 1px solid " + color + "; margin-right: -2px;";
}
exports.createTelepointers = function (from, to, sessionId, isSelection, initial) {
    var decorations = [];
    var avatarColor = exports.getAvatarColor(sessionId);
    var color = avatarColor.index.toString();
    if (isSelection) {
        var className = "telepointer color-" + color + " telepointer-selection";
        decorations.push(prosemirror_view_1.Decoration.inline(from, to, { class: className, 'data-initial': initial }, { pointer: { sessionId: sessionId } }));
    }
    var cursor = document.createElement('span');
    cursor.textContent = '\u200b';
    cursor.className = "telepointer color-" + color + " telepointer-selection-badge";
    cursor.style.cssText = style({ color: avatarColor.color.solid }) + ";";
    cursor.setAttribute('data-initial', initial);
    return decorations.concat(prosemirror_view_1.Decoration.widget(to, cursor, { pointer: { sessionId: sessionId } }));
};
exports.replaceDocument = function (doc, state, version, options) {
    var schema = state.schema, tr = state.tr;
    var content = (doc.content || []).map(function (child) { return schema.nodeFromJSON(child); });
    if (content.length) {
        tr.setMeta('addToHistory', false);
        tr.replaceWith(0, state.doc.nodeSize - 2, content);
        tr.setSelection(prosemirror_state_1.Selection.atStart(tr.doc));
        if (typeof version !== undefined && (options && options.useNativePlugin)) {
            var collabState = { version: version, unconfirmed: [] };
            tr.setMeta('collab$', collabState);
        }
    }
    return tr;
};
//# sourceMappingURL=utils.js.map