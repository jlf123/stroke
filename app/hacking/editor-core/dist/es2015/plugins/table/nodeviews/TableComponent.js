import * as tslib_1 from "tslib";
import * as React from 'react';
import rafSchedule from 'raf-schd';
import { browser, calcTableWidth, akEditorMobileBreakoutPoint, } from '@atlaskit/editor-common';
import TableFloatingControls from '../ui/TableFloatingControls';
import ColumnControls from '../ui/TableFloatingControls/ColumnControls';
import { getPluginState } from '../pm-plugins/main';
import { scaleTable, setColumnWidths, } from '../pm-plugins/table-resizing';
import { TableCssClassName as ClassName } from '../types';
import * as classnames from 'classnames';
var isIE11 = browser.ie_version === 11;
import { containsHeaderRow, checkIfHeaderColumnEnabled, checkIfHeaderRowEnabled, } from '../utils';
var TableComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TableComponent, _super);
    function TableComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            scroll: 0,
            tableContainerWidth: 'inherit',
        };
        _this.handleScroll = function (event) {
            if (!_this.wrapper || event.target !== _this.wrapper) {
                return;
            }
            _this.setState({ scroll: _this.wrapper.scrollLeft });
        };
        _this.handleScrollDebounced = rafSchedule(_this.handleScroll);
        // Disable inline table editing and resizing controls in Firefox
        // https://github.com/ProseMirror/prosemirror/issues/432
        if ('execCommand' in document) {
            ['enableObjectResizing', 'enableInlineTableEditing'].forEach(function (cmd) {
                if (document.queryCommandSupported(cmd)) {
                    document.execCommand(cmd, false, 'false');
                }
            });
        }
        return _this;
    }
    TableComponent.prototype.componentDidMount = function () {
        var _a = this.props, onComponentMount = _a.onComponentMount, allowColumnResizing = _a.allowColumnResizing;
        onComponentMount();
        if (allowColumnResizing && this.wrapper && !isIE11) {
            this.wrapper.addEventListener('scroll', this.handleScrollDebounced);
        }
        if (allowColumnResizing) {
            var _b = this.props, node_1 = _b.node, containerWidth_1 = _b.containerWidth;
            setColumnWidths(this.table, node_1, containerWidth_1.width, node_1.attrs.layout);
            this.setState(function () { return ({
                tableContainerWidth: calcTableWidth(node_1.attrs.layout, containerWidth_1.width),
            }); });
        }
    };
    TableComponent.prototype.componentWillUnmount = function () {
        if (this.wrapper && !isIE11) {
            this.wrapper.removeEventListener('scroll', this.handleScrollDebounced);
        }
        this.handleScrollDebounced.cancel();
    };
    TableComponent.prototype.componentDidUpdate = function (prevProps) {
        updateRightShadow(this.wrapper, this.table, this.rightShadow);
        if (this.props.allowColumnResizing && this.table) {
            this.handleTableResizing(prevProps);
        }
    };
    TableComponent.prototype.render = function () {
        var _this = this;
        var _a;
        var _b = this.props, view = _b.view, node = _b.node, pluginState = _b.pluginState, tableResizingPluginState = _b.tableResizingPluginState, width = _b.width;
        var _c = pluginState.pluginConfig.allowControls, allowControls = _c === void 0 ? true : _c;
        // doesn't work well with WithPluginState
        var _d = getPluginState(view.state), isInDanger = _d.isInDanger, hoveredColumns = _d.hoveredColumns, hoveredRows = _d.hoveredRows, insertColumnButtonIndex = _d.insertColumnButtonIndex, insertRowButtonIndex = _d.insertRowButtonIndex;
        var tableRef = this.table || undefined;
        var tableActive = this.table === pluginState.tableRef &&
            (!tableResizingPluginState || !tableResizingPluginState.dragging);
        var scroll = this.state.scroll;
        var rowControls = [
            React.createElement("div", { key: 0, className: ClassName.ROW_CONTROLS_WRAPPER + " " + (scroll > 0 ? ClassName.TABLE_LEFT_SHADOW : '') },
                React.createElement(TableFloatingControls, { editorView: view, tableRef: tableRef, tableActive: tableActive, hoveredRows: hoveredRows, isInDanger: isInDanger, isNumberColumnEnabled: node.attrs.isNumberColumnEnabled, isHeaderColumnEnabled: checkIfHeaderColumnEnabled(view.state), isHeaderRowEnabled: checkIfHeaderRowEnabled(view.state), hasHeaderRow: containsHeaderRow(view.state, node), 
                    // pass `selection` and `tableHeight` to control re-render
                    selection: view.state.selection, tableHeight: tableRef ? tableRef.offsetHeight : undefined, insertColumnButtonIndex: insertColumnButtonIndex, insertRowButtonIndex: insertRowButtonIndex })),
        ];
        var columnControls = [
            React.createElement("div", { key: 0, className: ClassName.COLUMN_CONTROLS_WRAPPER },
                React.createElement(ColumnControls, { editorView: view, tableRef: tableRef, ref: function (elem) { return (_this.columnControls = elem); }, hoveredColumns: hoveredColumns, isInDanger: isInDanger, 
                    // pass `selection` and `numberOfColumns` to control re-render
                    selection: view.state.selection, numberOfColumns: node.firstChild.childCount, insertColumnButtonIndex: insertColumnButtonIndex })),
        ];
        return (React.createElement("div", { style: {
                width: this.state.tableContainerWidth,
            }, className: classnames(ClassName.TABLE_CONTAINER, (_a = {},
                _a[ClassName.WITH_CONTROLS] = tableActive,
                _a['less-padding'] = width < akEditorMobileBreakoutPoint,
                _a)), "data-number-column": node.attrs.isNumberColumnEnabled, "data-layout": node.attrs.layout },
            allowControls && rowControls,
            React.createElement("div", { className: classnames(ClassName.TABLE_NODE_WRAPPER), ref: function (elem) {
                    _this.wrapper = elem;
                    _this.props.contentDOM(elem ? elem : undefined);
                    if (elem) {
                        _this.table = elem.querySelector('table');
                    }
                } }, allowControls && columnControls),
            React.createElement("div", { ref: function (elem) {
                    _this.rightShadow = elem;
                }, className: ClassName.TABLE_RIGHT_SHADOW })));
    };
    TableComponent.prototype.handleTableResizing = function (prevProps) {
        var _a = this.props, view = _a.view, node = _a.node, getPos = _a.getPos, containerWidth = _a.containerWidth;
        var prevAttrs = prevProps.node.attrs;
        var currentAttrs = node.attrs;
        var prevColCount = prevProps.node.firstChild.childCount;
        var currentColCount = node.firstChild.childCount;
        if (prevColCount !== currentColCount ||
            prevAttrs.layout !== currentAttrs.layout ||
            prevAttrs.isNumberColumnEnabled !== currentAttrs.isNumberColumnEnabled ||
            prevProps.containerWidth !== containerWidth) {
            scaleTable(view, this.table, node, getPos(), containerWidth.width, currentAttrs.layout);
            if (this.columnControls) {
                this.columnControls.forceUpdate();
            }
            this.setState(function () { return ({
                tableContainerWidth: calcTableWidth(currentAttrs.layout, containerWidth.width),
            }); });
        }
    };
    return TableComponent;
}(React.Component));
export var updateRightShadow = function (wrapper, table, rightShadow) {
    if (table && wrapper && rightShadow) {
        var diff = table.offsetWidth - wrapper.offsetWidth;
        rightShadow.style.display =
            diff > 0 && diff > wrapper.scrollLeft ? 'block' : 'none';
    }
    return;
};
export default TableComponent;
//# sourceMappingURL=TableComponent.js.map