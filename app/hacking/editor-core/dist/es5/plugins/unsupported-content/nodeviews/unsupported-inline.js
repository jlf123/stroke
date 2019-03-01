"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var theme_1 = require("@atlaskit/theme");
var theme_2 = require("@atlaskit/theme");
var InlineNode = styled_components_1.default.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  align-items: center;\n  background: ", ";\n  border: 1px dashed ", ";\n  border-radius: ", "px;\n  box-sizing: border-box;\n  cursor: default;\n  display: inline-flex;\n  font-size: ", "px;\n  margin: 0 2px;\n  min-height: 24px;\n  padding: 0 10px;\n  user-select: all;\n  vertical-align: middle;\n  white-space: nowrap;\n\n  &.ProseMirror-selectednode {\n    background: ", ";\n    outline: none;\n  }\n"], ["\n  align-items: center;\n  background: ", ";\n  border: 1px dashed ", ";\n  border-radius: ", "px;\n  box-sizing: border-box;\n  cursor: default;\n  display: inline-flex;\n  font-size: ", "px;\n  margin: 0 2px;\n  min-height: 24px;\n  padding: 0 10px;\n  user-select: all;\n  vertical-align: middle;\n  white-space: nowrap;\n\n  &.ProseMirror-selectednode {\n    background: ", ";\n    outline: none;\n  }\n"])), theme_1.colors.N30, theme_1.colors.N50, theme_1.borderRadius(), theme_2.fontSize(), theme_1.colors.N50);
function UnsupportedInlineNode() {
    return React.createElement(InlineNode, null, "Unsupported content");
}
exports.default = UnsupportedInlineNode;
var templateObject_1;
//# sourceMappingURL=unsupported-inline.js.map