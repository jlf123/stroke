"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var styled_components_1 = require("styled-components");
var theme_1 = require("@atlaskit/theme");
exports.OuterContainer = styled_components_1.default.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  position: relative;\n  margin-right: ", "px;\n  > div {\n    display: flex;\n  }\n"], ["\n  position: relative;\n  margin-right: ",
    "px;\n  > div {\n    display: flex;\n  }\n"])), function (_a) {
    var width = _a.width;
    return !width || width === 'large' ? 0 : theme_1.gridSize();
});
var templateObject_1;
//# sourceMappingURL=styles.js.map