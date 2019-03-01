"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keymaps = require("../keymaps");
var InsertType;
(function (InsertType) {
    InsertType["SELECTED"] = "selected";
    InsertType["ENTER"] = "enter";
    InsertType["SHIFT_ENTER"] = "shift-enter";
    InsertType["SPACE"] = "space";
    InsertType["TAB"] = "tab";
})(InsertType = exports.InsertType || (exports.InsertType = {}));
function getInsertTypeForKey(key) {
    if (key === keymaps.space.common) {
        return InsertType.SPACE;
    }
    if (key === keymaps.enter.common) {
        return InsertType.ENTER;
    }
    if (key === keymaps.tab.common) {
        return InsertType.TAB;
    }
    if (key === keymaps.insertNewLine.common) {
        return InsertType.SHIFT_ENTER;
    }
    return undefined;
}
exports.getInsertTypeForKey = getInsertTypeForKey;
//# sourceMappingURL=fabric-analytics-helper.js.map