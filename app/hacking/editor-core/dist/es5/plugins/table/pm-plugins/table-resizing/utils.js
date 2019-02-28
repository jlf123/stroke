"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_tables_1 = require("prosemirror-tables");
var editor_common_1 = require("@atlaskit/editor-common");
var tableLayoutToSize = {
    default: editor_common_1.akEditorDefaultLayoutWidth,
    wide: editor_common_1.akEditorWideLayoutWidth,
    'full-width': undefined,
};
/**
 * Translates named layouts in number values.
 * @param tableLayout
 * @param containerWidth
 */
function getLayoutSize(tableLayout, containerWidth) {
    if (containerWidth === void 0) { containerWidth = 0; }
    var calculatedTableWidth = editor_common_1.calcTableWidth(tableLayout, containerWidth);
    return calculatedTableWidth.endsWith('px')
        ? Number(calculatedTableWidth.slice(0, calculatedTableWidth.length - 2))
        : tableLayoutToSize[tableLayout] || containerWidth;
}
exports.getLayoutSize = getLayoutSize;
/**
 * Does the current position point at a cell.
 * @param $pos
 */
function pointsAtCell($pos) {
    return $pos.parent.type.spec.tableRole === 'row' && $pos.nodeAfter;
}
exports.pointsAtCell = pointsAtCell;
/**
 * Returns the pos of the cell on the side requested.
 * @param view
 * @param event
 * @param side
 */
function edgeCell(view, event, side) {
    var buffer = side === 'right' ? -5 : 5; // Fixes finicky bug where posAtCoords could return wrong pos.
    var pos = view.posAtCoords({
        left: event.clientX + buffer,
        top: event.clientY,
    }).pos;
    var $cell = prosemirror_tables_1.cellAround(view.state.doc.resolve(pos));
    if (!$cell) {
        return -1;
    }
    if (side === 'right') {
        return $cell.pos;
    }
    var map = prosemirror_tables_1.TableMap.get($cell.node(-1));
    var start = $cell.start(-1);
    var index = map.map.indexOf($cell.pos - start);
    return index % map.width === 0 ? -1 : start + map.map[index - 1];
}
exports.edgeCell = edgeCell;
/**
 * Get the current col width, handles colspan.
 * @param view
 * @param cellPos
 * @param param2
 */
function currentColWidth(view, cellPos, _a) {
    var colspan = _a.colspan, colwidth = _a.colwidth;
    var width = colwidth && colwidth[colwidth.length - 1];
    if (width) {
        return width;
    }
    // Not fixed, read current width from DOM
    var domWidth = view.domAtPos(cellPos + 1).node.offsetWidth;
    var parts = colspan;
    if (colwidth) {
        for (var i = 0; i < colspan; i++) {
            if (colwidth[i]) {
                domWidth -= colwidth[i];
                parts--;
            }
        }
    }
    return domWidth / parts;
}
exports.currentColWidth = currentColWidth;
/**
 * Attempts to find a parent TD/TH depending on target element.
 * @param target
 */
function domCellAround(target) {
    while (target && target.nodeName !== 'TD' && target.nodeName !== 'TH') {
        target = target.classList.contains('ProseMirror')
            ? null
            : target.parentNode;
    }
    return target;
}
exports.domCellAround = domCellAround;
//# sourceMappingURL=utils.js.map