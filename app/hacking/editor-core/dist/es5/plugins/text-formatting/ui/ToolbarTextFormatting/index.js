"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var react_intl_1 = require("react-intl");
var bold_1 = require("@atlaskit/icon/glyph/editor/bold");
var italic_1 = require("@atlaskit/icon/glyph/editor/italic");
var analytics_1 = require("../../../../analytics");
var keymaps_1 = require("../../../../keymaps");
var ToolbarButton_1 = require("../../../../ui/ToolbarButton");
var styles_1 = require("../../../../ui/styles");
var text_formatting_1 = require("../../commands/text-formatting");
exports.messages = react_intl_1.defineMessages({
    bold: {
        id: 'fabric.editor.bold',
        defaultMessage: 'Bold',
        description: 'This refers to bold or “strong” formatting, indicates that its contents have strong importance, seriousness, or urgency.',
    },
    italic: {
        id: 'fabric.editor.italic',
        defaultMessage: 'Italic',
        description: 'This refers to italics or emphasized formatting.',
    },
});
var ToolbarTextFormatting = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarTextFormatting, _super);
    function ToolbarTextFormatting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleBoldClick = analytics_1.withAnalytics('atlassian.editor.format.strong.button', function () {
            var strongDisabled = _this.props.textFormattingState.strongDisabled;
            if (!strongDisabled) {
                var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
                return text_formatting_1.toggleStrong()(state, dispatch);
            }
            return false;
        });
        _this.handleItalicClick = analytics_1.withAnalytics('atlassian.editor.format.em.button', function () {
            var emDisabled = _this.props.textFormattingState.emDisabled;
            if (!emDisabled) {
                var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
                return text_formatting_1.toggleEm()(state, dispatch);
            }
            return false;
        });
        return _this;
    }
    ToolbarTextFormatting.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, isReducedSpacing = _a.isReducedSpacing, textFormattingState = _a.textFormattingState, formatMessage = _a.intl.formatMessage;
        var strongHidden = textFormattingState.strongHidden, strongActive = textFormattingState.strongActive, strongDisabled = textFormattingState.strongDisabled, emHidden = textFormattingState.emHidden, emActive = textFormattingState.emActive, emDisabled = textFormattingState.emDisabled;
        var labelBold = formatMessage(exports.messages.bold);
        var labelItalic = formatMessage(exports.messages.italic);
        return (React.createElement(styles_1.ButtonGroup, { width: isReducedSpacing ? 'small' : 'large' },
            strongHidden ? null : (React.createElement(ToolbarButton_1.default, { spacing: isReducedSpacing ? 'none' : 'default', onClick: this.handleBoldClick, selected: strongActive, disabled: disabled || strongDisabled, title: keymaps_1.tooltip(keymaps_1.toggleBold, labelBold), iconBefore: React.createElement(bold_1.default, { label: labelBold }) })),
            emHidden ? null : (React.createElement(ToolbarButton_1.default, { spacing: isReducedSpacing ? 'none' : 'default', onClick: this.handleItalicClick, selected: emActive, disabled: disabled || emDisabled, title: keymaps_1.tooltip(keymaps_1.toggleItalic, labelItalic), iconBefore: React.createElement(italic_1.default, { label: labelItalic }) }))));
    };
    return ToolbarTextFormatting;
}(react_1.PureComponent));
exports.default = react_intl_1.injectIntl(ToolbarTextFormatting);
//# sourceMappingURL=index.js.map