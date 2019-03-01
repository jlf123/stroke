"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_intl_1 = require("react-intl");
var adf_schema_1 = require("@atlaskit/adf-schema");
var chevron_down_1 = require("@atlaskit/icon/glyph/chevron-down");
var ReactNodeView_1 = require("../../../nodeviews/ReactNodeView");
var ToolbarButton_1 = require("../../../ui/ToolbarButton");
var WithPluginState_1 = require("../../../ui/WithPluginState");
var messages_1 = require("../ui/messages");
var main_1 = require("../pm-plugins/main");
var actions_1 = require("../actions");
var types_1 = require("../types");
var utils_1 = require("../../../utils");
var editor_disabled_1 = require("../../editor-disabled");
var Cell = /** @class */ (function (_super) {
    tslib_1.__extends(Cell, _super);
    function Cell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function () {
            var _a = _this.props.view, state = _a.state, dispatch = _a.dispatch;
            actions_1.toggleContextualMenu(state, dispatch);
        };
        return _this;
    }
    Cell.prototype.shouldComponentUpdate = function (nextProps) {
        return (this.props.withCursor !== nextProps.withCursor ||
            this.props.isContextualMenuOpen !== nextProps.isContextualMenuOpen);
    };
    Cell.prototype.render = function () {
        var _a = this.props, withCursor = _a.withCursor, isContextualMenuOpen = _a.isContextualMenuOpen, forwardRef = _a.forwardRef, formatMessage = _a.intl.formatMessage, disabled = _a.disabled, appearance = _a.appearance;
        var labelCellOptions = formatMessage(messages_1.default.cellOptions);
        return (React.createElement("div", { className: types_1.TableCssClassName.CELL_NODEVIEW_WRAPPER, ref: forwardRef }, withCursor && !disabled && appearance !== 'mobile' && (React.createElement("div", { className: types_1.TableCssClassName.CONTEXTUAL_MENU_BUTTON },
            React.createElement(ToolbarButton_1.default, { selected: isContextualMenuOpen, title: labelCellOptions, onClick: this.handleClick, iconBefore: React.createElement(chevron_down_1.default, { label: labelCellOptions }) })))));
    };
    return Cell;
}(React.Component));
var CellComponent = react_intl_1.injectIntl(Cell);
var CellView = /** @class */ (function (_super) {
    tslib_1.__extends(CellView, _super);
    function CellView(props) {
        return _super.call(this, props.node, props.view, props.getPos, props.portalProviderAPI, props) || this;
    }
    CellView.prototype.createDomRef = function () {
        var tableCell = this.view.state.schema.nodes.tableCell;
        this.cell = document.createElement("t" + (this.node.type === tableCell ? 'd' : 'h'));
        return this.cell;
    };
    CellView.prototype.getContentDOM = function () {
        var dom = document.createElement('div');
        dom.className = types_1.TableCssClassName.TABLE_CELL_NODEVIEW_CONTENT_DOM;
        return { dom: dom };
    };
    CellView.prototype.setDomAttrs = function (node) {
        var cell = this.cell;
        if (cell) {
            var attrs_1 = adf_schema_1.setCellAttrs(node, cell);
            Object.keys(attrs_1).forEach(function (attr) {
                cell.setAttribute(attr, attrs_1[attr]);
            });
        }
    };
    CellView.prototype.render = function (props, forwardRef) {
        var _this = this;
        // nodeview does not re-render on selection changes
        // so we trigger render manually to hide/show contextual menu button when `targetCellPosition` is updated
        return (React.createElement(WithPluginState_1.default, { plugins: {
                pluginState: main_1.pluginKey,
                editorDisabledPlugin: editor_disabled_1.pluginKey,
            }, editorView: props.view, render: function (_a) {
                var pluginState = _a.pluginState, editorDisabledPlugin = _a.editorDisabledPlugin;
                return (React.createElement(CellComponent, { forwardRef: forwardRef, withCursor: _this.getPos() === pluginState.targetCellPosition, isContextualMenuOpen: !!pluginState.isContextualMenuOpen, view: props.view, appearance: props.appearance, disabled: (editorDisabledPlugin || {}).editorDisabled }));
            } }));
    };
    CellView.prototype.ignoreMutation = function (record) {
        // @see https://github.com/ProseMirror/prosemirror/issues/862
        var target = record.target;
        if (record.attributeName === 'class' ||
            (target && utils_1.closestElement(target, "." + types_1.TableCssClassName.CELL_NODEVIEW_WRAPPER))) {
            return true;
        }
        return false;
    };
    return CellView;
}(ReactNodeView_1.default));
exports.createCellView = function (portalProviderAPI, appearance) { return function (node, view, getPos) {
    return new CellView({
        node: node,
        view: view,
        getPos: getPos,
        portalProviderAPI: portalProviderAPI,
        appearance: appearance,
    }).init();
}; };
//# sourceMappingURL=cell.js.map