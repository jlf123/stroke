import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import { defineMessages, injectIntl } from 'react-intl';
import WrapLeftIcon from '@atlaskit/icon/glyph/editor/media-wrap-left';
import WrapRightIcon from '@atlaskit/icon/glyph/editor/media-wrap-right';
import WideIcon from '@atlaskit/icon/glyph/editor/media-wide';
import FullWidthIcon from '@atlaskit/icon/glyph/editor/media-full-width';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import EditorAlignImageLeft from '@atlaskit/icon/glyph/editor/align-image-left';
import EditorAlignImageRight from '@atlaskit/icon/glyph/editor/align-image-right';
import EditorAlignImageCenter from '@atlaskit/icon/glyph/editor/align-image-center';
import { colors } from '@atlaskit/theme';
import commonMessages from '../../../../messages';
import UiToolbarButton from '../../../../ui/ToolbarButton';
import UiSeparator from '../../../../ui/Separator';
import UiFloatingToolbar from '../../../../ui/FloatingToolbar';
import { closestElement } from '../../../../utils';
export var messages = defineMessages({
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
    { value: 'align-start', Icon: EditorAlignImageLeft },
    { value: 'center', Icon: EditorAlignImageCenter },
    { value: 'align-end', Icon: EditorAlignImageRight },
    { value: 'separator' },
    { value: 'wrap-left', Icon: WrapLeftIcon },
    { value: 'wrap-right', Icon: WrapRightIcon },
];
var breakoutIcons = [
    { value: 'separator' },
    { value: 'wide', Icon: WideIcon },
    { value: 'full-width', Icon: FullWidthIcon },
];
var layoutToMessages = {
    'wrap-left': messages.wrapLeft,
    center: commonMessages.alignImageCenter,
    'wrap-right': messages.wrapRight,
    wide: commonMessages.layoutWide,
    'full-width': commonMessages.layoutFullWidth,
    'align-end': commonMessages.alignImageRight,
    'align-start': commonMessages.alignImageLeft,
};
var ToolbarButton = styled(UiToolbarButton)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  width: 24px;\n  padding: 0;\n  margin: 0 2px;\n"], ["\n  width: 24px;\n  padding: 0;\n  margin: 0 2px;\n"])));
var Separator = styled(UiSeparator)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  margin: 2px 6px;\n"], ["\n  margin: 2px 6px;\n"])));
// `line-height: 1` to fix extra 1px height from toolbar wrapper
var FloatingToolbar = styled(UiFloatingToolbar)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  & > div {\n    line-height: 1;\n  }\n  & > div:first-child > button {\n    margin-left: 0;\n  }\n  & > div:last-child > button {\n    margin-right: 0;\n  }\n"], ["\n  & > div {\n    line-height: 1;\n  }\n  & > div:first-child > button {\n    margin-left: 0;\n  }\n  & > div:last-child > button {\n    margin-right: 0;\n  }\n"])));
var ToolbarButtonDestructive = styled(ToolbarButton)(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  &:hover {\n    color: ", " !important;\n  }\n  &:active {\n    color: ", " !important;\n  }\n  &[disabled]:hover {\n    color: ", " !important;\n  }\n"], ["\n  &:hover {\n    color: ", " !important;\n  }\n  &:active {\n    color: ", " !important;\n  }\n  &[disabled]:hover {\n    color: ", " !important;\n  }\n"])), colors.R300, colors.R400, colors.N70);
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
            !closestElement(target, 'li') &&
            !closestElement(target, 'table') &&
            !editorDisabled) {
            var labelRemove = formatMessage(commonMessages.remove);
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
                React.createElement(ToolbarButtonDestructive, { spacing: "compact", onClick: this.handleRemove, title: labelRemove, iconBefore: React.createElement(RemoveIcon, { label: labelRemove }) })));
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
export default injectIntl(MediaSingleEdit);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map