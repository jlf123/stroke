"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var button_1 = require("@atlaskit/button");
var theme_1 = require("@atlaskit/theme");
var utils_1 = require("../utils");
var Button_1 = require("./Button");
var Dropdown_1 = require("./Dropdown");
var Select_1 = require("./Select");
var Separator_1 = require("./Separator");
var akGridSize = theme_1.gridSize();
var ToolbarContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  background-color: white;\n  border-radius: ", "px;\n  box-shadow: 0 0 1px rgba(9, 30, 66, 0.31),\n    0 4px 8px -2px rgba(9, 30, 66, 0.25);\n  padding: ", "px ", "px;\n  display: flex;\n  line-height: 1;\n  box-sizing: border-box;\n  ", ";\n  & > div {\n    align-items: center;\n  }\n"], ["\n  background-color: white;\n  border-radius: ", "px;\n  box-shadow: 0 0 1px rgba(9, 30, 66, 0.31),\n    0 4px 8px -2px rgba(9, 30, 66, 0.25);\n  padding: ", "px ", "px;\n  display: flex;\n  line-height: 1;\n  box-sizing: border-box;\n  ",
    ";\n  & > div {\n    align-items: center;\n  }\n"])), theme_1.borderRadius(), akGridSize / 2, akGridSize, function (props) {
    return props.hasCompactLeftPadding ? "padding-left: " + akGridSize / 2 + "px" : '';
});
var Toolbar = /** @class */ (function (_super) {
    tslib_1.__extends(Toolbar, _super);
    function Toolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Toolbar.prototype.render = function () {
        var _a = this.props, items = _a.items, dispatchCommand = _a.dispatchCommand, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement;
        if (!items.length) {
            return null;
        }
        // Select has left padding of 4px to the border, everything else 8px
        var firstElementIsSelect = items[0].type === 'select';
        return (React.createElement(ToolbarContainer, { "aria-label": "Floating Toolbar", hasCompactLeftPadding: firstElementIsSelect },
            React.createElement(button_1.ButtonGroup, null, items
                .filter(function (item) { return !item.hidden; })
                .map(function (item, idx) {
                switch (item.type) {
                    case 'button':
                        var ButtonIcon = item.icon;
                        return (React.createElement(Button_1.default, { key: idx, title: item.title, icon: React.createElement(ButtonIcon, { label: item.title }), appearance: item.appearance, onClick: function () { return dispatchCommand(item.onClick); }, onMouseEnter: function () { return dispatchCommand(item.onMouseEnter); }, onMouseLeave: function () { return dispatchCommand(item.onMouseLeave); }, selected: item.selected, disabled: item.disabled }));
                    case 'dropdown':
                        var DropdownIcon = item.icon;
                        return (React.createElement(Dropdown_1.default, { key: idx, title: item.title, icon: React.createElement(DropdownIcon, { label: item.title }), dispatchCommand: dispatchCommand, options: item.options, hideExpandIcon: item.hideExpandIcon, mountPoint: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement }));
                    case 'select':
                        return (React.createElement(Select_1.default, { key: idx, dispatchCommand: dispatchCommand, options: item.options, hideExpandIcon: item.hideExpandIcon, mountPoint: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement, defaultValue: item.defaultValue, placeholder: item.placeholder, onChange: function (selected) {
                                return dispatchCommand(item.onChange(selected));
                            } }));
                    case 'separator':
                        return React.createElement(Separator_1.default, { key: idx });
                }
            }))));
    };
    Toolbar.prototype.shouldComponentUpdate = function (nextProps) {
        return !utils_1.compareArrays(this.props.items, nextProps.items);
    };
    return Toolbar;
}(react_1.Component));
exports.default = Toolbar;
var templateObject_1;
//# sourceMappingURL=Toolbar.js.map