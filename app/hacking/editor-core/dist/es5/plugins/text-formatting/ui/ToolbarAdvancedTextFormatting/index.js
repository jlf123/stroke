"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var react_intl_1 = require("react-intl");
var more_1 = require("@atlaskit/icon/glyph/editor/more");
var editor_common_1 = require("@atlaskit/editor-common");
var analytics_1 = require("../../../../analytics");
var keymaps_1 = require("../../../../keymaps");
var ToolbarButton_1 = require("../../../../ui/ToolbarButton");
var DropdownMenu_1 = require("../../../../ui/DropdownMenu");
var styles_1 = require("../../../../ui/styles");
var commands = require("../../commands/text-formatting");
var clear_formatting_1 = require("../../commands/clear-formatting");
exports.messages = react_intl_1.defineMessages({
    underline: {
        id: 'fabric.editor.underline',
        defaultMessage: 'Underline',
        description: 'Whether the text selection has underlined text',
    },
    strike: {
        id: 'fabric.editor.strike',
        defaultMessage: 'Strikethrough',
        description: 'Whether the text selection has crossed out text',
    },
    code: {
        id: 'fabric.editor.code',
        defaultMessage: 'Code',
        description: 'Whether the text selection has monospaced/code font',
    },
    subscript: {
        id: 'fabric.editor.subscript',
        defaultMessage: 'Subscript',
        description: 'Whether the text selection is written below the line in a slightly smaller size',
    },
    superscript: {
        id: 'fabric.editor.superscript',
        defaultMessage: 'Superscript',
        description: 'Whether the text selection is written above the line in a slightly smaller size',
    },
    clearFormatting: {
        id: 'fabric.editor.clearFormatting',
        defaultMessage: 'Clear formatting',
        description: 'Remove all rich text formatting from the selected text',
    },
    moreFormatting: {
        id: 'fabric.editor.moreFormatting',
        defaultMessage: 'More formatting',
        description: 'Clicking this will show a menu with additional formatting options',
    },
});
var ToolbarAdvancedTextFormatting = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarAdvancedTextFormatting, _super);
    function ToolbarAdvancedTextFormatting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: false,
        };
        _this.onOpenChange = function (attrs) {
            _this.setState({
                isOpen: attrs.isOpen,
            });
        };
        _this.handleTriggerClick = function () {
            _this.onOpenChange({ isOpen: !_this.state.isOpen });
        };
        _this.createItems = function () {
            var _a = _this.props, textFormattingState = _a.textFormattingState, clearFormattingState = _a.clearFormattingState, editorView = _a.editorView, formatMessage = _a.intl.formatMessage;
            var _b = editorView.state.schema.marks, code = _b.code, underline = _b.underline, subsup = _b.subsup, strike = _b.strike;
            var items = [];
            if (textFormattingState) {
                var underlineHidden = textFormattingState.underlineHidden, codeHidden = textFormattingState.codeHidden, strikeHidden = textFormattingState.strikeHidden, subscriptHidden = textFormattingState.subscriptHidden, superscriptHidden = textFormattingState.superscriptHidden;
                if (!underlineHidden && underline) {
                    _this.addRecordToItems(items, formatMessage(exports.messages.underline), 'underline', keymaps_1.tooltip(keymaps_1.toggleUnderline));
                }
                if (!strikeHidden && strike) {
                    _this.addRecordToItems(items, formatMessage(exports.messages.strike), 'strike', keymaps_1.tooltip(keymaps_1.toggleStrikethrough));
                }
                if (!codeHidden && code) {
                    _this.addRecordToItems(items, formatMessage(exports.messages.code), 'code', keymaps_1.tooltip(keymaps_1.toggleCode));
                }
                if (!subscriptHidden && subsup) {
                    _this.addRecordToItems(items, formatMessage(exports.messages.subscript), 'subscript');
                }
                if (!superscriptHidden && subsup) {
                    _this.addRecordToItems(items, formatMessage(exports.messages.superscript), 'superscript');
                }
            }
            if (clearFormattingState) {
                _this.addRecordToItems(items, formatMessage(exports.messages.clearFormatting), 'clearFormatting', keymaps_1.tooltip(keymaps_1.clearFormatting), !clearFormattingState.formattingIsPresent);
            }
            return [{ items: items }];
        };
        _this.addRecordToItems = function (items, content, value, tooltip, isDisabled) {
            items.push({
                key: value,
                content: content,
                elemAfter: React.createElement(styles_1.Shortcut, null, tooltip),
                value: value,
                isActive: _this.state[value + "Active"],
                isDisabled: isDisabled || _this.state[value + "Disabled"],
            });
        };
        _this.onItemActivated = function (_a) {
            var item = _a.item;
            analytics_1.analyticsService.trackEvent("atlassian.editor.format." + item.value + ".button");
            var _b = _this.props.editorView, state = _b.state, dispatch = _b.dispatch;
            switch (item.value) {
                case 'underline':
                    commands.toggleUnderline()(state, dispatch);
                    break;
                case 'code':
                    commands.toggleCode()(state, dispatch);
                    break;
                case 'strike':
                    commands.toggleStrike()(state, dispatch);
                    break;
                case 'subscript':
                    commands.toggleSubscript()(state, dispatch);
                    break;
                case 'superscript':
                    commands.toggleSuperscript()(state, dispatch);
                    break;
                case 'clearFormatting':
                    clear_formatting_1.clearFormatting()(state, dispatch);
                    break;
            }
            _this.setState({ isOpen: false });
        };
        return _this;
    }
    ToolbarAdvancedTextFormatting.prototype.render = function () {
        var _this = this;
        var isOpen = this.state.isOpen;
        var _a = this.props, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, isReducedSpacing = _a.isReducedSpacing, _b = _a.textFormattingState, textFormattingState = _b === void 0 ? {} : _b, _c = _a.clearFormattingState, clearFormattingState = _c === void 0 ? {} : _c, formatMessage = _a.intl.formatMessage;
        var codeActive = textFormattingState.codeActive, underlineActive = textFormattingState.underlineActive, strikeActive = textFormattingState.strikeActive, subscriptActive = textFormattingState.subscriptActive, superscriptActive = textFormattingState.superscriptActive, codeDisabled = textFormattingState.codeDisabled, underlineDisabled = textFormattingState.underlineDisabled, strikeDisabled = textFormattingState.strikeDisabled, subscriptDisabled = textFormattingState.subscriptDisabled, superscriptDisabled = textFormattingState.superscriptDisabled;
        var formattingIsPresent = clearFormattingState.formattingIsPresent;
        var items = this.createItems();
        var labelMoreFormatting = formatMessage(exports.messages.moreFormatting);
        var toolbarButtonFactory = function (disabled) { return (React.createElement(ToolbarButton_1.default, { spacing: isReducedSpacing ? 'none' : 'default', selected: isOpen ||
                underlineActive ||
                codeActive ||
                strikeActive ||
                subscriptActive ||
                superscriptActive, disabled: disabled, onClick: _this.handleTriggerClick, title: labelMoreFormatting, iconBefore: React.createElement(styles_1.TriggerWrapper, null,
                React.createElement(more_1.default, { label: labelMoreFormatting })) })); };
        if (!this.props.isDisabled &&
            !(strikeDisabled &&
                !formattingIsPresent &&
                codeDisabled &&
                subscriptDisabled &&
                superscriptDisabled &&
                underlineDisabled) &&
            items[0].items.length > 0) {
            return (React.createElement(styles_1.Wrapper, null,
                React.createElement(DropdownMenu_1.default, { items: items, onItemActivated: this.onItemActivated, onOpenChange: this.onOpenChange, mountTo: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement, isOpen: isOpen, zIndex: editor_common_1.akEditorMenuZIndex, fitHeight: 188, fitWidth: 136 }, toolbarButtonFactory(false)),
                React.createElement(styles_1.Separator, null)));
        }
        else {
            return (React.createElement(styles_1.Wrapper, null,
                React.createElement("div", null, toolbarButtonFactory(true)),
                React.createElement(styles_1.Separator, null)));
        }
    };
    return ToolbarAdvancedTextFormatting;
}(react_1.PureComponent));
exports.default = react_intl_1.injectIntl(ToolbarAdvancedTextFormatting);
//# sourceMappingURL=index.js.map