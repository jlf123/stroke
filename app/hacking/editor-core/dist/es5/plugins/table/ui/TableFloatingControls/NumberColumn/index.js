"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var prosemirror_utils_1 = require("prosemirror-utils");
var actions_1 = require("../../../actions");
var types_1 = require("../../../types");
var NumberColumn = /** @class */ (function (_super) {
    tslib_1.__extends(NumberColumn, _super);
    function NumberColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hoverRows = function (index) {
            return _this.props.tableActive ? _this.props.hoverRows([index]) : null;
        };
        _this.selectRow = function (index) {
            return _this.props.tableActive ? _this.props.selectRow(index) : null;
        };
        _this.clearHoverSelection = function () {
            var _a = _this.props, tableActive = _a.tableActive, editorView = _a.editorView;
            if (tableActive) {
                var state = editorView.state, dispatch = editorView.dispatch;
                actions_1.clearHoverSelection(state, dispatch);
            }
        };
        _this.getClassNames = function (index) {
            var _a = _this.props, hoveredRows = _a.hoveredRows, editorView = _a.editorView, isInDanger = _a.isInDanger;
            var isActive = prosemirror_utils_1.isRowSelected(index)(editorView.state.selection) ||
                (hoveredRows || []).indexOf(index) !== -1;
            return [
                types_1.TableCssClassName.NUMBERED_COLUMN_BUTTON,
                isActive ? 'active' : '',
                isActive && isInDanger ? 'danger' : '',
            ].join(' ');
        };
        return _this;
    }
    NumberColumn.prototype.render = function () {
        var _this = this;
        var _a = this.props, tableRef = _a.tableRef, hasHeaderRow = _a.hasHeaderRow;
        var tbody = tableRef.querySelector('tbody');
        if (!tbody) {
            return null;
        }
        var rows = tbody.querySelectorAll('tr');
        return (React.createElement("div", { className: types_1.TableCssClassName.NUMBERED_COLUMN }, Array.from(Array(rows.length).keys()).map(function (index) { return (React.createElement("div", { key: "wrapper-" + index, className: _this.getClassNames(index), style: {
                height: rows[index].offsetHeight + 1,
            }, onClick: function () { return _this.selectRow(index); }, onMouseOver: function () { return _this.hoverRows(index); }, onMouseOut: _this.clearHoverSelection }, hasHeaderRow ? (index > 0 ? index : null) : index + 1)); })));
    };
    return NumberColumn;
}(react_1.Component));
exports.default = NumberColumn;
//# sourceMappingURL=index.js.map