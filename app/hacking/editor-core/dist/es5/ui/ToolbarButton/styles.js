"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var styled_components_1 = require("styled-components");
var button_1 = require("@atlaskit/button");
// tslint:disable-next-line:variable-name
exports.AkButton = styled_components_1.default(button_1.default)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  line-height: 0;\n  justify-content: center;\n\n  > span {\n    margin: 0\n      ", ";\n  }\n\n  & + & {\n    margin-left: ", ";\n  }\n\n  &[disabled] {\n    pointer-events: none;\n  }\n"], ["\n  line-height: 0;\n  justify-content: center;\n\n  > span {\n    margin: 0\n      ", ";\n  }\n\n  & + & {\n    margin-left: ",
    ";\n  }\n\n  &[disabled] {\n    pointer-events: none;\n  }\n"])), function (props) { return (props.spacing === 'none' ? '0' : '-2px'); }, function (props) {
    return props.spacing === 'none' ? '4px' : '0px';
});
var templateObject_1;
//# sourceMappingURL=styles.js.map