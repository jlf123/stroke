"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// @ts-ignore: unused variable
// prettier-ignore
var styled_components_1 = require("styled-components");
var theme_1 = require("@atlaskit/theme");
exports.fakeCursorStyles = styled_components_1.css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  .ProseMirror {\n    .ProseMirror-fake-text-cursor {\n      display: inline;\n      pointer-events: none;\n      position: relative;\n      height: 15px;\n    }\n\n    .ProseMirror-fake-text-cursor::after {\n      content: '';\n      display: inline;\n      top: 0;\n      position: absolute;\n      height: 100%;\n      border-right: 1px solid rgba(0, 0, 0, 0.4);\n    }\n\n    .ProseMirror-fake-text-selection {\n      display: inline;\n      pointer-events: none;\n      position: relative;\n      background-color: ", ";\n    }\n  }\n"], ["\n  .ProseMirror {\n    .ProseMirror-fake-text-cursor {\n      display: inline;\n      pointer-events: none;\n      position: relative;\n      height: 15px;\n    }\n\n    .ProseMirror-fake-text-cursor::after {\n      content: '';\n      display: inline;\n      top: 0;\n      position: absolute;\n      height: 100%;\n      border-right: 1px solid rgba(0, 0, 0, 0.4);\n    }\n\n    .ProseMirror-fake-text-selection {\n      display: inline;\n      pointer-events: none;\n      position: relative;\n      background-color: ", ";\n    }\n  }\n"])), theme_1.colors.B75);
var templateObject_1;
//# sourceMappingURL=styles.js.map