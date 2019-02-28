"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var styled_components_1 = require("styled-components");
var theme_1 = require("@atlaskit/theme");
var styles_1 = require("../styles");
exports.Wrapper = styled_components_1.default(styles_1.Wrapper)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  cursor: pointer;\n  display: inline-flex;\n  margin: 1px;\n\n  > img {\n    border-radius: ", "px;\n  }\n\n  &::after,\n  &::before {\n    vertical-align: text-top;\n    display: inline-block;\n    width: 1px;\n    content: '';\n  }\n\n  &.with-children {\n    padding: 0;\n    background: white;\n  }\n"], ["\n  cursor: pointer;\n  display: inline-flex;\n  margin: 1px;\n\n  > img {\n    border-radius: ", "px;\n  }\n\n  &::after,\n  &::before {\n    vertical-align: text-top;\n    display: inline-block;\n    width: 1px;\n    content: '';\n  }\n\n  &.with-children {\n    padding: 0;\n    background: white;\n  }\n"])), theme_1.borderRadius());
var templateObject_1;
//# sourceMappingURL=styles.js.map