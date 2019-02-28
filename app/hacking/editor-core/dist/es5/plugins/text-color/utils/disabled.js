"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mark_1 = require("../../../utils/mark");
exports.getDisabledState = function (state) {
    var textColor = state.schema.marks.textColor;
    if (textColor) {
        var _a = state.selection, empty = _a.empty, ranges = _a.ranges, $cursor = _a.$cursor;
        if ((empty && !$cursor) ||
            mark_1.isMarkAllowedInRange(state.doc, ranges, textColor) === false) {
            return true;
        }
        if (mark_1.isMarkExcluded(textColor, state.storedMarks || ($cursor && $cursor.marks()))) {
            return true;
        }
        return false;
    }
    return true;
};
//# sourceMappingURL=disabled.js.map