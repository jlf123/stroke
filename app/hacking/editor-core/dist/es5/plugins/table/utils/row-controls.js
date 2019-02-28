"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_utils_1 = require("prosemirror-utils");
var prosemirror_tables_1 = require("prosemirror-tables");
var styles_1 = require("../ui/styles");
exports.getRowHeights = function (tableRef) {
    var heights = [];
    var rows = tableRef.querySelectorAll('tr');
    for (var i = 0, count = rows.length; i < count; i++) {
        heights[i] = rows[i].offsetHeight + 1;
    }
    return heights;
};
exports.isRowInsertButtonVisible = function (index, selection) {
    var rect = prosemirror_utils_1.getSelectionRect(selection);
    if (rect &&
        selection instanceof prosemirror_tables_1.CellSelection &&
        selection.isRowSelection() &&
        !prosemirror_utils_1.isTableSelected(selection) &&
        rect.bottom - index === index - rect.top) {
        return false;
    }
    return true;
};
exports.isRowDeleteButtonVisible = function (selection) {
    if (!prosemirror_utils_1.isTableSelected(selection) &&
        (selection instanceof prosemirror_tables_1.CellSelection && selection.isRowSelection())) {
        return true;
    }
    return false;
};
exports.getRowDeleteButtonParams = function (rowsHeights, selection) {
    var rect = prosemirror_utils_1.getSelectionRect(selection);
    if (!rect) {
        return null;
    }
    var height = 0;
    var offset = 0;
    // find the rows before the selection
    for (var i = 0; i < rect.top; i++) {
        var rowHeight = rowsHeights[i];
        if (rowHeight) {
            offset += rowHeight - 2;
        }
    }
    // these are the selected rows widths
    var indexes = [];
    for (var i = rect.top; i < rect.bottom; i++) {
        var rowHeight = rowsHeights[i];
        if (rowHeight) {
            height += rowHeight - 2;
            indexes.push(i);
        }
    }
    var top = offset + height / 2 - styles_1.tableDeleteButtonSize / 2;
    return { top: top, indexes: indexes };
};
exports.getRowsParams = function (rowsHeights) {
    var rows = [];
    for (var i = 0, count = rowsHeights.length; i < count; i++) {
        var height = rowsHeights[i];
        if (!height) {
            continue;
        }
        var endIndex = rowsHeights.length;
        for (var k = i + 1, count_1 = rowsHeights.length; k < count_1; k++) {
            if (rowsHeights[k]) {
                endIndex = k;
                break;
            }
        }
        rows.push({ startIndex: i, endIndex: endIndex, height: height });
    }
    return rows;
};
exports.getRowClassNames = function (index, selection, hoveredRows, isInDanger) {
    if (hoveredRows === void 0) { hoveredRows = []; }
    var classNames = [];
    if (prosemirror_utils_1.isRowSelected(index)(selection) || hoveredRows.indexOf(index) > -1) {
        classNames.push('active');
        if (isInDanger) {
            classNames.push('danger');
        }
    }
    return classNames.join(' ');
};
//# sourceMappingURL=row-controls.js.map