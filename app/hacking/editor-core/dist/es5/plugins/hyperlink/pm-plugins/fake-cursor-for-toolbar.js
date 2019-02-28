"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_view_1 = require("prosemirror-view");
var main_1 = require("./main");
var createTextCursor = function (pos) {
    var node = document.createElement('div');
    node.className = 'ProseMirror-fake-text-cursor';
    return prosemirror_view_1.Decoration.widget(pos, node);
};
var createTextSelection = function (from, to) {
    return prosemirror_view_1.Decoration.inline(from, to, { class: 'ProseMirror-fake-text-selection' });
};
var getInsertLinkToolbarState = function (editorState) {
    var state = main_1.stateKey.getState(editorState);
    if (state && state.activeLinkMark) {
        if (state.activeLinkMark.type === main_1.InsertStatus.INSERT_LINK_TOOLBAR) {
            return state.activeLinkMark;
        }
    }
    return undefined;
};
var fakeCursorToolbarPlugin = new prosemirror_state_1.Plugin({
    state: {
        init: function () {
            return prosemirror_view_1.DecorationSet.empty;
        },
        apply: function (tr, pluginState, oldState, newState) {
            var oldInsertToolbarState = getInsertLinkToolbarState(oldState);
            var insertToolbarState = getInsertLinkToolbarState(newState);
            // Map DecorationSet if it still refers to the same position in the document
            if (oldInsertToolbarState && insertToolbarState) {
                var from = insertToolbarState.from, to = insertToolbarState.to;
                var oldFrom = tr.mapping.map(oldInsertToolbarState.from);
                var oldTo = tr.mapping.map(oldInsertToolbarState.to);
                if (oldFrom === from && oldTo === to) {
                    return pluginState.map(tr.mapping, tr.doc);
                }
            }
            // Update DecorationSet if new insert toolbar, or if we have moved to a different position in the doc
            if (insertToolbarState) {
                var from = insertToolbarState.from, to = insertToolbarState.to;
                return prosemirror_view_1.DecorationSet.create(tr.doc, [
                    from === to ? createTextCursor(from) : createTextSelection(from, to),
                ]);
            }
            return prosemirror_view_1.DecorationSet.empty;
        },
    },
    props: {
        decorations: function (state) {
            return fakeCursorToolbarPlugin.getState(state);
        },
    },
});
exports.default = fakeCursorToolbarPlugin;
//# sourceMappingURL=fake-cursor-for-toolbar.js.map