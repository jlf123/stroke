"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var prosemirror_utils_1 = require("prosemirror-utils");
var prosemirror_tables_1 = require("prosemirror-tables");
var InsertButton_1 = require("../InsertButton");
var actions_1 = require("../../../actions");
var types_1 = require("../../../types");
var CornerControls = /** @class */ (function (_super) {
    tslib_1.__extends(CornerControls, _super);
    function CornerControls() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isActive = function () {
            var _a = _this.props, editorView = _a.editorView, hoveredRows = _a.hoveredRows;
            var selection = editorView.state.selection;
            var table = prosemirror_utils_1.findTable(selection);
            if (!table) {
                return false;
            }
            return (prosemirror_utils_1.isTableSelected(selection) ||
                (hoveredRows && hoveredRows.length === prosemirror_tables_1.TableMap.get(table.node).height));
        };
        _this.clearHoverSelection = function () {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            actions_1.clearHoverSelection(state, dispatch);
        };
        _this.selectTable = function () {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            dispatch(prosemirror_utils_1.selectTable(state.tr).setMeta('addToHistory', false));
        };
        _this.hoverTable = function () {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            actions_1.hoverTable()(state, dispatch);
        };
        _this.insertColumn = function () {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            actions_1.insertColumn(0)(state, dispatch);
        };
        _this.insertRow = function () {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            actions_1.insertRow(0)(state, dispatch);
        };
        return _this;
    }
    CornerControls.prototype.render = function () {
        var _a = this.props, isInDanger = _a.isInDanger, isHeaderRowEnabled = _a.isHeaderRowEnabled, isHeaderColumnEnabled = _a.isHeaderColumnEnabled, insertColumnButtonIndex = _a.insertColumnButtonIndex, insertRowButtonIndex = _a.insertRowButtonIndex, tableRef = _a.tableRef;
        if (!tableRef) {
            return null;
        }
        var isActive = this.isActive();
        return (React.createElement("div", { className: types_1.TableCssClassName.CORNER_CONTROLS + " " + (isActive ? 'active' : '') },
            React.createElement("button", { type: "button", className: types_1.TableCssClassName.CONTROLS_CORNER_BUTTON + " " + (isActive && isInDanger ? 'danger' : ''), onClick: this.selectTable, onMouseOver: this.hoverTable, onMouseOut: this.clearHoverSelection }),
            !isHeaderColumnEnabled && (React.createElement(InsertButton_1.default, { type: "column", tableRef: tableRef, index: 0, showInsertButton: insertColumnButtonIndex === 0, onMouseDown: this.insertColumn })),
            !isHeaderRowEnabled && (React.createElement(InsertButton_1.default, { type: "row", tableRef: tableRef, index: 0, showInsertButton: insertRowButtonIndex === 0, onMouseDown: this.insertRow }))));
    };
    return CornerControls;
}(react_1.Component));
exports.default = CornerControls;
//# sourceMappingURL=index.js.map