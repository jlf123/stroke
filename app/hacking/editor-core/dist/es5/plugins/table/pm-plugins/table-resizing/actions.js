"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_tables_1 = require("prosemirror-tables");
var editor_common_1 = require("@atlaskit/editor-common");
var types_1 = require("../../types");
var utils_1 = require("./resizer/utils");
var resizer_1 = require("./resizer/resizer");
var main_1 = require("../main");
var TableComponent_1 = require("../../nodeviews/TableComponent");
var utils_2 = require("../../utils");
var utils_3 = require("./utils");
function updateColumnWidth(view, cell, movedWidth, resizer) {
    var $cell = view.state.doc.resolve(cell);
    var table = $cell.node(-1);
    var map = prosemirror_tables_1.TableMap.get(table);
    var start = $cell.start(-1);
    var col = map.colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan - 1;
    var newState = resizer.resize(col, movedWidth);
    var tr = applyColumnWidths(view, newState, table, start);
    if (tr.docChanged) {
        view.dispatch(tr);
    }
}
exports.updateColumnWidth = updateColumnWidth;
function applyColumnWidths(view, state, table, start) {
    var tr = view.state.tr;
    var map = prosemirror_tables_1.TableMap.get(table);
    for (var i = 0; i < state.cols.length; i++) {
        var width = state.cols[i].width;
        for (var row = 0; row < map.height; row++) {
            var mapIndex = row * map.width + i;
            // Rowspanning cell that has already been handled
            if (row && map.map[mapIndex] === map.map[mapIndex - map.width]) {
                continue;
            }
            var pos = map.map[mapIndex];
            var attrs = table.nodeAt(pos).attrs;
            var index = attrs.colspan === 1 ? 0 : i - map.colCount(pos);
            if (attrs.colwidth && attrs.colwidth[index] === width) {
                continue;
            }
            var colwidth = attrs.colwidth
                ? attrs.colwidth.slice()
                : Array.from({ length: attrs.colspan }, function (_) { return 0; });
            colwidth[index] = width;
            tr = tr.setNodeMarkup(start + pos, null, tslib_1.__assign({}, attrs, { colwidth: colwidth }));
        }
    }
    return tr;
}
exports.applyColumnWidths = applyColumnWidths;
function handleBreakoutContent(view, elem, start, minWidth, node) {
    var colIdx = Array.from(elem.parentNode.children).indexOf(elem);
    var cellStyle = getComputedStyle(elem);
    var amount = utils_1.addContainerLeftRightPadding(minWidth - elem.offsetWidth, cellStyle);
    var state = resizeColumnTo(elem, colIdx, amount, node);
    exports.updateControls(view.state);
    var tr = applyColumnWidths(view, state, node, start);
    if (tr.docChanged) {
        view.dispatch(tr);
    }
}
exports.handleBreakoutContent = handleBreakoutContent;
function resizeColumn(view, cell, width, resizer) {
    var $cell = view.state.doc.resolve(cell);
    var table = $cell.node(-1);
    var start = $cell.start(-1);
    var col = prosemirror_tables_1.TableMap.get(table).colCount($cell.pos - start) +
        $cell.nodeAfter.attrs.colspan -
        1;
    var newState = resizer.resize(col, width);
    resizer.apply(newState);
    return newState;
}
exports.resizeColumn = resizeColumn;
/**
 * Updates the column controls on resize
 */
exports.updateControls = function (state) {
    var tableRef = main_1.getPluginState(state).tableRef;
    if (!tableRef) {
        return;
    }
    var tr = tableRef.querySelector('tr');
    if (!tr) {
        return;
    }
    var cols = tr.children;
    var wrapper = tableRef.parentElement;
    var columnControls = wrapper.querySelectorAll("." + types_1.TableCssClassName.COLUMN_CONTROLS_BUTTON_WRAP);
    var rows = tableRef.querySelectorAll('tr');
    var rowControls = wrapper.parentElement.querySelectorAll("." + types_1.TableCssClassName.ROW_CONTROLS_BUTTON_WRAP);
    var numberedRows = wrapper.parentElement.querySelectorAll(types_1.TableCssClassName.NUMBERED_COLUMN_BUTTON);
    // update column controls width on resize
    for (var i = 0, count = columnControls.length; i < count; i++) {
        if (cols[i]) {
            columnControls[i].style.width = cols[i].offsetWidth + 1 + "px";
        }
    }
    // update rows controls height on resize
    for (var i = 0, count = rowControls.length; i < count; i++) {
        if (rows[i]) {
            rowControls[i].style.height = rows[i].offsetHeight + 1 + "px";
            if (numberedRows.length) {
                numberedRows[i].style.height = rows[i].offsetHeight + 1 + "px";
            }
        }
    }
    TableComponent_1.updateRightShadow(wrapper, tableRef, wrapper.parentElement.querySelector("." + types_1.TableCssClassName.TABLE_RIGHT_SHADOW));
};
/**
 * Scale the table to meet new requirements (col, layout change etc)
 * @param view
 * @param tableElem
 * @param node
 * @param pos
 * @param containerWidth
 * @param currentLayout
 */
function scaleTable(view, tableElem, node, pos, containerWidth, currentLayout) {
    var state = setColumnWidths(tableElem, node, containerWidth, currentLayout);
    if (state) {
        var tr = applyColumnWidths(view, state, node, pos + 1);
        if (tr.docChanged) {
            view.dispatch(tr);
        }
    }
}
exports.scaleTable = scaleTable;
/**
 * Hydate a table with column widths.
 * @param tableElem
 * @param node
 * @param containerWidth
 * @param currentLayout
 */
function setColumnWidths(tableElem, node, containerWidth, currentLayout) {
    if (!tableElem) {
        return;
    }
    var maxSize = utils_3.getLayoutSize(currentLayout, containerWidth);
    return scale(tableElem, node, maxSize);
}
exports.setColumnWidths = setColumnWidths;
/**
 * Light wrapper over Resizer.resize
 * Mainly used to re-set a columns width.
 * @param elem
 * @param colIdx
 * @param amount
 * @param node
 */
function resizeColumnTo(elem, colIdx, amount, node) {
    while (elem.nodeName !== 'TABLE') {
        elem = elem.parentNode;
    }
    var resizer = resizer_1.default.fromDOM(elem, {
        minWidth: editor_common_1.tableCellMinWidth,
        maxSize: elem.offsetWidth,
        node: node,
    });
    var newState = resizer.resize(colIdx, amount);
    resizer.apply(newState);
    return newState;
}
exports.resizeColumnTo = resizeColumnTo;
/**
 * Base function to trigger the actual scale on a table node.
 * Will only resize/scale if a table has been previously resized.
 * @param tableElem
 * @param node
 * @param maxSize
 */
function scale(tableElem, node, maxSize) {
    if (node.attrs.isNumberColumnEnabled) {
        maxSize -= editor_common_1.akEditorTableNumberColumnWidth;
    }
    // If a table has not been resized yet, columns should be auto.
    if (utils_2.hasTableBeenResized(node)) {
        var resizer = resizer_1.default.fromDOM(tableElem, {
            minWidth: editor_common_1.tableCellMinWidth,
            maxSize: tableElem.offsetWidth,
            node: node,
        });
        return resizer.scale(maxSize);
    }
}
//# sourceMappingURL=actions.js.map