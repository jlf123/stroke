"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_utils_1 = require("prosemirror-utils");
var main_1 = require("./pm-plugins/main");
var types_1 = require("./types");
var utils_1 = require("../../utils");
var utils_2 = require("./utils");
var processDecorations = function (state, decorationSet, newDecorations, find) {
    if (newDecorations.length) {
        return decorationSet.add(state.doc, newDecorations);
    }
    else {
        return decorationSet.remove(find(decorationSet));
    }
};
exports.handleSetFocus = function (editorHasFocus) { return function (pluginState, dispatch) {
    var nextPluginState = tslib_1.__assign({}, pluginState, { editorHasFocus: editorHasFocus });
    dispatch(main_1.pluginKey, nextPluginState);
    return nextPluginState;
}; };
exports.handleSetTableRef = function (state, tableRef) { return function (pluginState, dispatch) {
    var nextPluginState = tslib_1.__assign({}, pluginState, { tableRef: tableRef, tableFloatingToolbarTarget: utils_1.closestElement(tableRef, "." + types_1.TableCssClassName.TABLE_NODE_WRAPPER) || undefined, tableNode: tableRef ? prosemirror_utils_1.findTable(state.selection).node : undefined });
    dispatch(main_1.pluginKey, nextPluginState);
    return nextPluginState;
}; };
exports.handleSetTargetCellPosition = function (targetCellPosition) { return function (pluginState, dispatch) {
    var nextPluginState = tslib_1.__assign({}, pluginState, { targetCellPosition: targetCellPosition, isContextualMenuOpen: false });
    dispatch(main_1.pluginKey, nextPluginState);
    return nextPluginState;
}; };
exports.handleClearSelection = function (pluginState, dispatch) {
    var decorationSet = pluginState.decorationSet;
    var nextPluginState = tslib_1.__assign({}, pluginState, main_1.defaultTableSelection, { decorationSet: decorationSet.remove(utils_2.findControlsHoverDecoration(decorationSet)) });
    dispatch(main_1.pluginKey, nextPluginState);
    return nextPluginState;
};
exports.handleHoverColumns = function (state, hoverDecoration, hoveredColumns, isInDanger) { return function (pluginState, dispatch) {
    var nextPluginState = tslib_1.__assign({}, pluginState, { decorationSet: processDecorations(state, pluginState.decorationSet, hoverDecoration, utils_2.findControlsHoverDecoration), hoveredColumns: hoveredColumns,
        isInDanger: isInDanger });
    dispatch(main_1.pluginKey, nextPluginState);
    return nextPluginState;
}; };
exports.handleHoverRows = function (state, hoverDecoration, hoveredRows, isInDanger) { return function (pluginState, dispatch) {
    var nextPluginState = tslib_1.__assign({}, pluginState, { decorationSet: processDecorations(state, pluginState.decorationSet, hoverDecoration, utils_2.findControlsHoverDecoration), hoveredRows: hoveredRows,
        isInDanger: isInDanger });
    dispatch(main_1.pluginKey, nextPluginState);
    return nextPluginState;
}; };
exports.handleHoverTable = function (state, hoverDecoration, hoveredColumns, hoveredRows, isInDanger) { return function (pluginState, dispatch) {
    var nextPluginState = tslib_1.__assign({}, pluginState, { decorationSet: processDecorations(state, pluginState.decorationSet, hoverDecoration, utils_2.findControlsHoverDecoration), hoveredColumns: hoveredColumns,
        hoveredRows: hoveredRows,
        isInDanger: isInDanger });
    dispatch(main_1.pluginKey, nextPluginState);
    return nextPluginState;
}; };
exports.handleDocOrSelectionChanged = function (tr) { return function (pluginState, dispatch) {
    var tableNode;
    var targetCellPosition;
    var table = prosemirror_utils_1.findTable(tr.selection);
    if (table) {
        tableNode = table.node;
        var _a = tr.doc.type.schema.nodes, tableCell = _a.tableCell, tableHeader = _a.tableHeader;
        var cell = prosemirror_utils_1.findParentNodeOfType([tableCell, tableHeader])(tr.selection);
        targetCellPosition = cell ? cell.pos : undefined;
    }
    var hoverDecoration = utils_2.findControlsHoverDecoration(pluginState.decorationSet);
    if (pluginState.tableNode !== tableNode ||
        pluginState.targetCellPosition !== targetCellPosition ||
        hoverDecoration.length) {
        var nextPluginState = tslib_1.__assign({}, pluginState, main_1.defaultTableSelection, { 
            // @see: https://product-fabric.atlassian.net/browse/ED-3796
            decorationSet: pluginState.decorationSet.remove(hoverDecoration), targetCellPosition: targetCellPosition,
            tableNode: tableNode });
        dispatch(main_1.pluginKey, nextPluginState);
        return nextPluginState;
    }
    return pluginState;
}; };
exports.handleToggleContextualMenu = function (pluginState, dispatch) {
    var nextPluginState = tslib_1.__assign({}, pluginState, { isContextualMenuOpen: !pluginState.isContextualMenuOpen });
    dispatch(main_1.pluginKey, nextPluginState);
    return nextPluginState;
};
exports.handleShowInsertColumnButton = function (insertColumnButtonIndex) { return function (pluginState, dispatch) {
    var nextPluginState = tslib_1.__assign({}, pluginState, { insertColumnButtonIndex: insertColumnButtonIndex });
    dispatch(main_1.pluginKey, nextPluginState);
    return nextPluginState;
}; };
exports.handleShowInsertRowButton = function (insertRowButtonIndex) { return function (pluginState, dispatch) {
    var nextPluginState = tslib_1.__assign({}, pluginState, { insertRowButtonIndex: insertRowButtonIndex });
    dispatch(main_1.pluginKey, nextPluginState);
    return nextPluginState;
}; };
exports.handleHideInsertColumnOrRowButton = function (pluginState, dispatch) {
    var nextPluginState = tslib_1.__assign({}, pluginState, { insertColumnButtonIndex: undefined, insertRowButtonIndex: undefined });
    dispatch(main_1.pluginKey, nextPluginState);
    return nextPluginState;
};
//# sourceMappingURL=action-handlers.js.map