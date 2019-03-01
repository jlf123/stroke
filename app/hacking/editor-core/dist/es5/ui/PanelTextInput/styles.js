"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var styled_components_1 = require("styled-components");
var theme_1 = require("@atlaskit/theme");
// Normal .className gets overridden by input[type=text] hence this hack to produce input.className
exports.Input = styled_components_1.default.input(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  input& {\n    background: transparent;\n    border: 0;\n    border-radius: 0;\n    box-sizing: content-box;\n    color: ", ";\n    flex-grow: 1;\n    font-size: 13px;\n    line-height: 20px;\n    padding: 0;\n    ", ";\n    min-width: 145px;\n\n    /* Hides IE10+ built-in [x] clear input button */\n    &::-ms-clear {\n      display: none;\n    }\n\n    &:focus {\n      outline: none;\n    }\n\n    &::placeholder {\n      color: ", ";\n      opacity: 0.5;\n    }\n  }\n"], ["\n  input& {\n    background: transparent;\n    border: 0;\n    border-radius: 0;\n    box-sizing: content-box;\n    color: ", ";\n    flex-grow: 1;\n    font-size: 13px;\n    line-height: 20px;\n    padding: 0;\n    ", ";\n    min-width: 145px;\n\n    /* Hides IE10+ built-in [x] clear input button */\n    &::-ms-clear {\n      display: none;\n    }\n\n    &:focus {\n      outline: none;\n    }\n\n    &::placeholder {\n      color: ", ";\n      opacity: 0.5;\n    }\n  }\n"])), theme_1.colors.N400, function (props) { return (props.width ? "width: " + props.width + "px" : ''); }, theme_1.colors.N400);
var templateObject_1;
//# sourceMappingURL=styles.js.map