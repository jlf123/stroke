import * as tslib_1 from "tslib";
import { getCellsInRow } from 'prosemirror-utils';
var fixTable = function (table, tablePos, tr) {
    var rowPos = tablePos + 1;
    var _loop_1 = function (i) {
        var row = table.child(i);
        if (!row.childCount) {
            rowPos = tr.mapping.map(rowPos);
            tr.delete(rowPos, rowPos + row.nodeSize);
            var _loop_2 = function (j) {
                var cells = getCellsInRow(j)(tr.selection);
                if (cells) {
                    cells.forEach(function (cell) {
                        var rowspan = cell.node.attrs.rowspan;
                        if (rowspan + j - 1 >= i) {
                            tr.setNodeMarkup(cell.pos, cell.node.type, tslib_1.__assign({}, cell.node.attrs, { rowspan: rowspan - 1 }));
                        }
                    });
                }
            };
            // decrement rowspans @see ED-5802
            for (var j = i - 1; j >= 0; j--) {
                _loop_2(j);
            }
        }
        rowPos += row.nodeSize;
    };
    for (var i = 0; i < table.childCount; i++) {
        _loop_1(i);
    }
    return tr;
};
export var fixTables = function (tr) {
    tr.doc.descendants(function (node, pos) {
        if (node.type.name === 'table') {
            tr = fixTable(node, pos, tr);
        }
    });
    return tr;
};
//# sourceMappingURL=fix-tables.js.map