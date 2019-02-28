"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_tables_1 = require("prosemirror-tables");
var prosemirror_utils_1 = require("prosemirror-utils");
var main_1 = require("./pm-plugins/main");
var utils_1 = require("./utils");
var analytics_1 = require("../../analytics");
var commands_1 = require("../lists/commands");
var slice_1 = require("../../utils/slice");
var types_1 = require("./types");
var utils_2 = require("../../utils");
exports.clearHoverSelection = function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr.setMeta(main_1.pluginKey, { action: main_1.ACTIONS.CLEAR_HOVER_SELECTION }));
    }
    return true;
};
exports.hoverColumns = function (columns, isInDanger) { return function (state, dispatch) {
    var hoveredColumns = columns.reduce(function (acc, index) {
        var indexes = prosemirror_utils_1.getSelectionRangeInColumn(index)(state.tr).indexes;
        return acc.concat(indexes.filter(function (index) { return acc.indexOf(index) === -1; }));
    }, []);
    var cells = prosemirror_utils_1.getCellsInColumn(hoveredColumns)(state.selection);
    if (!cells) {
        return false;
    }
    if (dispatch) {
        dispatch(state.tr
            .setMeta(main_1.pluginKey, {
            action: main_1.ACTIONS.HOVER_COLUMNS,
            data: {
                hoverDecoration: utils_1.createControlsHoverDecoration(cells, isInDanger),
                hoveredColumns: hoveredColumns,
                isInDanger: isInDanger,
            },
        })
            .setMeta('addToHistory', false));
    }
    return true;
}; };
exports.hoverRows = function (rows, isInDanger) { return function (state, dispatch) {
    var hoveredRows = rows.reduce(function (acc, index) {
        var indexes = prosemirror_utils_1.getSelectionRangeInRow(index)(state.tr).indexes;
        return acc.concat(indexes.filter(function (index) { return acc.indexOf(index) === -1; }));
    }, []);
    var cells = prosemirror_utils_1.getCellsInRow(hoveredRows)(state.selection);
    if (!cells) {
        return false;
    }
    if (dispatch) {
        dispatch(state.tr
            .setMeta(main_1.pluginKey, {
            action: main_1.ACTIONS.HOVER_ROWS,
            data: {
                hoverDecoration: utils_1.createControlsHoverDecoration(cells, isInDanger),
                hoveredRows: hoveredRows,
                isInDanger: isInDanger,
            },
        })
            .setMeta('addToHistory', false));
    }
    return true;
}; };
exports.hoverTable = function (isInDanger) { return function (state, dispatch) {
    var table = prosemirror_utils_1.findTable(state.selection);
    if (!table) {
        return false;
    }
    var map = prosemirror_tables_1.TableMap.get(table.node);
    var hoveredColumns = Array.from(Array(map.width).keys());
    var hoveredRows = Array.from(Array(map.height).keys());
    var cells = prosemirror_utils_1.getCellsInRow(hoveredRows)(state.selection);
    if (!cells) {
        return false;
    }
    if (dispatch) {
        dispatch(state.tr
            .setMeta(main_1.pluginKey, {
            action: main_1.ACTIONS.HOVER_TABLE,
            data: {
                hoverDecoration: utils_1.createControlsHoverDecoration(cells, isInDanger),
                hoveredColumns: hoveredColumns,
                hoveredRows: hoveredRows,
                isInDanger: isInDanger,
            },
        })
            .setMeta('addToHistory', false));
    }
    return true;
}; };
exports.clearSelection = function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr
            .setSelection(prosemirror_state_1.Selection.near(state.selection.$from))
            .setMeta('addToHistory', false));
    }
    return true;
};
exports.toggleHeaderRow = function (state, dispatch) {
    var table = prosemirror_utils_1.findTable(state.selection);
    if (!table) {
        return false;
    }
    var tr = state.tr;
    var map = prosemirror_tables_1.TableMap.get(table.node);
    var _a = state.schema.nodes, tableHeader = _a.tableHeader, tableCell = _a.tableCell;
    var isHeaderRowEnabled = utils_1.checkIfHeaderRowEnabled(state);
    var isHeaderColumnEnabled = utils_1.checkIfHeaderColumnEnabled(state);
    var type = isHeaderRowEnabled ? tableCell : tableHeader;
    for (var column = 0; column < table.node.child(0).childCount; column++) {
        // skip header column
        if (isHeaderColumnEnabled && column === 0) {
            continue;
        }
        var from = tr.mapping.map(table.start + map.map[column]);
        var cell = table.node.child(0).child(column);
        tr.setNodeMarkup(from, type, cell.attrs);
    }
    if (dispatch) {
        dispatch(tr);
    }
    return true;
};
exports.toggleHeaderColumn = function (state, dispatch) {
    var table = prosemirror_utils_1.findTable(state.selection);
    if (!table) {
        return false;
    }
    var tr = state.tr;
    var map = prosemirror_tables_1.TableMap.get(table.node);
    var _a = state.schema.nodes, tableHeader = _a.tableHeader, tableCell = _a.tableCell;
    var type = utils_1.checkIfHeaderColumnEnabled(state) ? tableCell : tableHeader;
    // skip header row
    var startIndex = utils_1.checkIfHeaderRowEnabled(state) ? 1 : 0;
    for (var row = startIndex; row < table.node.childCount; row++) {
        var column = 0;
        var cell = table.node.child(row).child(column);
        tr.setNodeMarkup(table.start + map.map[column + row * map.width], type, cell.attrs);
    }
    if (dispatch) {
        dispatch(tr);
    }
    return true;
};
exports.toggleNumberColumn = function (state, dispatch) {
    var tr = state.tr;
    var _a = prosemirror_utils_1.findTable(state.selection), node = _a.node, pos = _a.pos;
    tr.setNodeMarkup(pos, state.schema.nodes.table, tslib_1.__assign({}, node.attrs, { isNumberColumnEnabled: !node.attrs.isNumberColumnEnabled }));
    if (dispatch) {
        dispatch(tr);
    }
    return true;
};
exports.setCellAttr = function (name, value) { return function (state, dispatch) {
    var _a;
    var tr = state.tr, selection = state.selection;
    if (selection instanceof prosemirror_tables_1.CellSelection) {
        var updated_1 = false;
        selection.forEachCell(function (cell, pos) {
            var _a;
            if (cell.attrs[name] !== value) {
                tr.setNodeMarkup(pos, cell.type, tslib_1.__assign({}, cell.attrs, (_a = {}, _a[name] = value, _a)));
                updated_1 = true;
            }
        });
        if (updated_1) {
            if (dispatch) {
                dispatch(tr);
            }
            return true;
        }
    }
    else {
        var cell = prosemirror_tables_1.selectionCell(state);
        if (cell) {
            if (dispatch) {
                dispatch(tr.setNodeMarkup(cell.pos, cell.nodeAfter.type, tslib_1.__assign({}, cell.nodeAfter.attrs, (_a = {}, _a[name] = value, _a))));
            }
            return true;
        }
    }
    return false;
}; };
exports.insertColumn = function (column) { return function (state, dispatch) {
    var tr = prosemirror_utils_1.addColumnAt(column)(state.tr);
    var table = prosemirror_utils_1.findTable(tr.selection);
    // move the cursor to the newly created column
    var pos = prosemirror_tables_1.TableMap.get(table.node).positionAt(0, column, table.node);
    if (dispatch) {
        dispatch(tr.setSelection(prosemirror_state_1.Selection.near(tr.doc.resolve(table.start + pos))));
    }
    analytics_1.analyticsService.trackEvent('atlassian.editor.format.table.column.button');
    return true;
}; };
exports.insertRow = function (row) { return function (state, dispatch) {
    exports.clearHoverSelection(state, dispatch);
    // Dont clone the header row
    var headerRowEnabled = utils_1.checkIfHeaderRowEnabled(state);
    var clonePreviousRow = (headerRowEnabled && row > 1) || (!headerRowEnabled && row >= 0);
    var tr = prosemirror_utils_1.addRowAt(row, clonePreviousRow)(state.tr);
    var table = prosemirror_utils_1.findTable(tr.selection);
    // move the cursor to the newly created row
    var pos = prosemirror_tables_1.TableMap.get(table.node).positionAt(row, 0, table.node);
    if (dispatch) {
        dispatch(tr.setSelection(prosemirror_state_1.Selection.near(tr.doc.resolve(table.start + pos))));
    }
    analytics_1.analyticsService.trackEvent('atlassian.editor.format.table.row.button');
    return true;
}; };
exports.triggerUnlessTableHeader = function (command) { return function (state, dispatch) {
    var selection = state.selection, tableHeader = state.schema.nodes.tableHeader;
    if (selection instanceof prosemirror_state_1.TextSelection) {
        var cell = prosemirror_utils_1.findCellClosestToPos(selection.$from);
        if (cell && cell.node.type !== tableHeader) {
            return command(state, dispatch);
        }
    }
    if (selection instanceof prosemirror_tables_1.CellSelection) {
        var rect = prosemirror_utils_1.getSelectionRect(selection);
        if (!utils_1.checkIfHeaderRowEnabled(state) || (rect && rect.top > 0)) {
            return command(state, dispatch);
        }
    }
    return false;
}; };
function transformSliceToAddTableHeaders(slice, schema) {
    var _a = schema.nodes, table = _a.table, tableHeader = _a.tableHeader, tableRow = _a.tableRow;
    return slice_1.mapSlice(slice, function (maybeTable) {
        if (maybeTable.type === table) {
            var firstRow = maybeTable.firstChild;
            if (firstRow) {
                var headerCols_1 = [];
                firstRow.forEach(function (oldCol) {
                    headerCols_1.push(tableHeader.createChecked(oldCol.attrs, oldCol.content, oldCol.marks));
                });
                var headerRow = tableRow.createChecked(firstRow.attrs, headerCols_1, firstRow.marks);
                return maybeTable.copy(maybeTable.content.replaceChild(0, headerRow));
            }
        }
        return maybeTable;
    });
}
exports.transformSliceToAddTableHeaders = transformSliceToAddTableHeaders;
exports.deleteTable = function (state, dispatch) {
    if (dispatch) {
        dispatch(prosemirror_utils_1.removeTable(state.tr));
    }
    analytics_1.analyticsService.trackEvent('atlassian.editor.format.table.delete.button');
    return true;
};
exports.convertFirstRowToHeader = function (schema) { return function (tr) {
    var table = prosemirror_utils_1.findTable(tr.selection);
    var map = prosemirror_tables_1.TableMap.get(table.node);
    for (var i = 0; i < map.width; i++) {
        var cell = table.node.child(0).child(i);
        tr.setNodeMarkup(table.start + map.map[i], schema.nodes.tableHeader, cell.attrs);
    }
    return tr;
}; };
exports.deleteSelectedColumns = function (state, dispatch) {
    if (!prosemirror_utils_1.isCellSelection(state.selection)) {
        return false;
    }
    var tr = prosemirror_utils_1.removeSelectedColumns(state.tr);
    // sometimes cursor jumps out of the table when deleting last few columns
    if (!prosemirror_utils_1.hasParentNodeOfType(state.schema.nodes.table)(tr.selection)) {
        // trying to put cursor back inside of the table
        var start = prosemirror_utils_1.findTable(state.tr.selection).start;
        tr = prosemirror_utils_1.setTextSelection(start)(tr);
    }
    var table = prosemirror_utils_1.findTable(tr.selection);
    var map = prosemirror_tables_1.TableMap.get(table.node);
    var rect = prosemirror_utils_1.getSelectionRect(tr.selection);
    var columnIndex = rect
        ? Math.min(rect.left, rect.right) - 1
        : map.width - 1;
    var pos = map.positionAt(0, columnIndex < 0 ? 0 : columnIndex, table.node);
    // move cursor to the column to the left of the deleted column
    if (dispatch) {
        dispatch(tr.setSelection(prosemirror_state_1.Selection.near(tr.doc.resolve(table.start + pos))));
    }
    analytics_1.analyticsService.trackEvent('atlassian.editor.format.table.delete_column.button');
    return true;
};
exports.deleteSelectedRows = function (state, dispatch) {
    if (!prosemirror_utils_1.isCellSelection(state.selection)) {
        return false;
    }
    var tableHeader = state.schema.nodes.tableHeader;
    var tr = prosemirror_utils_1.removeSelectedRows(state.tr);
    // sometimes cursor jumps out of the table when deleting last few columns
    if (!prosemirror_utils_1.hasParentNodeOfType(state.schema.nodes.table)(tr.selection)) {
        // trying to put cursor back inside of the table
        var start = prosemirror_utils_1.findTable(state.tr.selection).start;
        tr = prosemirror_utils_1.setTextSelection(start)(tr);
    }
    var table = prosemirror_utils_1.findTable(tr.selection);
    var map = prosemirror_tables_1.TableMap.get(table.node);
    var rect = prosemirror_utils_1.getSelectionRect(state.selection);
    var rowIndex = rect ? Math.min(rect.top, rect.bottom) : 0;
    var pos = map.positionAt(rowIndex === map.height ? rowIndex - 1 : rowIndex, 0, table.node);
    // move cursor to the beginning of the next row, or prev row if deleted row was the last row
    tr.setSelection(prosemirror_state_1.Selection.near(tr.doc.resolve(table.start + pos)));
    // make sure header row is always present (for Bitbucket markdown)
    var isHeaderRowRequired = main_1.getPluginState(state).pluginConfig.isHeaderRowRequired;
    if (isHeaderRowRequired && utils_1.isHeaderRowSelected(state)) {
        tr = exports.convertFirstRowToHeader(state.schema)(tr);
    }
    if (dispatch) {
        dispatch(tr);
    }
    var headerRow = prosemirror_utils_1.hasParentNodeOfType(tableHeader)(tr.selection)
        ? 'header_'
        : '';
    analytics_1.analyticsService.trackEvent("atlassian.editor.format.table.delete_" + headerRow + "row.button");
    return true;
};
exports.toggleTableLayout = function (state, dispatch) {
    var table = prosemirror_utils_1.findTable(state.selection);
    if (!table) {
        return false;
    }
    var layout;
    switch (table.node.attrs.layout) {
        case 'default':
            layout = 'wide';
            break;
        case 'wide':
            layout = 'full-width';
            break;
        case 'full-width':
            layout = 'default';
            break;
    }
    if (dispatch) {
        dispatch(state.tr.setNodeMarkup(table.pos, state.schema.nodes.table, tslib_1.__assign({}, table.node.attrs, { layout: layout })));
    }
    return true;
};
var TAB_FORWARD_DIRECTION = 1;
var TAB_BACKWARD_DIRECTION = -1;
exports.createTable = function (state, dispatch) {
    if (!main_1.pluginKey.get(state)) {
        return false;
    }
    var table = prosemirror_utils_1.createTable(state.schema);
    if (dispatch) {
        dispatch(prosemirror_utils_1.safeInsert(table)(state.tr).scrollIntoView());
    }
    return true;
};
exports.goToNextCell = function (direction) { return function (state, dispatch) {
    var table = prosemirror_utils_1.findTable(state.selection);
    if (!table) {
        return false;
    }
    var map = prosemirror_tables_1.TableMap.get(table.node);
    var _a = state.schema.nodes, tableCell = _a.tableCell, tableHeader = _a.tableHeader;
    var cell = prosemirror_utils_1.findParentNodeOfType([tableCell, tableHeader])(state.selection);
    var firstCellPos = map.positionAt(0, 0, table.node) + table.start;
    var lastCellPos = map.positionAt(map.height - 1, map.width - 1, table.node) + table.start;
    var event = direction === TAB_FORWARD_DIRECTION ? 'next_cell' : 'previous_cell';
    analytics_1.analyticsService.trackEvent("atlassian.editor.format.table." + event + ".keyboard");
    if (firstCellPos === cell.pos && direction === TAB_BACKWARD_DIRECTION) {
        exports.insertRow(0)(state, dispatch);
        return true;
    }
    if (lastCellPos === cell.pos && direction === TAB_FORWARD_DIRECTION) {
        exports.insertRow(map.height)(state, dispatch);
        return true;
    }
    return prosemirror_tables_1.goToNextCell(direction)(state, dispatch);
}; };
exports.moveCursorBackward = function (state, dispatch) {
    var pluginState = main_1.getPluginState(state);
    var $cursor = state.selection.$cursor;
    // if cursor is in the middle of a text node, do nothing
    if (!$cursor ||
        (pluginState.view
            ? !pluginState.view.endOfTextblock('backward', state)
            : $cursor.parentOffset > 0)) {
        return false;
    }
    // find the node before the cursor
    var before;
    var cut;
    if (!utils_1.isIsolating($cursor.parent)) {
        for (var i = $cursor.depth - 1; !before && i >= 0; i--) {
            if ($cursor.index(i) > 0) {
                cut = $cursor.before(i + 1);
                before = $cursor.node(i).child($cursor.index(i) - 1);
            }
            if (utils_1.isIsolating($cursor.node(i))) {
                break;
            }
        }
    }
    // if the node before is not a table node - do nothing
    if (!before || before.type !== state.schema.nodes.table) {
        return false;
    }
    /*
      ensure we're just at a top level paragraph
      otherwise, perform regular backspace behaviour
     */
    var grandparent = $cursor.node($cursor.depth - 1);
    var listItem = state.schema.nodes.listItem;
    if ($cursor.parent.type !== state.schema.nodes.paragraph ||
        (grandparent && grandparent.type !== state.schema.nodes.doc)) {
        if (grandparent && grandparent.type === listItem) {
            return commands_1.outdentList()(state, dispatch);
        }
        else {
            return false;
        }
    }
    var tr = state.tr;
    var lastCellPos = cut - 4;
    // need to move cursor inside the table to be able to calculate table's offset
    tr.setSelection(new prosemirror_state_1.TextSelection(state.doc.resolve(lastCellPos)));
    var $from = tr.selection.$from;
    var start = $from.start(-1);
    var pos = start + $from.parent.nodeSize - 1;
    // move cursor to the last cell
    // it doesn't join node before (last cell) with node after (content after the cursor)
    // due to ridiculous amount of PM code that would have been required to overwrite
    if (dispatch) {
        dispatch(tr.setSelection(new prosemirror_state_1.TextSelection(state.doc.resolve(pos))));
    }
    return true;
};
exports.deleteColumns = function (indexes) { return function (state, dispatch) {
    var tr = state.tr;
    for (var i = indexes.length; i >= 0; i--) {
        tr = prosemirror_utils_1.removeColumnAt(indexes[i])(tr);
    }
    if (tr.docChanged) {
        if (dispatch) {
            dispatch(prosemirror_utils_1.setTextSelection(tr.selection.$from.pos)(tr));
        }
        return true;
    }
    return false;
}; };
exports.deleteRows = function (indexes) { return function (state, dispatch) {
    var tr = state.tr;
    for (var i = indexes.length; i >= 0; i--) {
        tr = prosemirror_utils_1.removeRowAt(indexes[i])(tr);
    }
    if (tr.docChanged) {
        if (dispatch) {
            dispatch(prosemirror_utils_1.setTextSelection(tr.selection.$from.pos)(tr));
        }
        return true;
    }
    return false;
}; };
exports.emptyMultipleCells = function (targetCellPosition) { return function (state, dispatch) {
    var cursorPos;
    var tr = state.tr;
    if (prosemirror_utils_1.isCellSelection(tr.selection)) {
        var selection = tr.selection;
        selection.forEachCell(function (node, pos) {
            var $pos = tr.doc.resolve(tr.mapping.map(pos + 1));
            tr = prosemirror_utils_1.emptyCell(prosemirror_utils_1.findCellClosestToPos($pos), state.schema)(tr);
        });
        cursorPos = selection.$headCell.pos;
    }
    else if (targetCellPosition) {
        var cell = prosemirror_utils_1.findCellClosestToPos(tr.doc.resolve(targetCellPosition + 1));
        tr = prosemirror_utils_1.emptyCell(cell, state.schema)(tr);
        cursorPos = cell.pos;
    }
    if (tr.docChanged) {
        var $pos = tr.doc.resolve(tr.mapping.map(cursorPos));
        var textSelection = prosemirror_state_1.Selection.findFrom($pos, 1, true);
        if (textSelection) {
            tr.setSelection(textSelection);
        }
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    }
    return false;
}; };
exports.setMultipleCellAttrs = function (attrs, targetCellPosition) { return function (state, dispatch) {
    var cursorPos;
    var tr = state.tr;
    if (prosemirror_utils_1.isCellSelection(tr.selection)) {
        var selection = tr.selection;
        selection.forEachCell(function (cell, pos) {
            var $pos = tr.doc.resolve(tr.mapping.map(pos + 1));
            tr = prosemirror_utils_1.setCellAttrs(prosemirror_utils_1.findCellClosestToPos($pos), attrs)(tr);
        });
        cursorPos = selection.$headCell.pos;
    }
    else if (targetCellPosition) {
        var cell = prosemirror_utils_1.findCellClosestToPos(tr.doc.resolve(targetCellPosition + 1));
        tr = prosemirror_utils_1.setCellAttrs(cell, attrs)(tr);
        cursorPos = cell.pos;
    }
    if (tr.docChanged) {
        var $pos = tr.doc.resolve(tr.mapping.map(cursorPos));
        if (dispatch) {
            dispatch(tr.setSelection(prosemirror_state_1.Selection.near($pos)));
        }
        return true;
    }
    return false;
}; };
exports.toggleContextualMenu = function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr
            .setMeta(main_1.pluginKey, {
            action: main_1.ACTIONS.TOGGLE_CONTEXTUAL_MENU,
        })
            .setMeta('addToHistory', false));
    }
    return true;
};
exports.setEditorFocus = function (editorHasFocus) { return function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr.setMeta(main_1.pluginKey, {
            action: main_1.ACTIONS.SET_EDITOR_FOCUS,
            data: { editorHasFocus: editorHasFocus },
        }));
    }
    return true;
}; };
exports.setTableRef = function (tableRef) { return function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr
            .setMeta(main_1.pluginKey, {
            action: main_1.ACTIONS.SET_TABLE_REF,
            data: { tableRef: tableRef },
        })
            .setMeta('addToHistory', false));
    }
    return true;
}; };
exports.selectColumn = function (column) { return function (state, dispatch) {
    var tr = state.tr;
    var _a = prosemirror_utils_1.getSelectionRangeInColumn(column)(tr), $anchor = _a.$anchor, $head = _a.$head, indexes = _a.indexes;
    tr.setSelection(new prosemirror_tables_1.CellSelection($anchor, $head));
    var targetCellPosition;
    var cells = prosemirror_utils_1.getCellsInColumn(indexes[0])(tr.selection);
    if (cells && cells.length) {
        targetCellPosition = cells[0].pos;
    }
    // update contextual menu target cell position on column selection
    if (dispatch) {
        dispatch(tr
            .setMeta(main_1.pluginKey, {
            action: main_1.ACTIONS.SET_TARGET_CELL_POSITION,
            data: { targetCellPosition: targetCellPosition },
        })
            .setMeta('addToHistory', false));
    }
    return true;
}; };
exports.selectRow = function (row) { return function (state, dispatch) {
    var tr = state.tr;
    var _a = prosemirror_utils_1.getSelectionRangeInRow(row)(tr), $anchor = _a.$anchor, $head = _a.$head, indexes = _a.indexes;
    tr.setSelection(new prosemirror_tables_1.CellSelection($anchor, $head));
    var targetCellPosition;
    var cells = prosemirror_utils_1.getCellsInRow(indexes[0])(tr.selection);
    if (cells && cells.length) {
        targetCellPosition = cells[0].pos;
    }
    // update contextual menu target cell position on row selection
    if (dispatch) {
        dispatch(tr
            .setMeta(main_1.pluginKey, {
            action: main_1.ACTIONS.SET_TARGET_CELL_POSITION,
            data: { targetCellPosition: targetCellPosition },
        })
            .setMeta('addToHistory', false));
    }
    return true;
}; };
exports.showInsertColumnButton = function (columnIndex) { return function (state, dispatch) {
    var insertColumnButtonIndex = main_1.getPluginState(state).insertColumnButtonIndex;
    if (columnIndex > -1 && insertColumnButtonIndex !== columnIndex) {
        if (dispatch) {
            dispatch(state.tr
                .setMeta(main_1.pluginKey, {
                action: main_1.ACTIONS.SHOW_INSERT_COLUMN_BUTTON,
                data: {
                    insertColumnButtonIndex: columnIndex,
                },
            })
                .setMeta('addToHistory', false));
        }
        return true;
    }
    return false;
}; };
exports.showInsertRowButton = function (rowIndex) { return function (state, dispatch) {
    var insertRowButtonIndex = main_1.getPluginState(state).insertRowButtonIndex;
    if (rowIndex > -1 && insertRowButtonIndex !== rowIndex) {
        if (dispatch) {
            dispatch(state.tr
                .setMeta(main_1.pluginKey, {
                action: main_1.ACTIONS.SHOW_INSERT_ROW_BUTTON,
                data: {
                    insertRowButtonIndex: rowIndex,
                },
            })
                .setMeta('addToHistory', false));
        }
        return true;
    }
    return false;
}; };
exports.hideInsertColumnOrRowButton = function (state, dispatch) {
    var _a = main_1.getPluginState(state), insertColumnButtonIndex = _a.insertColumnButtonIndex, insertRowButtonIndex = _a.insertRowButtonIndex;
    if (typeof insertColumnButtonIndex === 'number' ||
        typeof insertRowButtonIndex === 'number') {
        if (dispatch) {
            dispatch(state.tr
                .setMeta(main_1.pluginKey, {
                action: main_1.ACTIONS.HIDE_INSERT_COLUMN_OR_ROW_BUTTON,
            })
                .setMeta('addToHistory', false));
        }
        return true;
    }
    return false;
};
exports.handleCut = function (oldTr, oldState, newState) {
    var oldSelection = oldState.tr.selection;
    var tr = newState.tr;
    if (oldSelection instanceof prosemirror_tables_1.CellSelection) {
        var $anchorCell = oldTr.doc.resolve(oldTr.mapping.map(oldSelection.$anchorCell.pos));
        var $headCell = oldTr.doc.resolve(oldTr.mapping.map(oldSelection.$headCell.pos));
        tr.setSelection(new prosemirror_tables_1.CellSelection($anchorCell, $headCell));
        if (tr.selection instanceof prosemirror_tables_1.CellSelection) {
            if (tr.selection.isRowSelection()) {
                tr = prosemirror_utils_1.removeSelectedRows(tr);
            }
            else if (tr.selection.isColSelection()) {
                tr = prosemirror_utils_1.removeSelectedColumns(tr);
            }
        }
    }
    return tr;
};
exports.handleShiftSelection = function (event) { return function (state, dispatch) {
    if (!(state.selection instanceof prosemirror_tables_1.CellSelection) || !event.shiftKey) {
        return false;
    }
    var selection = state.selection;
    if (selection.isRowSelection() || selection.isColSelection()) {
        var selector = selection.isRowSelection()
            ? "." + types_1.TableCssClassName.ROW_CONTROLS_BUTTON_WRAP
            : "." + types_1.TableCssClassName.COLUMN_CONTROLS_BUTTON_WRAP;
        var button = utils_2.closestElement(event.target, selector);
        if (!button) {
            return false;
        }
        var buttons = document.querySelectorAll(selector);
        var index = Array.from(buttons).indexOf(button);
        var rect = prosemirror_utils_1.getSelectionRect(selection);
        var startCells = selection.isRowSelection()
            ? prosemirror_utils_1.getCellsInRow(index >= rect.bottom ? rect.top : rect.bottom - 1)(selection)
            : prosemirror_utils_1.getCellsInColumn(index >= rect.right ? rect.left : rect.right - 1)(selection);
        var endCells = selection.isRowSelection()
            ? prosemirror_utils_1.getCellsInRow(index)(selection)
            : prosemirror_utils_1.getCellsInColumn(index)(selection);
        if (startCells && endCells) {
            event.stopPropagation();
            event.preventDefault();
            if (dispatch) {
                dispatch(state.tr.setSelection(new prosemirror_tables_1.CellSelection(state.doc.resolve(startCells[startCells.length - 1].pos), state.doc.resolve(endCells[0].pos))));
            }
            return true;
        }
    }
    return false;
}; };
//# sourceMappingURL=actions.js.map