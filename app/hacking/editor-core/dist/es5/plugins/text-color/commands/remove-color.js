"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("../pm-plugins/main");
exports.removeColor = function () { return function (state, dispatch) {
    var textColor = state.schema.marks.textColor;
    var _a = state.selection, from = _a.from, to = _a.to, $cursor = _a.$cursor;
    var tr = state.tr;
    if ($cursor) {
        tr = state.tr.removeStoredMark(textColor);
    }
    else {
        tr = state.tr.removeMark(from, to, textColor);
    }
    dispatch(tr.setMeta(main_1.pluginKey, { action: main_1.ACTIONS.RESET_COLOR }));
}; };
//# sourceMappingURL=remove-color.js.map