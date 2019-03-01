"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("../pm-plugins/main");
var disabled_1 = require("../utils/disabled");
exports.toggleColor = function (color) { return function (state, dispatch) {
    var textColor = state.schema.marks.textColor;
    var tr = state.tr;
    var disabledState = disabled_1.getDisabledState(state);
    if (disabledState) {
        dispatch(tr.setMeta(main_1.pluginKey, { action: main_1.ACTIONS.DISABLE }));
        return false;
    }
    var _a = state.selection, ranges = _a.ranges, $cursor = _a.$cursor;
    if ($cursor) {
        var mark = textColor.create({ color: color });
        tr = tr.addStoredMark(mark);
        dispatch(tr.setMeta(main_1.pluginKey, { action: main_1.ACTIONS.SET_COLOR, color: color }));
        return true;
    }
    for (var i = 0; i < ranges.length; i++) {
        var _b = ranges[i], $from = _b.$from, $to = _b.$to;
        tr = tr.addMark($from.pos, $to.pos, textColor.create({ color: color }));
    }
    tr = tr.scrollIntoView();
    dispatch(tr.setMeta(main_1.pluginKey, { action: main_1.ACTIONS.SET_COLOR, color: color }));
    return true;
}; };
//# sourceMappingURL=toggle-color.js.map