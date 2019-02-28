import * as tslib_1 from "tslib";
import * as React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import OpenIcon from '@atlaskit/icon/glyph/editor/open';
import UnlinkIcon from '@atlaskit/icon/glyph/editor/unlink';
import { akEditorFloatingDialogZIndex } from '@atlaskit/editor-common';
import PanelTextInput from '../../../../ui/PanelTextInput';
import { getNearestNonTextNode } from '../../../../ui/FloatingToolbar';
import { FloatingToolbar, Separator, ToolbarButton } from '../styles';
export var messages = defineMessages({
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
        var labelOpenLink = formatMessage(messages.openLink);
        var labelUnlink = formatMessage(messages.unlink);
        return (React.createElement(FloatingToolbar, { target: getNearestNonTextNode(target), popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, fitWidth: 400, fitHeight: 32, offset: [0, 12], className: "normal", zIndex: akEditorFloatingDialogZIndex },
            React.createElement(PanelTextInput, { autoFocus: autoFocus, defaultValue: defaultValue || '', placeholder: placeholder, onSubmit: this.handleSubmit, onChange: this.handleChange, onBlur: this.handleBlur, onCancel: this.handleBlur }),
            (onOpenLink || onUnlink) && React.createElement(Separator, null),
            onOpenLink && (React.createElement(ToolbarButton, { spacing: "compact", href: alwaysOpenLinkAt || this.state.text, onClick: onOpenLink, target: "_blank", title: labelOpenLink, iconBefore: React.createElement(OpenIcon, { label: labelOpenLink }) })),
            onUnlink && (React.createElement(ToolbarButton, { spacing: "compact", onClick: onUnlink, title: labelUnlink, iconBefore: React.createElement(UnlinkIcon, { label: labelUnlink }) }))));
    };
    return HyperlinkEdit;
}(React.Component));
export default injectIntl(HyperlinkEdit);
//# sourceMappingURL=index.js.map