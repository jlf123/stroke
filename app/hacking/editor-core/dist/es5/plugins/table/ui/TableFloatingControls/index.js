"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var editor_common_1 = require("@atlaskit/editor-common");
var CornerControls_1 = require("./CornerControls");
var RowControls_1 = require("./RowControls");
var NumberColumn_1 = require("./NumberColumn");
var utils_1 = require("../../utils");
var actions_1 = require("../../actions");
var TableFloatingControls = /** @class */ (function (_super) {
    tslib_1.__extends(TableFloatingControls, _super);
    function TableFloatingControls() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectRow = function (row) {
            var editorView = _this.props.editorView;
            var state = editorView.state, dispatch = editorView.dispatch;
            // fix for issue ED-4665
            if (editor_common_1.browser.ie_version === 11) {
                editorView.dom.blur();
            }
            actions_1.selectRow(row)(state, dispatch);
            actions_1.clearHoverSelection(editorView.state, dispatch);
        };
        _this.hoverRows = function (rows, danger) {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            actions_1.hoverRows(rows, danger)(state, dispatch);
        };
        return _this;
    }
    TableFloatingControls.prototype.shouldComponentUpdate = function (nextProps) {
        var _a = this.props, tableRef = _a.tableRef, isInDanger = _a.isInDanger, isHeaderRowEnabled = _a.isHeaderRowEnabled, isHeaderColumnEnabled = _a.isHeaderColumnEnabled, isNumberColumnEnabled = _a.isNumberColumnEnabled, hoveredRows = _a.hoveredRows, selection = _a.selection, tableHeight = _a.tableHeight, tableActive = _a.tableActive, insertColumnButtonIndex = _a.insertColumnButtonIndex, insertRowButtonIndex = _a.insertRowButtonIndex;
        return (tableRef !== nextProps.tableRef ||
            insertColumnButtonIndex !== nextProps.insertColumnButtonIndex ||
            insertRowButtonIndex !== nextProps.insertRowButtonIndex ||
            tableHeight !== nextProps.tableHeight ||
            tableActive !== nextProps.tableActive ||
            isInDanger !== nextProps.isInDanger ||
            hoveredRows !== nextProps.hoveredRows ||
            isHeaderRowEnabled !== nextProps.isHeaderRowEnabled ||
            isHeaderColumnEnabled !== nextProps.isHeaderColumnEnabled ||
            isNumberColumnEnabled !== nextProps.isNumberColumnEnabled ||
            utils_1.isSelectionUpdated(selection, nextProps.selection));
    };
    TableFloatingControls.prototype.render = function () {
        var _a = this.props, editorView = _a.editorView, tableRef = _a.tableRef, isInDanger = _a.isInDanger, isNumberColumnEnabled = _a.isNumberColumnEnabled, isHeaderColumnEnabled = _a.isHeaderColumnEnabled, isHeaderRowEnabled = _a.isHeaderRowEnabled, tableActive = _a.tableActive, hasHeaderRow = _a.hasHeaderRow, hoveredRows = _a.hoveredRows, insertColumnButtonIndex = _a.insertColumnButtonIndex, insertRowButtonIndex = _a.insertRowButtonIndex;
        if (!tableRef) {
            return null;
        }
        return (React.createElement("div", { onMouseDown: function (e) { return e.preventDefault(); } },
            isNumberColumnEnabled ? (React.createElement(NumberColumn_1.default, { editorView: editorView, hoverRows: this.hoverRows, tableRef: tableRef, tableActive: tableActive, hoveredRows: hoveredRows, hasHeaderRow: hasHeaderRow, isInDanger: isInDanger, selectRow: this.selectRow })) : null,
            React.createElement(CornerControls_1.default, { editorView: editorView, tableRef: tableRef, isInDanger: isInDanger, isHeaderColumnEnabled: isHeaderColumnEnabled, isHeaderRowEnabled: isHeaderRowEnabled, insertColumnButtonIndex: insertColumnButtonIndex, insertRowButtonIndex: insertRowButtonIndex, hoveredRows: hoveredRows }),
            React.createElement(RowControls_1.default, { editorView: editorView, tableRef: tableRef, hoverRows: this.hoverRows, hoveredRows: hoveredRows, isInDanger: isInDanger, selectRow: this.selectRow, insertRowButtonIndex: insertRowButtonIndex })));
    };
    return TableFloatingControls;
}(react_1.Component));
exports.default = TableFloatingControls;
//# sourceMappingURL=index.js.map