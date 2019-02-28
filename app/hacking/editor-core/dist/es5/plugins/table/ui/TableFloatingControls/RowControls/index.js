"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var prosemirror_utils_1 = require("prosemirror-utils");
var actions_1 = require("../../../actions");
var InsertButton_1 = require("../InsertButton");
var DeleteButton_1 = require("../DeleteButton");
var utils_1 = require("../../../utils");
var types_1 = require("../../../types");
var messages_1 = require("../../messages");
var RowControls = /** @class */ (function (_super) {
    tslib_1.__extends(RowControls, _super);
    function RowControls() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.clearHoverSelection = function () {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            actions_1.clearHoverSelection(state, dispatch);
        };
        _this.insertRow = function (row) {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            actions_1.insertRow(row)(state, dispatch);
        };
        _this.deleteSelectedRows = function () {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            actions_1.deleteSelectedRows(state, dispatch);
            _this.clearHoverSelection();
        };
        return _this;
    }
    RowControls.prototype.render = function () {
        var _this = this;
        var _a = this.props, editorView = _a.editorView, tableRef = _a.tableRef, insertRowButtonIndex = _a.insertRowButtonIndex, hoveredRows = _a.hoveredRows, isInDanger = _a.isInDanger;
        if (!tableRef) {
            return null;
        }
        var selection = editorView.state.selection;
        var rowHeights = utils_1.getRowHeights(tableRef);
        var rowsParams = utils_1.getRowsParams(rowHeights);
        var deleteBtnParams = utils_1.getRowDeleteButtonParams(rowHeights, selection);
        return (React.createElement("div", { className: types_1.TableCssClassName.ROW_CONTROLS },
            React.createElement("div", { className: types_1.TableCssClassName.ROW_CONTROLS_INNER },
                rowsParams.map(function (_a) {
                    var startIndex = _a.startIndex, endIndex = _a.endIndex, height = _a.height;
                    return (React.createElement("div", { className: types_1.TableCssClassName.ROW_CONTROLS_BUTTON_WRAP + " " + utils_1.getRowClassNames(startIndex, selection, hoveredRows, isInDanger), key: startIndex, style: { height: height } },
                        React.createElement("button", { type: "button", className: types_1.TableCssClassName.CONTROLS_BUTTON, onMouseDown: function () { return _this.props.selectRow(startIndex); }, onMouseOver: function () { return _this.props.hoverRows([startIndex]); }, onMouseOut: _this.clearHoverSelection }, !prosemirror_utils_1.isCellSelection(selection) && (React.createElement(React.Fragment, null,
                            React.createElement("div", { className: types_1.TableCssClassName.CONTROLS_BUTTON_OVERLAY, "data-index": startIndex }),
                            React.createElement("div", { className: types_1.TableCssClassName.CONTROLS_BUTTON_OVERLAY, "data-index": endIndex })))),
                        utils_1.isRowInsertButtonVisible(endIndex, selection) && (React.createElement(InsertButton_1.default, { type: "row", tableRef: tableRef, index: endIndex, showInsertButton: insertRowButtonIndex === endIndex, onMouseDown: function () { return _this.insertRow(endIndex); } }))));
                }),
                utils_1.isRowDeleteButtonVisible(selection) && deleteBtnParams && (React.createElement(DeleteButton_1.default, { key: "delete", removeLabel: messages_1.default.removeRows, style: { top: deleteBtnParams.top }, onClick: this.deleteSelectedRows, onMouseEnter: function () {
                        return _this.props.hoverRows(deleteBtnParams.indexes, true);
                    }, onMouseLeave: this.clearHoverSelection })))));
    };
    return RowControls;
}(react_1.Component));
exports.default = RowControls;
//# sourceMappingURL=index.js.map