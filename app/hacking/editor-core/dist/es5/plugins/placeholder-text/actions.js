"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
exports.showPlaceholderFloatingToolbar = function (state, dispatch) {
    var tr = state.tr;
    if (!state.selection.empty) {
        tr.deleteSelection();
    }
    tr.setMeta(index_1.pluginKey, { showInsertPanelAt: tr.selection.anchor });
    tr.scrollIntoView();
    dispatch(tr);
    return true;
};
exports.insertPlaceholderTextAtSelection = function (value) { return function (state, dispatch) {
    dispatch(state.tr
        .replaceSelectionWith(state.schema.nodes.placeholder.createChecked({ text: value }))
        .setMeta(index_1.pluginKey, { showInsertPanelAt: null })
        .scrollIntoView());
    return true;
}; };
exports.hidePlaceholderFloatingToolbar = function (state, dispatch) {
    dispatch(state.tr.setMeta(index_1.pluginKey, { showInsertPanelAt: null }));
    return true;
};
//# sourceMappingURL=actions.js.map