"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_utils_1 = require("prosemirror-utils");
var prosemirror_view_1 = require("prosemirror-view");
var table_1 = require("../nodeviews/table");
var cell_1 = require("../nodeviews/cell");
var actions_1 = require("../actions");
var action_handlers_1 = require("../action-handlers");
var event_handlers_1 = require("../event-handlers");
var utils_1 = require("../utils");
exports.pluginKey = new prosemirror_state_1.PluginKey('tablePlugin');
exports.defaultTableSelection = {
    hoveredColumns: [],
    hoveredRows: [],
    isInDanger: false,
};
var ACTIONS;
(function (ACTIONS) {
    ACTIONS[ACTIONS["SET_EDITOR_FOCUS"] = 0] = "SET_EDITOR_FOCUS";
    ACTIONS[ACTIONS["SET_TABLE_REF"] = 1] = "SET_TABLE_REF";
    ACTIONS[ACTIONS["SET_TARGET_CELL_POSITION"] = 2] = "SET_TARGET_CELL_POSITION";
    ACTIONS[ACTIONS["CLEAR_HOVER_SELECTION"] = 3] = "CLEAR_HOVER_SELECTION";
    ACTIONS[ACTIONS["HOVER_COLUMNS"] = 4] = "HOVER_COLUMNS";
    ACTIONS[ACTIONS["HOVER_ROWS"] = 5] = "HOVER_ROWS";
    ACTIONS[ACTIONS["HOVER_TABLE"] = 6] = "HOVER_TABLE";
    ACTIONS[ACTIONS["TOGGLE_CONTEXTUAL_MENU"] = 7] = "TOGGLE_CONTEXTUAL_MENU";
    ACTIONS[ACTIONS["SHOW_INSERT_COLUMN_BUTTON"] = 8] = "SHOW_INSERT_COLUMN_BUTTON";
    ACTIONS[ACTIONS["SHOW_INSERT_ROW_BUTTON"] = 9] = "SHOW_INSERT_ROW_BUTTON";
    ACTIONS[ACTIONS["HIDE_INSERT_COLUMN_OR_ROW_BUTTON"] = 10] = "HIDE_INSERT_COLUMN_OR_ROW_BUTTON";
})(ACTIONS = exports.ACTIONS || (exports.ACTIONS = {}));
exports.createPlugin = function (dispatch, portalProviderAPI, eventDispatcher, pluginConfig, appearance) {
    return new prosemirror_state_1.Plugin({
        state: {
            init: function () {
                return tslib_1.__assign({ pluginConfig: pluginConfig, insertColumnButtonIndex: undefined, insertRowButtonIndex: undefined, decorationSet: prosemirror_view_1.DecorationSet.empty }, exports.defaultTableSelection);
            },
            apply: function (tr, _pluginState, _, state) {
                var meta = tr.getMeta(exports.pluginKey) || {};
                var data = meta.data || {};
                var editorHasFocus = data.editorHasFocus, tableRef = data.tableRef, targetCellPosition = data.targetCellPosition, hoverDecoration = data.hoverDecoration, hoveredColumns = data.hoveredColumns, hoveredRows = data.hoveredRows, isInDanger = data.isInDanger, insertColumnButtonIndex = data.insertColumnButtonIndex, insertRowButtonIndex = data.insertRowButtonIndex;
                var pluginState = tslib_1.__assign({}, _pluginState);
                if (tr.docChanged && pluginState.targetCellPosition) {
                    var _a = tr.mapping.mapResult(pluginState.targetCellPosition), pos = _a.pos, deleted = _a.deleted;
                    pluginState = tslib_1.__assign({}, pluginState, { targetCellPosition: deleted ? undefined : pos });
                }
                switch (meta.action) {
                    case ACTIONS.SET_EDITOR_FOCUS:
                        return action_handlers_1.handleSetFocus(editorHasFocus)(pluginState, dispatch);
                    case ACTIONS.SET_TABLE_REF:
                        return action_handlers_1.handleSetTableRef(state, tableRef)(pluginState, dispatch);
                    case ACTIONS.SET_TARGET_CELL_POSITION:
                        return action_handlers_1.handleSetTargetCellPosition(targetCellPosition)(pluginState, dispatch);
                    case ACTIONS.CLEAR_HOVER_SELECTION:
                        return action_handlers_1.handleClearSelection(pluginState, dispatch);
                    case ACTIONS.HOVER_COLUMNS:
                        return action_handlers_1.handleHoverColumns(state, hoverDecoration, hoveredColumns, isInDanger)(pluginState, dispatch);
                    case ACTIONS.HOVER_ROWS:
                        return action_handlers_1.handleHoverRows(state, hoverDecoration, hoveredRows, isInDanger)(pluginState, dispatch);
                    case ACTIONS.HOVER_TABLE:
                        return action_handlers_1.handleHoverTable(state, hoverDecoration, hoveredColumns, hoveredRows, isInDanger)(pluginState, dispatch);
                    case ACTIONS.TOGGLE_CONTEXTUAL_MENU:
                        return action_handlers_1.handleToggleContextualMenu(pluginState, dispatch);
                    case ACTIONS.SHOW_INSERT_COLUMN_BUTTON:
                        return action_handlers_1.handleShowInsertColumnButton(insertColumnButtonIndex)(pluginState, dispatch);
                    case ACTIONS.SHOW_INSERT_ROW_BUTTON:
                        return action_handlers_1.handleShowInsertRowButton(insertRowButtonIndex)(pluginState, dispatch);
                    case ACTIONS.HIDE_INSERT_COLUMN_OR_ROW_BUTTON:
                        return action_handlers_1.handleHideInsertColumnOrRowButton(pluginState, dispatch);
                    default:
                        break;
                }
                if (tr.docChanged || tr.selectionSet) {
                    return action_handlers_1.handleDocOrSelectionChanged(tr)(pluginState, dispatch);
                }
                return pluginState;
            },
        },
        key: exports.pluginKey,
        appendTransaction: function (transactions, oldState, newState) {
            var tr = transactions.find(function (tr) { return tr.getMeta('uiEvent') === 'cut'; });
            if (tr) {
                // "fixTables" removes empty rows as we don't allow that in schema
                return utils_1.fixTables(actions_1.handleCut(tr, oldState, newState));
            }
            if (transactions.find(function (tr) { return tr.docChanged; })) {
                return utils_1.fixTables(newState.tr);
            }
            if (transactions.find(function (tr) { return tr.selectionSet; })) {
                return utils_1.normalizeSelection(newState.tr);
            }
        },
        view: function (editorView) {
            var domAtPos = editorView.domAtPos.bind(editorView);
            return {
                update: function (view) {
                    var state = view.state, dispatch = view.dispatch;
                    var selection = state.selection;
                    var pluginState = exports.getPluginState(state);
                    var tableRef;
                    if (pluginState.editorHasFocus) {
                        var parent_1 = prosemirror_utils_1.findParentDomRefOfType(state.schema.nodes.table, domAtPos)(selection);
                        if (parent_1) {
                            tableRef = parent_1.querySelector('table');
                        }
                    }
                    if (pluginState.tableRef !== tableRef) {
                        actions_1.setTableRef(tableRef)(state, dispatch);
                    }
                },
            };
        },
        props: {
            decorations: function (state) { return exports.getPluginState(state).decorationSet; },
            handleClick: function (_a) {
                var state = _a.state, dispatch = _a.dispatch;
                var decorationSet = exports.getPluginState(state).decorationSet;
                if (utils_1.findControlsHoverDecoration(decorationSet).length) {
                    actions_1.clearHoverSelection(state, dispatch);
                }
                return false;
            },
            nodeViews: {
                table: table_1.createTableView(portalProviderAPI),
                tableCell: cell_1.createCellView(portalProviderAPI, appearance),
                tableHeader: cell_1.createCellView(portalProviderAPI, appearance),
            },
            handleDOMEvents: {
                blur: event_handlers_1.handleBlur,
                focus: event_handlers_1.handleFocus,
                mousedown: event_handlers_1.handleMouseDown,
                mouseover: event_handlers_1.handleMouseOver,
                mouseleave: event_handlers_1.handleMouseLeave,
                click: event_handlers_1.handleClick,
            },
            handleTripleClick: event_handlers_1.handleTripleClick,
        },
    });
};
exports.getPluginState = function (state) {
    return exports.pluginKey.getState(state);
};
//# sourceMappingURL=main.js.map