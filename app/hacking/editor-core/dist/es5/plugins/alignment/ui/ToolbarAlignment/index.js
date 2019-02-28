"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_intl_1 = require("react-intl");
var chevron_down_1 = require("@atlaskit/icon/glyph/chevron-down");
var ToolbarButton_1 = require("../../../../ui/ToolbarButton");
var Dropdown_1 = require("../../../../ui/Dropdown");
var align_left_1 = require("@atlaskit/icon/glyph/editor/align-left");
var align_center_1 = require("@atlaskit/icon/glyph/editor/align-center");
var align_right_1 = require("@atlaskit/icon/glyph/editor/align-right");
exports.iconMap = {
    start: React.createElement(align_left_1.default, { label: "Align left" }),
    end: React.createElement(align_right_1.default, { label: "Align right" }),
    center: React.createElement(align_center_1.default, { label: "Align center" }),
};
var styles_1 = require("./styles");
var Alignment_1 = require("../../../../ui/Alignment");
exports.messages = react_intl_1.defineMessages({
    alignment: {
        id: 'fabric.editor.alignment',
        defaultMessage: 'Alignment',
        description: 'Aligns text',
    },
});
var AlignmentToolbar = /** @class */ (function (_super) {
    tslib_1.__extends(AlignmentToolbar, _super);
    function AlignmentToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: false,
        };
        _this.changeAlignment = function (align) {
            _this.toggleOpen();
            return _this.props.changeAlignment(align);
        };
        _this.toggleOpen = function () {
            _this.handleOpenChange({ isOpen: !_this.state.isOpen });
        };
        _this.handleOpenChange = function (_a) {
            var isOpen = _a.isOpen;
            _this.setState({ isOpen: isOpen });
        };
        return _this;
    }
    AlignmentToolbar.prototype.render = function () {
        var _this = this;
        var isOpen = this.state.isOpen;
        var _a = this.props, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, isReducedSpacing = _a.isReducedSpacing, pluginState = _a.pluginState, disabled = _a.disabled;
        return (React.createElement(styles_1.Wrapper, null,
            React.createElement(Dropdown_1.default, { mountTo: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement, isOpen: this.state.isOpen, onOpenChange: this.handleOpenChange, fitWidth: 242, fitHeight: 80, trigger: React.createElement(ToolbarButton_1.default, { spacing: isReducedSpacing ? 'none' : 'default', disabled: disabled, selected: isOpen, title: "Text alignment", ariaLabel: "Text alignment", className: "align-btn", onClick: this.toggleOpen, iconBefore: React.createElement(styles_1.TriggerWrapper, null,
                        exports.iconMap[pluginState.align],
                        React.createElement(styles_1.ExpandIconWrapper, null,
                            React.createElement(chevron_down_1.default, { label: 'Alignment' }))) }) },
                React.createElement(Alignment_1.default, { onClick: function (align) { return _this.changeAlignment(align); }, selectedAlignment: pluginState.align })),
            React.createElement(styles_1.Separator, null)));
    };
    return AlignmentToolbar;
}(React.Component));
exports.default = AlignmentToolbar;
//# sourceMappingURL=index.js.map