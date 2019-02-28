"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var react_intl_1 = require("react-intl");
var media_wrap_left_1 = require("@atlaskit/icon/glyph/editor/media-wrap-left");
var media_wrap_right_1 = require("@atlaskit/icon/glyph/editor/media-wrap-right");
var media_wide_1 = require("@atlaskit/icon/glyph/editor/media-wide");
var media_full_width_1 = require("@atlaskit/icon/glyph/editor/media-full-width");
var remove_1 = require("@atlaskit/icon/glyph/editor/remove");
var align_image_left_1 = require("@atlaskit/icon/glyph/editor/align-image-left");
var align_image_right_1 = require("@atlaskit/icon/glyph/editor/align-image-right");
var align_image_center_1 = require("@atlaskit/icon/glyph/editor/align-image-center");
var theme_1 = require("@atlaskit/theme");
var messages_1 = require("../../../../messages");
var ToolbarButton_1 = require("../../../../ui/ToolbarButton");
var Separator_1 = require("../../../../ui/Separator");
var FloatingToolbar_1 = require("../../../../ui/FloatingToolbar");
var utils_1 = require("../../../../utils");
exports.messages = react_intl_1.defineMessages({
    wrapLeft: {
        id: 'fabric.editor.wrapLeft',
        defaultMessage: 'Wrap left',
        description: 'Aligns your image to the left and wraps text around it.',
    },
    wrapRight: {
        id: 'fabric.editor.wrapRight',
        defaultMessage: 'Wrap right',
        description: 'Aligns your image to the right and wraps text around it.',
    },
});
var icons = [
    { value: 'align-start', Icon: align_image_left_1.default },
    { value: 'center', Icon: align_image_center_1.default },
    { value: 'align-end', Icon: align_image_right_1.default },
    { value: 'separator' },
    { value: 'wrap-left', Icon: media_wrap_left_1.default },
    { value: 'wrap-right', Icon: media_wrap_right_1.default },
];
var breakoutIcons = [
    { value: 'separator' },
    { value: 'wide', Icon: media_wide_1.default },
    { value: 'full-width', Icon: media_full_width_1.default },
];
var layoutToMessages = {
    'wrap-left': exports.messages.wrapLeft,
    center: messages_1.default.alignImageCenter,
    'wrap-right': exports.messages.wrapRight,
    wide: messages_1.default.layoutWide,
    'full-width': messages_1.default.layoutFullWidth,
    'align-end': messages_1.default.alignImageRight,
    'align-start': messages_1.default.alignImageLeft,
};
var ToolbarButton = styled_components_1.default(ToolbarButton_1.default)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  width: 24px;\n  padding: 0;\n  margin: 0 2px;\n"], ["\n  width: 24px;\n  padding: 0;\n  margin: 0 2px;\n"])));
var Separator = styled_components_1.default(Separator_1.default)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  margin: 2px 6px;\n"], ["\n  margin: 2px 6px;\n"])));
// `line-height: 1` to fix extra 1px height from toolbar wrapper
var FloatingToolbar = styled_components_1.default(FloatingToolbar_1.default)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  & > div {\n    line-height: 1;\n  }\n  & > div:first-child > button {\n    margin-left: 0;\n  }\n  & > div:last-child > button {\n    margin-right: 0;\n  }\n"], ["\n  & > div {\n    line-height: 1;\n  }\n  & > div:first-child > button {\n    margin-left: 0;\n  }\n  & > div:last-child > button {\n    margin-right: 0;\n  }\n"])));
var ToolbarButtonDestructive = styled_components_1.default(ToolbarButton)(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  &:hover {\n    color: ", " !important;\n  }\n  &:active {\n    color: ", " !important;\n  }\n  &[disabled]:hover {\n    color: ", " !important;\n  }\n"], ["\n  &:hover {\n    color: ", " !important;\n  }\n  &:active {\n    color: ", " !important;\n  }\n  &[disabled]:hover {\n    color: ", " !important;\n  }\n"])), theme_1.colors.R300, theme_1.colors.R400, theme_1.colors.N70);
var MediaSingleEdit = /** @class */ (function (_super) {
    tslib_1.__extends(MediaSingleEdit, _super);
    function MediaSingleEdit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getItems = function (allowResizing, allowBreakout) {
            if (!allowResizing) {
                return icons.concat(breakoutIcons);
            }
            return icons;
        };
        _this.handleRemove = function () {
            var pluginState = _this.props.pluginState;
            pluginState.removeSelectedMediaNode();
        };
        return _this;
    }
    MediaSingleEdit.prototype.render = function () {
        var _this = this;
        var formatMessage = this.props.intl.formatMessage;
        var _a = this.props, target = _a.target, selectedLayout = _a.layout, allowBreakout = _a.allowBreakout, allowLayout = _a.allowLayout, allowResizing = _a.allowResizing, editorDisabled = _a.editorDisabled;
        var toolbarIcons = this.getItems(allowResizing, allowBreakout);
        if (target &&
            !utils_1.closestElement(target, 'li') &&
            !utils_1.closestElement(target, 'table') &&
            !editorDisabled) {
            var labelRemove = formatMessage(messages_1.default.remove);
            return (React.createElement(FloatingToolbar, { target: target, offset: [0, 12], fitHeight: 32, alignX: "center" },
                allowLayout && (React.createElement(React.Fragment, null,
                    toolbarIcons.map(function (layout, index) {
                        // Don't render Wide and Full width button for image smaller than editor content width
                        var value = layout.value, Icon = layout.Icon;
                        if (value === 'separator') {
                            return React.createElement(Separator, { key: index });
                        }
                        var label = formatMessage(layoutToMessages[value]);
                        return (React.createElement(ToolbarButton, { spacing: "compact", key: index, selected: value === selectedLayout, onClick: _this.handleChangeLayout.bind(_this, value), title: label, iconBefore: Icon && React.createElement(Icon, { label: label }) }));
                    }),
                    React.createElement(Separator, null))),
                React.createElement(ToolbarButtonDestructive, { spacing: "compact", onClick: this.handleRemove, title: labelRemove, iconBefore: React.createElement(remove_1.default, { label: labelRemove }) })));
        }
        else {
            return null;
        }
    };
    MediaSingleEdit.prototype.handleChangeLayout = function (layout) {
        this.props.pluginState.align(layout);
    };
    return MediaSingleEdit;
}(React.Component));
exports.default = react_intl_1.injectIntl(MediaSingleEdit);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map