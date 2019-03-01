"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_utils_1 = require("prosemirror-utils");
var prosemirror_tables_1 = require("prosemirror-tables");
var styles_1 = require("../ui/styles");
exports.getColumnsWidths = function (view) {
    var selection = view.state.selection;
    var widths = [];
    var table = prosemirror_utils_1.findTable(selection);
    if (table) {
        var map = prosemirror_tables_1.TableMap.get(table.node);
        var domAtPos = view.domAtPos.bind(view);
        for (var i = 0; i < map.width; i++) {
            var cells = prosemirror_utils_1.getCellsInColumn(i)(selection);
            var cell = cells[0];
            if (cell) {
                var cellRef = prosemirror_utils_1.findDomRefAtPos(cell.pos, domAtPos);
                widths[i] = cellRef.offsetWidth + 1;
                i += cell.node.attrs.colspan - 1;
            }
        }
    }
    return widths;
};
exports.isColumnInsertButtonVisible = function (index, selection) {
    var rect = prosemirror_utils_1.getSelectionRect(selection);
    if (rect &&
        selection instanceof prosemirror_tables_1.CellSelection &&
        selection.isColSelection() &&
        !prosemirror_utils_1.isTableSelected(selection) &&
        rect.right - index === index - rect.left) {
        return false;
    }
    return true;
};
exports.isColumnDeleteButtonVisible = function (selection) {
    if (!prosemirror_utils_1.isTableSelected(selection) &&
        (selection instanceof prosemirror_tables_1.CellSelection && selection.isColSelection())) {
        return true;
    }
    return false;
};
exports.getColumnDeleteButtonParams = function (columnsWidths, selection) {
    var rect = prosemirror_utils_1.getSelectionRect(selection);
    if (!rect) {
        return null;
    }
    var width = 0;
    var offset = 0;
    // find the columns before the selection
    for (var i = 0; i < rect.left; i++) {
        var colWidth = columnsWidths[i];
        if (colWidth) {
            offset += colWidth - 1;
        }
    }
    // these are the selected columns widths
    var indexes = [];
    for (var i = rect.left; i < rect.right; i++) {
        var colWidth = columnsWidths[i];
        if (colWidth) {
            width += colWidth;
            indexes.push(i);
        }
    }
    var left = offset + width / 2 - styles_1.tableDeleteButtonSize / 2;
    return { left: left, indexes: indexes };
};
exports.getColumnsParams = function (columnsWidths) {
    var columns = [];
    for (var i = 0, count = columnsWidths.length; i < count; i++) {
        var width = columnsWidths[i];
        if (!width) {
            continue;
        }
        var endIndex = columnsWidths.length;
        for (var k = i + 1, count_1 = columnsWidths.length; k < count_1; k++) {
            if (columnsWidths[k]) {
                endIndex = k;
                break;
            }
        }
        columns.push({ startIndex: i, endIndex: endIndex, width: width });
    }
    return columns;
};
exports.getColumnClassNames = function (index, selection, hoveredColumns, isInDanger) {
    if (hoveredColumns === void 0) { hoveredColumns = []; }
    var classNames = [];
    if (prosemirror_utils_1.isColumnSelected(index)(selection) ||
        hoveredColumns.indexOf(index) > -1) {
        classNames.push('active');
        if (isInDanger) {
            classNames.push('danger');
        }
    }
    return classNames.join(' ');
};
//# sourceMappingURL=column-controls.js.map