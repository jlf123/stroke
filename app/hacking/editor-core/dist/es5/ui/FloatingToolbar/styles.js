"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var styled_components_1 = require("styled-components");
var theme_1 = require("@atlaskit/theme");
var styles_1 = require("../styles");
exports.Container = styled_components_1.default.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  border-radius: ", "px;\n  ", " display: flex;\n  align-items: center;\n  box-sizing: border-box;\n  padding: 4px 8px;\n  background-color: ", ";\n  ", ";\n"], ["\n  border-radius: ", "px;\n  ", " display: flex;\n  align-items: center;\n  box-sizing: border-box;\n  padding: 4px 8px;\n  background-color: ", ";\n  ",
    ";\n"])), theme_1.borderRadius(), styles_1.dropShadow, theme_1.colors.N0, function (_a) {
    var height = _a.height;
    return height
        ? styled_components_1.css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n          height: ", "px;\n        "], ["\n          height: ", "px;\n        "])), height) : '';
});
var templateObject_1, templateObject_2;
//# sourceMappingURL=styles.js.map