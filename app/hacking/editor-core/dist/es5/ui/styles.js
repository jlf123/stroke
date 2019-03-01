"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var styled_components_1 = require("styled-components");
var theme_1 = require("@atlaskit/theme");
var akGridSize = theme_1.gridSize() + 'px';
exports.ButtonGroup = styled_components_1.default.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: inline-flex;\n  align-items: center;\n\n  & > div {\n    display: flex;\n  }\n"], ["\n  display: inline-flex;\n  align-items: center;\n\n  & > div {\n    display: flex;\n  }\n"])));
exports.Separator = styled_components_1.default.span(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  background: ", ";\n  width: 1px;\n  height: 24px;\n  display: inline-block;\n  margin: 0 8px;\n"], ["\n  background: ", ";\n  width: 1px;\n  height: 24px;\n  display: inline-block;\n  margin: 0 8px;\n"])), theme_1.colors.N30);
exports.Wrapper = styled_components_1.default.span(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: center;\n\n  > div,\n  > span {\n    display: flex;\n  }\n\n  > div > div {\n    display: flex;\n  }\n  margin-left: ", "px;\n  min-width: ", ";\n"], ["\n  display: flex;\n  align-items: center;\n\n  > div,\n  > span {\n    display: flex;\n  }\n\n  > div > div {\n    display: flex;\n  }\n  margin-left: ", "px;\n  min-width: ",
    ";\n"])), function (_a) {
    var isSmall = _a.isSmall;
    return (isSmall ? 4 : 0);
}, function (_a) {
    var isSmall = _a.isSmall;
    return isSmall ? '40px' : 'auto';
});
exports.ExpandIconWrapper = styled_components_1.default.span(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  margin-left: -8px;\n"], ["\n  margin-left: -8px;\n"])));
exports.TriggerWrapper = styled_components_1.default.div(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  display: flex;\n"], ["\n  display: flex;\n"])));
exports.MenuWrapper = exports.Wrapper;
exports.ButtonContent = styled_components_1.default.span(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  min-width: 80px;\n  height: 24px;\n  line-height: 24px;\n  align-items: center;\n  padding: ", ";\n  flex-direction: column;\n"], ["\n  display: flex;\n  min-width: 80px;\n  height: 24px;\n  line-height: 24px;\n  align-items: center;\n  padding: ", ";\n  flex-direction: column;\n"])), function (props) { return (props.width ? 0 : '0 8px'); });
// Taken from the style of inline dialog components
exports.dropShadow = styled_components_1.css(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n  box-shadow: 0 0 1px rgba(9, 30, 66, 0.31),\n    0 4px 8px -2px rgba(9, 30, 66, 0.25);\n"], ["\n  box-shadow: 0 0 1px rgba(9, 30, 66, 0.31),\n    0 4px 8px -2px rgba(9, 30, 66, 0.25);\n"])));
exports.scrollbarStyles = "\n  -ms-overflow-style: -ms-autohiding-scrollbar;\n\n  &::-webkit-scrollbar {\n    height: " + akGridSize + ";\n    width: " + akGridSize + ";\n  }\n\n  &::-webkit-scrollbar-corner {\n    display: none;\n  }\n\n  &::-webkit-scrollbar-thumb {\n    background-color: rgba(0, 0, 0, 0);\n  }\n\n  &:hover::-webkit-scrollbar-thumb {\n    background-color: rgba(0, 0, 0, 0.2);\n    border-radius: " + akGridSize + ";\n  }\n\n  &::-webkit-scrollbar-thumb:hover {\n    background-color: rgba(0, 0, 0, 0.4);\n  }\n";
exports.Shortcut = styled_components_1.default.small(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n  color: ", ";\n  margin-top: 0;\n"], ["\n  color: ", ";\n  margin-top: 0;\n"])), theme_1.colors.N50);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=styles.js.map