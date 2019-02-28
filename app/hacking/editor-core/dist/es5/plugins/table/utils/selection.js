"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_tables_1 = require("prosemirror-tables");
var prosemirror_utils_1 = require("prosemirror-utils");
exports.isHeaderRowSelected = function (state) {
    var isSelected = false;
    if (prosemirror_utils_1.isCellSelection(state.selection)) {
        state.selection.forEachCell(function (cell) {
            if (cell.type === state.schema.nodes.tableHeader) {
                isSelected = true;
            }
        });
    }
    return isSelected;
};
exports.isSelectionUpdated = function (oldSelection, newSelection) {
    return prosemirror_utils_1.isCellSelection(oldSelection) !== prosemirror_utils_1.isCellSelection(newSelection) ||
        (prosemirror_utils_1.isCellSelection(oldSelection) &&
            prosemirror_utils_1.isCellSelection(newSelection) &&
            oldSelection.ranges !== newSelection.ranges);
};
var isRectangularCellSelection = function (selection, rect) {
    var table = prosemirror_utils_1.findTable(selection);
    if (!table) {
        return true;
    }
    var _a = prosemirror_tables_1.TableMap.get(table.node), width = _a.width, height = _a.height, map = _a.map;
    var indexTop = rect.top * width + rect.left;
    var indexLeft = indexTop;
    var indexBottom = (rect.bottom - 1) * width + rect.left;
    var indexRight = indexTop + (rect.right - rect.left - 1);
    for (var i = rect.top; i < rect.bottom; i++) {
        if ((rect.left > 0 && map[indexLeft] === map[indexLeft - 1]) ||
            (rect.right < width && map[indexRight] === map[indexRight + 1])) {
            return false;
        }
        indexLeft += width;
        indexRight += width;
    }
    for (var i = rect.left; i < rect.right; i++) {
        if ((rect.top > 0 && map[indexTop] === map[indexTop - width]) ||
            (rect.bottom < height && map[indexBottom] === map[indexBottom + width])) {
            return false;
        }
        indexTop++;
        indexBottom++;
    }
    return true;
};
exports.normalizeSelection = function (tr) {
    var selection = tr.selection;
    var rect = prosemirror_utils_1.getSelectionRect(selection);
    if (!rect ||
        !(selection instanceof prosemirror_tables_1.CellSelection) ||
        isRectangularCellSelection(selection, rect)) {
        return tr;
    }
    if (selection.isColSelection()) {
        var $anchor = prosemirror_utils_1.getSelectionRangeInColumn(rect.left)(tr).$anchor;
        var $head = prosemirror_utils_1.getSelectionRangeInColumn(rect.right - 1)(tr).$head;
        return tr.setSelection(new prosemirror_tables_1.CellSelection($anchor, $head));
    }
    if (selection.isRowSelection()) {
        var $anchor = prosemirror_utils_1.getSelectionRangeInRow(rect.top)(tr).$anchor;
        var $head = prosemirror_utils_1.getSelectionRangeInRow(rect.bottom - 1)(tr).$head;
        return tr.setSelection(new prosemirror_tables_1.CellSelection($anchor, $head));
    }
    return tr;
};
//# sourceMappingURL=selection.js.map