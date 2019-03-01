"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var prosemirror_utils_1 = require("prosemirror-utils");
var editor_common_1 = require("@atlaskit/editor-common");
var InsertButton_1 = require("../InsertButton");
var DeleteButton_1 = require("../DeleteButton");
var utils_1 = require("../../../utils");
var actions_1 = require("../../../actions");
var types_1 = require("../../../types");
var messages_1 = require("../../messages");
var ColumnControls = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnControls, _super);
    function ColumnControls() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.deleteColumns = function (event) {
            event.preventDefault();
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            actions_1.deleteSelectedColumns(state, dispatch);
            _this.clearHoverSelection();
        };
        _this.selectColumn = function (column) {
            var editorView = _this.props.editorView;
            var state = editorView.state, dispatch = editorView.dispatch;
            // fix for issue ED-4665
            if (editor_common_1.browser.ie_version === 11) {
                editorView.dom.blur();
            }
            actions_1.selectColumn(column)(state, dispatch);
        };
        _this.hoverColumns = function (columns, danger) {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            actions_1.hoverColumns(columns, danger)(state, dispatch);
        };
        _this.clearHoverSelection = function () {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            actions_1.clearHoverSelection(state, dispatch);
        };
        _this.insertColumn = function (column) {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            actions_1.insertColumn(column)(state, dispatch);
        };
        return _this;
    }
    ColumnControls.prototype.shouldComponentUpdate = function (nextProps) {
        var _a = this.props, tableRef = _a.tableRef, selection = _a.selection, numberOfColumns = _a.numberOfColumns, hoveredColumns = _a.hoveredColumns, insertColumnButtonIndex = _a.insertColumnButtonIndex, isInDanger = _a.isInDanger;
        if (nextProps.tableRef) {
            var controls = nextProps.tableRef.parentNode.firstChild;
            // checks if controls width is different from table width
            // 1px difference is acceptable and occurs in some situations due to the browser rendering specifics
            var shouldUpdate = Math.abs(controls.offsetWidth - nextProps.tableRef.offsetWidth) > 1;
            if (shouldUpdate) {
                return true;
            }
        }
        return (tableRef !== nextProps.tableRef ||
            insertColumnButtonIndex !== nextProps.insertColumnButtonIndex ||
            isInDanger !== nextProps.isInDanger ||
            numberOfColumns !== nextProps.numberOfColumns ||
            hoveredColumns !== nextProps.hoveredColumns ||
            utils_1.isSelectionUpdated(selection, nextProps.selection));
    };
    ColumnControls.prototype.render = function () {
        var _this = this;
        var _a = this.props, editorView = _a.editorView, tableRef = _a.tableRef, insertColumnButtonIndex = _a.insertColumnButtonIndex, hoveredColumns = _a.hoveredColumns, isInDanger = _a.isInDanger;
        if (!tableRef || !tableRef.querySelector('tr')) {
            return null;
        }
        var selection = editorView.state.selection;
        var columnsWidths = utils_1.getColumnsWidths(editorView);
        var columnsParams = utils_1.getColumnsParams(columnsWidths);
        var deleteBtnParams = utils_1.getColumnDeleteButtonParams(columnsWidths, selection);
        return (React.createElement("div", { className: types_1.TableCssClassName.COLUMN_CONTROLS },
            React.createElement("div", { className: types_1.TableCssClassName.COLUMN_CONTROLS_INNER },
                React.createElement(React.Fragment, null,
                    columnsParams.map(function (_a) {
                        var startIndex = _a.startIndex, endIndex = _a.endIndex, width = _a.width;
                        return (React.createElement("div", { className: types_1.TableCssClassName.COLUMN_CONTROLS_BUTTON_WRAP + " " + utils_1.getColumnClassNames(startIndex, selection, hoveredColumns, isInDanger), key: startIndex, style: { width: width }, onMouseDown: function (e) { return e.preventDefault(); } },
                            React.createElement("button", { type: "button", className: types_1.TableCssClassName.CONTROLS_BUTTON, onMouseDown: function () { return _this.selectColumn(startIndex); }, onMouseOver: function () { return _this.hoverColumns([startIndex]); }, onMouseOut: _this.clearHoverSelection }, !prosemirror_utils_1.isCellSelection(selection) && (React.createElement(React.Fragment, null,
                                React.createElement("div", { className: types_1.TableCssClassName.CONTROLS_BUTTON_OVERLAY, "data-index": startIndex }),
                                React.createElement("div", { className: types_1.TableCssClassName.CONTROLS_BUTTON_OVERLAY, "data-index": endIndex })))),
                            utils_1.isColumnInsertButtonVisible(endIndex, selection) && (React.createElement(InsertButton_1.default, { type: "column", tableRef: tableRef, index: endIndex, showInsertButton: insertColumnButtonIndex === endIndex, onMouseDown: function () { return _this.insertColumn(endIndex); } }))));
                    }),
                    utils_1.isColumnDeleteButtonVisible(selection) && deleteBtnParams && (React.createElement(DeleteButton_1.default, { key: "delete", removeLabel: messages_1.default.removeColumns, style: { left: deleteBtnParams.left }, onClick: this.deleteColumns, onMouseEnter: function () {
                            return _this.hoverColumns(deleteBtnParams.indexes, true);
                        }, onMouseLeave: this.clearHoverSelection }))))));
    };
    return ColumnControls;
}(react_1.Component));
exports.default = ColumnControls;
//# sourceMappingURL=index.js.map