"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var chevron_down_1 = require("@atlaskit/icon/glyph/chevron-down");
var Dropdown_1 = require("../../../ui/Dropdown");
var with_outer_listeners_1 = require("../../../ui/with-outer-listeners");
var Button_1 = require("./Button");
var DropdownMenu_1 = require("./DropdownMenu");
var DropdownWithOutsideListeners = with_outer_listeners_1.default(Dropdown_1.default);
var DropdownExpandContainer = styled_components_1.default.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  margin-left: -8px;\n"], ["\n  margin-left: -8px;\n"])));
var IconGroup = styled_components_1.default.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  display: flex;\n"], ["\n  display: flex;\n"])));
var CompositeIcon = function (_a) {
    var icon = _a.icon;
    return (React.createElement(IconGroup, null,
        icon,
        React.createElement(DropdownExpandContainer, null,
            React.createElement(chevron_down_1.default, { label: "Expand dropdown menu" }))));
};
var Dropdown = /** @class */ (function (_super) {
    tslib_1.__extends(Dropdown, _super);
    function Dropdown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { isOpen: false };
        _this.renderArrayOptions = function (options) { return (React.createElement(DropdownMenu_1.default, { hide: _this.hide, dispatchCommand: _this.props.dispatchCommand, items: options })); };
        _this.toggleOpen = function () {
            _this.setState({ isOpen: !_this.state.isOpen });
        };
        _this.hide = function () {
            _this.setState({ isOpen: false });
        };
        return _this;
    }
    Dropdown.prototype.render = function () {
        var isOpen = this.state.isOpen;
        var _a = this.props, title = _a.title, icon = _a.icon, options = _a.options, dispatchCommand = _a.dispatchCommand, mountPoint = _a.mountPoint, boundariesElement = _a.boundariesElement, scrollableElement = _a.scrollableElement, hideExpandIcon = _a.hideExpandIcon;
        var TriggerIcon = hideExpandIcon ? icon : React.createElement(CompositeIcon, { icon: icon });
        /**
         * We want to change direction of our dropdowns a bit early,
         * not exactly when it hits the boundary.
         */
        var fitTolerance = 10;
        var fitWidth = Array.isArray(options)
            ? DropdownMenu_1.menuItemDimensions.width
            : options.width;
        var fitHeight = Array.isArray(options)
            ? options.length * DropdownMenu_1.menuItemDimensions.height + DropdownMenu_1.itemSpacing * 2
            : options.height;
        return (React.createElement(DropdownWithOutsideListeners, { mountTo: mountPoint, boundariesElement: boundariesElement, scrollableElement: scrollableElement, isOpen: isOpen, handleClickOutside: this.hide, handleEscapeKeydown: this.hide, fitWidth: fitWidth + fitTolerance, fitHeight: fitHeight + fitTolerance, trigger: React.createElement(Button_1.default, { title: title, icon: TriggerIcon, onClick: this.toggleOpen, selected: isOpen }) }, Array.isArray(options)
            ? this.renderArrayOptions(options)
            : options.render({ hide: this.hide, dispatchCommand: dispatchCommand })));
    };
    return Dropdown;
}(react_1.Component));
exports.default = Dropdown;
var templateObject_1, templateObject_2;
//# sourceMappingURL=Dropdown.js.map