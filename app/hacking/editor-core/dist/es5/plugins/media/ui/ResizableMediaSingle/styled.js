"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var editor_common_1 = require("@atlaskit/editor-common");
var styled_components_1 = require("styled-components");
exports.Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  & > div {\n    ", ";\n    position: relative;\n\n    > div {\n      position: absolute;\n      height: 100%;\n    }\n  }\n\n  & > div::after {\n    content: '';\n    display: block;\n    padding-bottom: ", "%;\n  }\n"], ["\n  & > div {\n    ", ";\n    position: relative;\n\n    > div {\n      position: absolute;\n      height: 100%;\n    }\n  }\n\n  & > div::after {\n    content: '';\n    display: block;\n    padding-bottom: ", "%;\n  }\n"])), editor_common_1.MediaSingleDimensionHelper, function (p) { return (p.height / p.width) * 100; });
var templateObject_1;
//# sourceMappingURL=styled.js.map