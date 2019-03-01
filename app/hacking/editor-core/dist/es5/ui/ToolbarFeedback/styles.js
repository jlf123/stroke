"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var styled_components_1 = require("styled-components");
var theme_1 = require("@atlaskit/theme");
exports.ButtonContent = styled_components_1.default.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  height: 24px;\n  line-height: 24px;\n  min-width: 70px;\n"], ["\n  display: flex;\n  height: 24px;\n  line-height: 24px;\n  min-width: 70px;\n"])));
exports.Wrapper = styled_components_1.default.span(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  margin-right: ", "px;\n"], ["\n  display: flex;\n  margin-right: ",
    "px;\n"])), function (_a) {
    var width = _a.width;
    return !width || width === 'large' ? 0 : theme_1.gridSize();
});
exports.ConfirmationPopup = styled_components_1.default.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  background: #fff;\n  border-radius: ", "px;\n  box-shadow: 0 4px 8px -2px ", ", 0 0 1px ", ";\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  overflow: auto;\n  max-height: none;\n  height: 410px;\n  width: 280px;\n"], ["\n  background: #fff;\n  border-radius: ", "px;\n  box-shadow: 0 4px 8px -2px ", ", 0 0 1px ", ";\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  overflow: auto;\n  max-height: none;\n  height: 410px;\n  width: 280px;\n"])), theme_1.borderRadius(), theme_1.colors.N60A, theme_1.colors.N60A);
exports.ConfirmationText = styled_components_1.default.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  font-size: 14px;\n  word-spacing: 4px;\n  line-height: 22px;\n  color: ", ";\n  margin-top: 30px;\n  padding: 20px;\n  & > div {\n    width: 240px;\n  }\n  & > div:first-of-type {\n    margin-bottom: 12px;\n  }\n  & > div:nth-of-type(2) {\n    margin-bottom: 20px;\n  }\n"], ["\n  font-size: 14px;\n  word-spacing: 4px;\n  line-height: 22px;\n  color: ", ";\n  margin-top: 30px;\n  padding: 20px;\n  & > div {\n    width: 240px;\n  }\n  & > div:first-of-type {\n    margin-bottom: 12px;\n  }\n  & > div:nth-of-type(2) {\n    margin-bottom: 20px;\n  }\n"])), theme_1.colors.N400);
exports.ConfirmationHeader = styled_components_1.default.div(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  background-color: ", ";\n  height: 100px;\n  width: 100%;\n  display: inline-block;\n"], ["\n  background-color: ", ";\n  height: 100px;\n  width: 100%;\n  display: inline-block;\n"])), theme_1.colors.P400);
exports.ConfirmationImg = styled_components_1.default.img(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n  width: 100px;\n  display: block;\n  margin: 25px auto 0 auto;\n"], ["\n  width: 100px;\n  display: block;\n  margin: 25px auto 0 auto;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=styles.js.map