"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var droplist_1 = require("@atlaskit/droplist");
var item_1 = require("@atlaskit/item");
var tooltip_1 = require("@atlaskit/tooltip");
var editor_common_1 = require("@atlaskit/editor-common");
var with_outer_listeners_1 = require("../with-outer-listeners");
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  line-height: 0;\n"], ["\n  line-height: 0;\n"])));
var DropListWithOutsideListeners = with_outer_listeners_1.default(droplist_1.default);
/**
 * Hack for item to imitate old dropdown-menu selected styles
 */
var ItemWrapper = styled_components_1.default.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  ", ";\n"], ["\n  ",
    ";\n"])), function (props) {
    return props.isSelected
        ? '&& > span, && > span:hover { background: #6c798f; color: #fff; }'
        : '';
});
var ItemContentWrapper = styled_components_1.default.span(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  ", ";\n"], ["\n  ", ";\n"])), function (props) { return (props.hasElemBefore ? 'margin-left: 8px;' : ''); });
/**
 * Wrapper around @atlaskit/droplist which uses Popup and Portal to render
 * dropdown-menu outside of "overflow: hidden" containers when needed.
 *
 * Also it controls popper's placement.
 */
var DropdownMenuWrapper = /** @class */ (function (_super) {
    tslib_1.__extends(DropdownMenuWrapper, _super);
    function DropdownMenuWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            popupPlacement: ['bottom', 'left'],
        };
        _this.handleRef = function (target) {
            _this.setState({ target: target });
        };
        _this.updatePopupPlacement = function (placement) {
            _this.setState({ popupPlacement: placement });
        };
        _this.handleClose = function () {
            if (_this.props.onOpenChange) {
                _this.props.onOpenChange({ isOpen: false });
            }
        };
        return _this;
    }
    DropdownMenuWrapper.prototype.renderItem = function (item) {
        var _a = this.props, onItemActivated = _a.onItemActivated, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave;
        // onClick and value.name are the action indicators in the handlers
        // If neither are present, don't wrap in an Item.
        if (!item.onClick && !item.value && !item.value.name) {
            return React.createElement("span", { key: item.content }, item.content);
        }
        var dropListItem = (React.createElement(ItemWrapper, { key: item.key || item.content, isSelected: item.isActive },
            React.createElement(item_1.default, { elemBefore: item.elemBefore, elemAfter: item.elemAfter, isDisabled: item.isDisabled, onClick: function () { return onItemActivated && onItemActivated({ item: item }); }, onMouseEnter: function () { return onMouseEnter && onMouseEnter({ item: item }); }, onMouseLeave: function () { return onMouseLeave && onMouseLeave({ item: item }); }, className: item.className },
                React.createElement(ItemContentWrapper, { hasElemBefore: !!item.elemBefore }, item.content))));
        if (item.tooltipDescription) {
            return (React.createElement(tooltip_1.default, { key: item.content, content: item.tooltipDescription, position: item.tooltipPosition }, dropListItem));
        }
        return dropListItem;
    };
    DropdownMenuWrapper.prototype.renderDropdownMenu = function () {
        var _this = this;
        var _a = this.state, target = _a.target, popupPlacement = _a.popupPlacement;
        var _b = this.props, items = _b.items, mountTo = _b.mountTo, boundariesElement = _b.boundariesElement, scrollableElement = _b.scrollableElement, offset = _b.offset, fitHeight = _b.fitHeight, fitWidth = _b.fitWidth, isOpen = _b.isOpen, zIndex = _b.zIndex;
        return (React.createElement(editor_common_1.Popup, { target: isOpen ? target : undefined, mountTo: mountTo, boundariesElement: boundariesElement, scrollableElement: scrollableElement, onPlacementChanged: this.updatePopupPlacement, fitHeight: fitHeight, fitWidth: fitWidth, zIndex: zIndex || editor_common_1.akEditorFloatingPanelZIndex, offset: offset },
            React.createElement(DropListWithOutsideListeners, { isOpen: true, appearance: "tall", position: popupPlacement.join(' '), shouldFlip: false, shouldFitContainer: true, isTriggerNotTabbable: true, handleClickOutside: this.handleClose, handleEscapeKeydown: this.handleClose },
                React.createElement("div", { style: { height: 0, minWidth: fitWidth || 0 } }),
                items.map(function (group, index) { return (React.createElement(item_1.ItemGroup, { key: index }, group.items.map(function (item) { return _this.renderItem(item); }))); }))));
    };
    DropdownMenuWrapper.prototype.render = function () {
        var _a = this.props, children = _a.children, isOpen = _a.isOpen;
        return (React.createElement(Wrapper, null,
            React.createElement("div", { ref: this.handleRef }, children),
            isOpen ? this.renderDropdownMenu() : null));
    };
    return DropdownMenuWrapper;
}(react_1.PureComponent));
exports.default = DropdownMenuWrapper;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map