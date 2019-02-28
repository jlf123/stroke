"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var utils_1 = require("../../../utils");
exports.isInsertColumnButton = function (node) {
    var cl = node.classList;
    return (cl.contains(types_1.TableCssClassName.CONTROLS_INSERT_COLUMN) ||
        utils_1.closestElement(node, "." + types_1.TableCssClassName.CONTROLS_INSERT_COLUMN) ||
        (cl.contains(types_1.TableCssClassName.CONTROLS_BUTTON_OVERLAY) &&
            utils_1.closestElement(node, "." + types_1.TableCssClassName.COLUMN_CONTROLS)));
};
exports.isInsertRowButton = function (node) {
    var cl = node.classList;
    return (cl.contains(types_1.TableCssClassName.CONTROLS_INSERT_ROW) ||
        utils_1.closestElement(node, "." + types_1.TableCssClassName.CONTROLS_INSERT_ROW) ||
        (cl.contains(types_1.TableCssClassName.CONTROLS_BUTTON_OVERLAY) &&
            utils_1.closestElement(node, "." + types_1.TableCssClassName.ROW_CONTROLS)));
};
exports.getIndex = function (target) {
    return parseInt(target.getAttribute('data-index') || '-1', 10);
};
//# sourceMappingURL=dom.js.map