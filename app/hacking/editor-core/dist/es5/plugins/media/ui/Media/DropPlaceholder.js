"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var theme_1 = require("@atlaskit/theme");
var document_filled_1 = require("@atlaskit/icon/glyph/document-filled");
var editor_common_1 = require("@atlaskit/editor-common");
var media_1 = require("../../nodeviews/media");
var IconWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  color: ", ";\n  background: ", ";\n  border-radius: ", "px;\n  margin: 5px 3px 25px;\n  width: ", "px;\n  min-height: ", "px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"], ["\n  color: ", ";\n  background: ", ";\n  border-radius: ", "px;\n  margin: 5px 3px 25px;\n  width: ", "px;\n  min-height: ", "px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])), editor_common_1.hexToRgba(theme_1.colors.B400, 0.4) || theme_1.colors.B400, editor_common_1.hexToRgba(theme_1.colors.B300, 0.6) || theme_1.colors.B300, theme_1.borderRadius(), media_1.FILE_WIDTH, media_1.MEDIA_HEIGHT);
var DropLine = styled_components_1.default.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  background: ", ";\n  border-radius: ", "px;\n  margin: 2px 0;\n  width: 100%;\n  height: 2px;\n"], ["\n  background: ", ";\n  border-radius: ", "px;\n  margin: 2px 0;\n  width: 100%;\n  height: 2px;\n"])), theme_1.colors.B200, theme_1.borderRadius());
exports.default = (function (_a) {
    var _b = _a.type, type = _b === void 0 ? 'group' : _b;
    return type === 'single' ? (React.createElement(DropLine, null)) : (React.createElement(IconWrapper, null,
        React.createElement(document_filled_1.default, { label: "Document", size: "medium" })));
});
var templateObject_1, templateObject_2;
//# sourceMappingURL=DropPlaceholder.js.map