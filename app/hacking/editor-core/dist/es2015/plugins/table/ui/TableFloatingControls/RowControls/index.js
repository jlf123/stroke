import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { isCellSelection } from 'prosemirror-utils';
import { clearHoverSelection, insertRow, deleteSelectedRows, } from '../../../actions';
import InsertButton from '../InsertButton';
import DeleteButton from '../DeleteButton';
import { getRowHeights, isRowInsertButtonVisible, isRowDeleteButtonVisible, getRowDeleteButtonParams, getRowsParams, getRowClassNames, } from '../../../utils';
import { TableCssClassName as ClassName } from '../../../types';
import tableMessages from '../../messages';
var RowControls = /** @class */ (function (_super) {
    tslib_1.__extends(RowControls, _super);
    function RowControls() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.clearHoverSelection = function () {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            clearHoverSelection(state, dispatch);
        };
        _this.insertRow = function (row) {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            insertRow(row)(state, dispatch);
        };
        _this.deleteSelectedRows = function () {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            deleteSelectedRows(state, dispatch);
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
        var rowHeights = getRowHeights(tableRef);
        var rowsParams = getRowsParams(rowHeights);
        var deleteBtnParams = getRowDeleteButtonParams(rowHeights, selection);
        return (React.createElement("div", { className: ClassName.ROW_CONTROLS },
            React.createElement("div", { className: ClassName.ROW_CONTROLS_INNER },
                rowsParams.map(function (_a) {
                    var startIndex = _a.startIndex, endIndex = _a.endIndex, height = _a.height;
                    return (React.createElement("div", { className: ClassName.ROW_CONTROLS_BUTTON_WRAP + " " + getRowClassNames(startIndex, selection, hoveredRows, isInDanger), key: startIndex, style: { height: height } },
                        React.createElement("button", { type: "button", className: ClassName.CONTROLS_BUTTON, onMouseDown: function () { return _this.props.selectRow(startIndex); }, onMouseOver: function () { return _this.props.hoverRows([startIndex]); }, onMouseOut: _this.clearHoverSelection }, !isCellSelection(selection) && (React.createElement(React.Fragment, null,
                            React.createElement("div", { className: ClassName.CONTROLS_BUTTON_OVERLAY, "data-index": startIndex }),
                            React.createElement("div", { className: ClassName.CONTROLS_BUTTON_OVERLAY, "data-index": endIndex })))),
                        isRowInsertButtonVisible(endIndex, selection) && (React.createElement(InsertButton, { type: "row", tableRef: tableRef, index: endIndex, showInsertButton: insertRowButtonIndex === endIndex, onMouseDown: function () { return _this.insertRow(endIndex); } }))));
                }),
                isRowDeleteButtonVisible(selection) && deleteBtnParams && (React.createElement(DeleteButton, { key: "delete", removeLabel: tableMessages.removeRows, style: { top: deleteBtnParams.top }, onClick: this.deleteSelectedRows, onMouseEnter: function () {
                        return _this.props.hoverRows(deleteBtnParams.indexes, true);
                    }, onMouseLeave: this.clearHoverSelection })))));
    };
    return RowControls;
}(Component));
export default RowControls;
//# sourceMappingURL=index.js.map