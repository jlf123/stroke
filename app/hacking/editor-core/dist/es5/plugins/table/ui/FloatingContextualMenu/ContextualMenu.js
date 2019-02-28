"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var react_intl_1 = require("react-intl");
var prosemirror_tables_1 = require("prosemirror-tables");
var theme_1 = require("@atlaskit/theme");
var adf_schema_1 = require("@atlaskit/adf-schema");
var actions_1 = require("../../actions");
var types_1 = require("../../types");
var styles_1 = require("../styles");
var styles_2 = require("../../../../ui/styles");
var DropdownMenu_1 = require("../../../../ui/DropdownMenu");
var analytics_1 = require("../../../../analytics");
var ColorPalette_1 = require("../../../../ui/ColorPalette");
var messages_1 = require("../messages");
exports.messages = react_intl_1.defineMessages({
    cellBackground: {
        id: 'fabric.editor.cellBackground',
        defaultMessage: 'Cell background',
        description: 'Change the background color of a table cell.',
    },
    mergeCells: {
        id: 'fabric.editor.mergeCells',
        defaultMessage: 'Merge cells',
        description: 'Merge tables cells together.',
    },
    splitCell: {
        id: 'fabric.editor.splitCell',
        defaultMessage: 'Split cell',
        description: 'Split a merged table cell.',
    },
    clearCells: {
        id: 'fabric.editor.clearCells',
        defaultMessage: 'Clear {0, plural, one {cell} other {cells}}',
        description: 'Clears the contents of the selected cells (this does not delete the cells themselves).',
    },
});
var ContextualMenu = /** @class */ (function (_super) {
    tslib_1.__extends(ContextualMenu, _super);
    function ContextualMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isSubmenuOpen: false,
        };
        _this.handleSubMenuRef = function (ref) {
            var boundariesElement = _this.props.boundariesElement;
            if (!(boundariesElement && ref)) {
                return;
            }
            var boundariesRect = boundariesElement.getBoundingClientRect();
            var rect = ref.getBoundingClientRect();
            if (rect.left + rect.width - boundariesRect.left > boundariesRect.width) {
                ref.style.left = "-" + rect.width + "px";
            }
        };
        _this.createItems = function () {
            var _a = _this.props, allowMergeCells = _a.allowMergeCells, allowBackgroundColor = _a.allowBackgroundColor, state = _a.editorView.state, targetCellPosition = _a.targetCellPosition, isOpen = _a.isOpen, selectionRect = _a.selectionRect, formatMessage = _a.intl.formatMessage;
            var items = [];
            var isSubmenuOpen = _this.state.isSubmenuOpen;
            if (allowBackgroundColor) {
                var node = isOpen && targetCellPosition
                    ? state.doc.nodeAt(targetCellPosition)
                    : null;
                var background = node && node.attrs.background ? node.attrs.background : '#ffffff';
                items.push({
                    content: formatMessage(exports.messages.cellBackground),
                    value: { name: 'background' },
                    elemAfter: (React.createElement("div", null,
                        React.createElement("div", { className: types_1.TableCssClassName.CONTEXTUAL_MENU_ICON, style: { background: background } }),
                        isSubmenuOpen && (React.createElement("div", { className: types_1.TableCssClassName.CONTEXTUAL_SUBMENU, ref: _this.handleSubMenuRef },
                            React.createElement(ColorPalette_1.default, { palette: adf_schema_1.tableBackgroundColorPalette, borderColors: adf_schema_1.tableBackgroundBorderColors, onClick: _this.setColor, selectedColor: background, checkMarkColor: theme_1.colors.N500 }))))),
                });
            }
            items.push({
                content: formatMessage(messages_1.default.insertColumn),
                value: { name: 'insert_column' },
            });
            items.push({
                content: formatMessage(messages_1.default.insertRow),
                value: { name: 'insert_row' },
            });
            var right = selectionRect.right, left = selectionRect.left, top = selectionRect.top, bottom = selectionRect.bottom;
            var noOfColumns = right - left;
            var noOfRows = bottom - top;
            items.push({
                content: formatMessage(messages_1.default.removeColumns, {
                    0: noOfColumns,
                }),
                value: { name: 'delete_column' },
            });
            items.push({
                content: formatMessage(messages_1.default.removeRows, {
                    0: noOfRows,
                }),
                value: { name: 'delete_row' },
            });
            if (allowMergeCells) {
                items.push({
                    content: formatMessage(exports.messages.mergeCells),
                    value: { name: 'merge' },
                    isDisabled: !prosemirror_tables_1.mergeCells(state),
                });
                items.push({
                    content: formatMessage(exports.messages.splitCell),
                    value: { name: 'split' },
                    isDisabled: !prosemirror_tables_1.splitCell(state),
                });
            }
            items.push({
                content: formatMessage(exports.messages.clearCells, {
                    0: Math.max(noOfColumns, noOfRows),
                }),
                value: { name: 'clear' },
                elemAfter: React.createElement(styles_2.Shortcut, null, "\u232B"),
            });
            return items.length ? [{ items: items }] : null;
        };
        _this.onMenuItemActivated = function (_a) {
            var item = _a.item;
            var _b = _this.props, editorView = _b.editorView, selectionRect = _b.selectionRect, targetCellPosition = _b.targetCellPosition;
            var state = editorView.state, dispatch = editorView.dispatch;
            switch (item.value.name) {
                case 'merge':
                    analytics_1.analyticsService.trackEvent('atlassian.editor.format.table.merge.button');
                    prosemirror_tables_1.mergeCells(state, dispatch);
                    _this.toggleOpen();
                    break;
                case 'split':
                    analytics_1.analyticsService.trackEvent('atlassian.editor.format.table.split.button');
                    prosemirror_tables_1.splitCell(state, dispatch);
                    _this.toggleOpen();
                    break;
                case 'clear':
                    analytics_1.analyticsService.trackEvent('atlassian.editor.format.table.split.button');
                    actions_1.emptyMultipleCells(targetCellPosition)(state, dispatch);
                    _this.toggleOpen();
                    break;
                case 'insert_column':
                    actions_1.insertColumn(selectionRect.right)(state, dispatch);
                    _this.toggleOpen();
                    break;
                case 'insert_row':
                    actions_1.insertRow(selectionRect.bottom)(state, dispatch);
                    _this.toggleOpen();
                    break;
                case 'delete_column':
                    analytics_1.analyticsService.trackEvent('atlassian.editor.format.table.delete_column.button');
                    actions_1.deleteColumns(exports.getSelectedColumnIndexes(selectionRect))(state, dispatch);
                    _this.toggleOpen();
                    break;
                case 'delete_row':
                    analytics_1.analyticsService.trackEvent('atlassian.editor.format.table.delete_row.button');
                    actions_1.deleteRows(exports.getSelectedRowIndexes(selectionRect))(state, dispatch);
                    _this.toggleOpen();
                    break;
            }
        };
        _this.toggleOpen = function () {
            var _a = _this.props, isOpen = _a.isOpen, _b = _a.editorView, state = _b.state, dispatch = _b.dispatch;
            actions_1.toggleContextualMenu(state, dispatch);
            if (!isOpen) {
                _this.setState({
                    isSubmenuOpen: false,
                });
            }
        };
        _this.handleOpenChange = function (_a) {
            var isOpen = _a.isOpen;
            var _b = _this.props.editorView, state = _b.state, dispatch = _b.dispatch;
            actions_1.toggleContextualMenu(state, dispatch);
            _this.setState({ isSubmenuOpen: false });
        };
        _this.handleItemMouseEnter = function (_a) {
            var item = _a.item;
            var _b = _this.props, _c = _b.editorView, state = _c.state, dispatch = _c.dispatch, selectionRect = _b.selectionRect;
            if (item.value.name === 'background') {
                if (!_this.state.isSubmenuOpen) {
                    _this.setState({ isSubmenuOpen: true });
                }
            }
            if (item.value.name === 'delete_column') {
                actions_1.hoverColumns(exports.getSelectedColumnIndexes(selectionRect), true)(state, dispatch);
            }
            if (item.value.name === 'delete_row') {
                actions_1.hoverRows(exports.getSelectedRowIndexes(selectionRect), true)(state, dispatch);
            }
        };
        _this.handleItemMouseLeave = function (_a) {
            var item = _a.item;
            var _b = _this.props.editorView, state = _b.state, dispatch = _b.dispatch;
            if (item.value.name === 'background') {
                _this.closeSubmenu();
            }
            if (item.value.name === 'delete_column' ||
                item.value.name === 'delete_row') {
                actions_1.clearHoverSelection(state, dispatch);
            }
        };
        _this.closeSubmenu = function () {
            if (_this.state.isSubmenuOpen) {
                _this.setState({ isSubmenuOpen: false });
            }
        };
        _this.setColor = analytics_1.withAnalytics('atlassian.editor.format.table.backgroundColor.button', function (color) {
            var _a = _this.props, targetCellPosition = _a.targetCellPosition, editorView = _a.editorView;
            var state = editorView.state, dispatch = editorView.dispatch;
            actions_1.setMultipleCellAttrs({ background: color }, targetCellPosition)(state, dispatch);
            _this.toggleOpen();
        });
        return _this;
    }
    ContextualMenu.prototype.render = function () {
        var _a = this.props, isOpen = _a.isOpen, mountPoint = _a.mountPoint, offset = _a.offset, boundariesElement = _a.boundariesElement;
        var items = this.createItems();
        if (!items) {
            return null;
        }
        return (React.createElement("div", { onMouseLeave: this.closeSubmenu },
            React.createElement(DropdownMenu_1.default, { mountTo: mountPoint, items: items, isOpen: isOpen, onOpenChange: this.handleOpenChange, onItemActivated: this.onMenuItemActivated, onMouseEnter: this.handleItemMouseEnter, onMouseLeave: this.handleItemMouseLeave, fitHeight: 188, fitWidth: styles_1.contextualMenuDropdownWidth, boundariesElement: boundariesElement, offset: offset })));
    };
    ContextualMenu.defaultProps = {
        boundariesElement: document.body,
    };
    return ContextualMenu;
}(react_1.Component));
exports.getSelectedColumnIndexes = function (selectionRect) {
    var columnIndexes = [];
    for (var i = selectionRect.left; i < selectionRect.right; i++) {
        columnIndexes.push(i);
    }
    return columnIndexes;
};
exports.getSelectedRowIndexes = function (selectionRect) {
    var rowIndexes = [];
    for (var i = selectionRect.top; i < selectionRect.bottom; i++) {
        rowIndexes.push(i);
    }
    return rowIndexes;
};
exports.default = react_intl_1.injectIntl(ContextualMenu);
//# sourceMappingURL=ContextualMenu.js.map