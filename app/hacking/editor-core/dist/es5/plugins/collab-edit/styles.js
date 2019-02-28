"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// @ts-ignore: unused variable
// prettier-ignore
var styled_components_1 = require("styled-components");
var utils_1 = require("./utils");
var telepointerColorStyle = function (color, index) { return "\n  &.color-" + index + " {\n    background-color: " + color.selection + ";\n    &::after {\n      background-color: " + color.solid + ";\n      color: #fff;\n      border-color: " + color.solid + ";\n    }\n  }\n"; };
exports.telepointerStyle = styled_components_1.css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  .ProseMirror .telepointer {\n    position: relative;\n\n    &.telepointer-selection {\n      line-height: 1.2;\n      pointer-events: none;\n      user-select: none;\n    }\n\n    &.telepointer-selection-badge::after {\n      content: attr(data-initial);\n      position: absolute;\n      display: block;\n      top: -14px;\n      font-size: 9px;\n      padding: 2px;\n      color: white;\n      left: -1px;\n      border-radius: 2px 2px 2px 0;\n      line-height: initial;\n    }\n\n    ", ";\n  }\n"], ["\n  .ProseMirror .telepointer {\n    position: relative;\n\n    &.telepointer-selection {\n      line-height: 1.2;\n      pointer-events: none;\n      user-select: none;\n    }\n\n    &.telepointer-selection-badge::after {\n      content: attr(data-initial);\n      position: absolute;\n      display: block;\n      top: -14px;\n      font-size: 9px;\n      padding: 2px;\n      color: white;\n      left: -1px;\n      border-radius: 2px 2px 2px 0;\n      line-height: initial;\n    }\n\n    ", ";\n  }\n"])), utils_1.colors.map(function (color, index) { return telepointerColorStyle(color, index); }));
var templateObject_1;
//# sourceMappingURL=styles.js.map