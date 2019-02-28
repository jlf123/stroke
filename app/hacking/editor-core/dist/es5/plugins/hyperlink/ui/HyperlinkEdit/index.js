"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_intl_1 = require("react-intl");
var open_1 = require("@atlaskit/icon/glyph/editor/open");
var unlink_1 = require("@atlaskit/icon/glyph/editor/unlink");
var editor_common_1 = require("@atlaskit/editor-common");
var PanelTextInput_1 = require("../../../../ui/PanelTextInput");
var FloatingToolbar_1 = require("../../../../ui/FloatingToolbar");
var styles_1 = require("../styles");
exports.messages = react_intl_1.defineMessages({
    openLink: {
        id: 'fabric.editor.openLink',
        defaultMessage: 'Open link',
        description: 'Follows the hyperlink.',
    },
    unlink: {
        id: 'fabric.editor.unlink',
        defaultMessage: 'Unlink',
        description: 'Removes the hyperlink but keeps your text.',
    },
});
var HyperlinkEdit = /** @class */ (function (_super) {
    tslib_1.__extends(HyperlinkEdit, _super);
    function HyperlinkEdit(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = function (text) {
            _this.setState({ text: text });
        };
        _this.handleBlur = function () {
            if (_this.props.onBlur) {
                _this.props.onBlur(_this.state.text);
            }
        };
        _this.handleSubmit = function () {
            if (_this.props.onSubmit) {
                _this.props.onSubmit(_this.state.text);
            }
        };
        _this.state = { text: props.defaultValue || '' };
        return _this;
    }
    HyperlinkEdit.prototype.render = function () {
        var _a = this.props, target = _a.target, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, placeholder = _a.placeholder, onUnlink = _a.onUnlink, autoFocus = _a.autoFocus, onOpenLink = _a.onOpenLink, defaultValue = _a.defaultValue, alwaysOpenLinkAt = _a.alwaysOpenLinkAt, formatMessage = _a.intl.formatMessage;
        var labelOpenLink = formatMessage(exports.messages.openLink);
        var labelUnlink = formatMessage(exports.messages.unlink);
        return (React.createElement(styles_1.FloatingToolbar, { target: FloatingToolbar_1.getNearestNonTextNode(target), popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, fitWidth: 400, fitHeight: 32, offset: [0, 12], className: "normal", zIndex: editor_common_1.akEditorFloatingDialogZIndex },
            React.createElement(PanelTextInput_1.default, { autoFocus: autoFocus, defaultValue: defaultValue || '', placeholder: placeholder, onSubmit: this.handleSubmit, onChange: this.handleChange, onBlur: this.handleBlur, onCancel: this.handleBlur }),
            (onOpenLink || onUnlink) && React.createElement(styles_1.Separator, null),
            onOpenLink && (React.createElement(styles_1.ToolbarButton, { spacing: "compact", href: alwaysOpenLinkAt || this.state.text, onClick: onOpenLink, target: "_blank", title: labelOpenLink, iconBefore: React.createElement(open_1.default, { label: labelOpenLink }) })),
            onUnlink && (React.createElement(styles_1.ToolbarButton, { spacing: "compact", onClick: onUnlink, title: labelUnlink, iconBefore: React.createElement(unlink_1.default, { label: labelUnlink }) }))));
    };
    return HyperlinkEdit;
}(React.Component));
exports.default = react_intl_1.injectIntl(HyperlinkEdit);
//# sourceMappingURL=index.js.map