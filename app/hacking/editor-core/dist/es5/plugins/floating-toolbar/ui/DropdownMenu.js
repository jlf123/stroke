"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var theme_1 = require("@atlaskit/theme");
var item_1 = require("@atlaskit/item");
var done_1 = require("@atlaskit/icon/glyph/editor/done");
exports.menuItemDimensions = {
    width: 175,
    height: 32,
};
var Spacer = styled_components_1.default.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  flex: 1;\n  padding: 8px;\n"], ["\n  display: flex;\n  flex: 1;\n  padding: 8px;\n"])));
var MenuContainer = styled_components_1.default.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  min-width: ", "px;\n"], ["\n  min-width: ", "px;\n"])), exports.menuItemDimensions.width);
var padding = theme_1.gridSize();
exports.itemSpacing = theme_1.gridSize() / 2;
var editorItemTheme = {
    borderRadius: 0,
    beforeItemSpacing: {
        compact: exports.itemSpacing,
    },
    padding: {
        compact: {
            bottom: padding,
            left: padding,
            right: padding,
            top: padding,
        },
    },
    height: {
        compact: exports.menuItemDimensions.height,
    },
};
var Dropdown = /** @class */ (function (_super) {
    tslib_1.__extends(Dropdown, _super);
    function Dropdown() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dropdown.prototype.render = function () {
        var _this = this;
        var _a;
        var _b = this.props, hide = _b.hide, dispatchCommand = _b.dispatchCommand, items = _b.items;
        return (React.createElement(styled_components_1.ThemeProvider, { theme: (_a = {}, _a[item_1.itemThemeNamespace] = editorItemTheme, _a) },
            React.createElement(MenuContainer, null, items
                .filter(function (item) { return !item.hidden; })
                .map(function (item, idx) { return (React.createElement(item_1.default, { key: idx, isCompact: true, elemBefore: _this.renderSelected(item), onClick: function () {
                    hide();
                    dispatchCommand(item.onClick);
                }, isDisabled: item.disabled }, item.title)); }))));
    };
    Dropdown.prototype.renderSelected = function (item) {
        var selected = item.selected;
        if (selected !== undefined) {
            return selected ? (React.createElement(done_1.default, { primaryColor: theme_1.colors.B400, size: "small", label: "test question" })) : (React.createElement(Spacer, null));
        }
    };
    return Dropdown;
}(react_1.Component));
exports.default = Dropdown;
var templateObject_1, templateObject_2;
//# sourceMappingURL=DropdownMenu.js.map