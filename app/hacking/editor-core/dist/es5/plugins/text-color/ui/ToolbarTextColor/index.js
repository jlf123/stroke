"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_intl_1 = require("react-intl");
var chevron_down_1 = require("@atlaskit/icon/glyph/chevron-down");
var text_color_1 = require("@atlaskit/icon/glyph/editor/text-color");
var editor_common_1 = require("@atlaskit/editor-common");
var analytics_1 = require("../../../../analytics");
var ToolbarButton_1 = require("../../../../ui/ToolbarButton");
var ColorPalette_1 = require("../../../../ui/ColorPalette");
var Dropdown_1 = require("../../../../ui/Dropdown");
var styles_1 = require("./styles");
exports.messages = react_intl_1.defineMessages({
    textColor: {
        id: 'fabric.editor.textColor',
        defaultMessage: 'Text color',
        description: '',
    },
});
var ToolbarTextColor = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarTextColor, _super);
    function ToolbarTextColor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: false,
        };
        _this.changeTextColor = analytics_1.withAnalytics('atlassian.editor.format.textcolor.button', function (color, disabled) {
            if (!disabled) {
                _this.toggleOpen();
                return _this.props.changeColor(color);
            }
            return false;
        });
        _this.toggleOpen = function () {
            _this.handleOpenChange({ isOpen: !_this.state.isOpen });
        };
        _this.handleOpenChange = function (_a) {
            var isOpen = _a.isOpen;
            _this.setState({ isOpen: isOpen });
        };
        _this.getIconColor = function (color, defaultColor) {
            var isOpen = _this.state.isOpen;
            var isDefaultColor = defaultColor === color;
            return isOpen || isDefaultColor ? undefined : color;
        };
        return _this;
    }
    ToolbarTextColor.prototype.render = function () {
        var _this = this;
        var isOpen = this.state.isOpen;
        var _a = this.props, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, isReducedSpacing = _a.isReducedSpacing, pluginState = _a.pluginState, formatMessage = _a.intl.formatMessage;
        var labelTextColor = formatMessage(exports.messages.textColor);
        return (React.createElement(styles_1.Wrapper, null,
            React.createElement(Dropdown_1.default, { mountTo: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement, isOpen: isOpen && !pluginState.disabled, onOpenChange: this.handleOpenChange, fitWidth: 242, fitHeight: 80, zIndex: editor_common_1.akEditorMenuZIndex, trigger: React.createElement(ToolbarButton_1.default, { spacing: isReducedSpacing ? 'none' : 'default', disabled: pluginState.disabled, selected: isOpen, title: labelTextColor, onClick: this.toggleOpen, iconBefore: React.createElement(styles_1.TriggerWrapper, null,
                        React.createElement(text_color_1.default, { primaryColor: this.getIconColor(pluginState.color, pluginState.defaultColor), label: labelTextColor }),
                        React.createElement(styles_1.ExpandIconWrapper, null,
                            React.createElement(chevron_down_1.default, { label: labelTextColor }))) }) },
                React.createElement(ColorPalette_1.default, { palette: pluginState.palette, onClick: function (color) { return _this.changeTextColor(color, pluginState.disabled); }, selectedColor: pluginState.color, borderColors: pluginState.borderColorPalette })),
            React.createElement(styles_1.Separator, null)));
    };
    return ToolbarTextColor;
}(React.Component));
exports.default = react_intl_1.injectIntl(ToolbarTextColor);
//# sourceMappingURL=index.js.map