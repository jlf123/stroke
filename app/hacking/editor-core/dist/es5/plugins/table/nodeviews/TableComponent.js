"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var raf_schd_1 = require("raf-schd");
var editor_common_1 = require("@atlaskit/editor-common");
var TableFloatingControls_1 = require("../ui/TableFloatingControls");
var ColumnControls_1 = require("../ui/TableFloatingControls/ColumnControls");
var main_1 = require("../pm-plugins/main");
var table_resizing_1 = require("../pm-plugins/table-resizing");
var types_1 = require("../types");
var classnames = require("classnames");
var isIE11 = editor_common_1.browser.ie_version === 11;
var utils_1 = require("../utils");
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
        _this.handleScrollDebounced = raf_schd_1.default(_this.handleScroll);
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
            table_resizing_1.setColumnWidths(this.table, node_1, containerWidth_1.width, node_1.attrs.layout);
            this.setState(function () { return ({
                tableContainerWidth: editor_common_1.calcTableWidth(node_1.attrs.layout, containerWidth_1.width),
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
        exports.updateRightShadow(this.wrapper, this.table, this.rightShadow);
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
        var _d = main_1.getPluginState(view.state), isInDanger = _d.isInDanger, hoveredColumns = _d.hoveredColumns, hoveredRows = _d.hoveredRows, insertColumnButtonIndex = _d.insertColumnButtonIndex, insertRowButtonIndex = _d.insertRowButtonIndex;
        var tableRef = this.table || undefined;
        var tableActive = this.table === pluginState.tableRef &&
            (!tableResizingPluginState || !tableResizingPluginState.dragging);
        var scroll = this.state.scroll;
        var rowControls = [
            React.createElement("div", { key: 0, className: types_1.TableCssClassName.ROW_CONTROLS_WRAPPER + " " + (scroll > 0 ? types_1.TableCssClassName.TABLE_LEFT_SHADOW : '') },
                React.createElement(TableFloatingControls_1.default, { editorView: view, tableRef: tableRef, tableActive: tableActive, hoveredRows: hoveredRows, isInDanger: isInDanger, isNumberColumnEnabled: node.attrs.isNumberColumnEnabled, isHeaderColumnEnabled: utils_1.checkIfHeaderColumnEnabled(view.state), isHeaderRowEnabled: utils_1.checkIfHeaderRowEnabled(view.state), hasHeaderRow: utils_1.containsHeaderRow(view.state, node), 
                    // pass `selection` and `tableHeight` to control re-render
                    selection: view.state.selection, tableHeight: tableRef ? tableRef.offsetHeight : undefined, insertColumnButtonIndex: insertColumnButtonIndex, insertRowButtonIndex: insertRowButtonIndex })),
        ];
        var columnControls = [
            React.createElement("div", { key: 0, className: types_1.TableCssClassName.COLUMN_CONTROLS_WRAPPER },
                React.createElement(ColumnControls_1.default, { editorView: view, tableRef: tableRef, ref: function (elem) { return (_this.columnControls = elem); }, hoveredColumns: hoveredColumns, isInDanger: isInDanger, 
                    // pass `selection` and `numberOfColumns` to control re-render
                    selection: view.state.selection, numberOfColumns: node.firstChild.childCount, insertColumnButtonIndex: insertColumnButtonIndex })),
        ];
        return (React.createElement("div", { style: {
                width: this.state.tableContainerWidth,
            }, className: classnames(types_1.TableCssClassName.TABLE_CONTAINER, (_a = {},
                _a[types_1.TableCssClassName.WITH_CONTROLS] = tableActive,
                _a['less-padding'] = width < editor_common_1.akEditorMobileBreakoutPoint,
                _a)), "data-number-column": node.attrs.isNumberColumnEnabled, "data-layout": node.attrs.layout },
            allowControls && rowControls,
            React.createElement("div", { className: classnames(types_1.TableCssClassName.TABLE_NODE_WRAPPER), ref: function (elem) {
                    _this.wrapper = elem;
                    _this.props.contentDOM(elem ? elem : undefined);
                    if (elem) {
                        _this.table = elem.querySelector('table');
                    }
                } }, allowControls && columnControls),
            React.createElement("div", { ref: function (elem) {
                    _this.rightShadow = elem;
                }, className: types_1.TableCssClassName.TABLE_RIGHT_SHADOW })));
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
            table_resizing_1.scaleTable(view, this.table, node, getPos(), containerWidth.width, currentAttrs.layout);
            if (this.columnControls) {
                this.columnControls.forceUpdate();
            }
            this.setState(function () { return ({
                tableContainerWidth: editor_common_1.calcTableWidth(currentAttrs.layout, containerWidth.width),
            }); });
        }
    };
    return TableComponent;
}(React.Component));
exports.updateRightShadow = function (wrapper, table, rightShadow) {
    if (table && wrapper && rightShadow) {
        var diff = table.offsetWidth - wrapper.offsetWidth;
        rightShadow.style.display =
            diff > 0 && diff > wrapper.scrollLeft ? 'block' : 'none';
    }
    return;
};
exports.default = TableComponent;
//# sourceMappingURL=TableComponent.js.map