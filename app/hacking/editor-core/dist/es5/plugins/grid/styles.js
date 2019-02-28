"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// @ts-ignore: unused variable
var styled_components_1 = require("styled-components");
var theme_1 = require("@atlaskit/theme");
var editor_common_1 = require("@atlaskit/editor-common");
exports.GRID_GUTTER = 12;
exports.gridStyles = styled_components_1.css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  .gridParent {\n    width: calc(100% + ", "px);\n    margin-left: -", "px;\n    margin-right: -", "px;\n    transform: scale(1);\n    z-index: ", ";\n  }\n\n  .gridContainer {\n    position: fixed;\n    height: 100vh;\n    width: 100%;\n    pointer-events: none;\n  }\n\n  .gridLine {\n    border-left: 1px solid ", ";\n    display: inline-block;\n    box-sizing: border-box;\n    height: 100%;\n    margin-left: -1px;\n\n    transition: border-color 0.15s linear;\n    z-index: 0;\n  }\n\n  .gridContainer.hidden .gridLine {\n    border-left: 1px solid transparent;\n  }\n\n  .highlight {\n    border-left: 1px solid ", ";\n  }\n"], ["\n  .gridParent {\n    width: calc(100% + ", "px);\n    margin-left: -", "px;\n    margin-right: -", "px;\n    transform: scale(1);\n    z-index: ", ";\n  }\n\n  .gridContainer {\n    position: fixed;\n    height: 100vh;\n    width: 100%;\n    pointer-events: none;\n  }\n\n  .gridLine {\n    border-left: 1px solid ", ";\n    display: inline-block;\n    box-sizing: border-box;\n    height: 100%;\n    margin-left: -1px;\n\n    transition: border-color 0.15s linear;\n    z-index: 0;\n  }\n\n  .gridContainer.hidden .gridLine {\n    border-left: 1px solid transparent;\n  }\n\n  .highlight {\n    border-left: 1px solid ", ";\n  }\n"])), exports.GRID_GUTTER * 2, exports.GRID_GUTTER, exports.GRID_GUTTER, editor_common_1.akEditorGridLineZIndex, theme_1.colors.N30A, theme_1.colors.B200);
var templateObject_1;
//# sourceMappingURL=styles.js.map