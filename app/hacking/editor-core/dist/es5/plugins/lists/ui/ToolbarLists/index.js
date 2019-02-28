"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var react_intl_1 = require("react-intl");
var bullet_list_1 = require("@atlaskit/icon/glyph/editor/bullet-list");
var number_list_1 = require("@atlaskit/icon/glyph/editor/number-list");
var chevron_down_1 = require("@atlaskit/icon/glyph/chevron-down");
var analytics_1 = require("../../../../analytics");
var keymaps_1 = require("../../../../keymaps");
var ToolbarButton_1 = require("../../../../ui/ToolbarButton");
var DropdownMenu_1 = require("../../../../ui/DropdownMenu");
var styles_1 = require("../../../../ui/styles");
var commands_1 = require("../../commands");
var messages_1 = require("../../messages");
var ToolbarLists = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarLists, _super);
    function ToolbarLists() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isDropdownOpen: false,
        };
        _this.onOpenChange = function (attrs) {
            _this.setState({
                isDropdownOpen: attrs.isDropdownOpen,
            });
        };
        _this.handleTriggerClick = function () {
            _this.onOpenChange({ isDropdownOpen: !_this.state.isDropdownOpen });
        };
        _this.createItems = function () {
            var _a = _this.props, bulletListDisabled = _a.bulletListDisabled, orderedListDisabled = _a.orderedListDisabled, bulletListActive = _a.bulletListActive, orderedListActive = _a.orderedListActive, formatMessage = _a.intl.formatMessage;
            var labelUnorderedList = formatMessage(messages_1.messages.unorderedList);
            var labelOrderedList = formatMessage(messages_1.messages.orderedList);
            var items = [
                {
                    content: labelUnorderedList,
                    value: { name: 'bullet_list' },
                    isDisabled: bulletListDisabled,
                    isActive: Boolean(bulletListActive),
                    elemAfter: React.createElement(styles_1.Shortcut, null, keymaps_1.tooltip(keymaps_1.toggleBulletList)),
                },
                {
                    content: labelOrderedList,
                    value: { name: 'ordered_list' },
                    isDisabled: orderedListDisabled,
                    isActive: Boolean(orderedListActive),
                    elemAfter: React.createElement(styles_1.Shortcut, null, keymaps_1.tooltip(keymaps_1.toggleOrderedList)),
                },
            ];
            return [{ items: items }];
        };
        _this.handleBulletListClick = analytics_1.withAnalytics('atlassian.editor.format.list.bullet.button', function () {
            if (!_this.props.bulletListDisabled) {
                return commands_1.toggleBulletList(_this.props.editorView);
            }
            return false;
        });
        _this.handleOrderedListClick = analytics_1.withAnalytics('atlassian.editor.format.list.numbered.button', function () {
            if (!_this.props.orderedListDisabled) {
                return commands_1.toggleOrderedList(_this.props.editorView);
            }
            return false;
        });
        _this.onItemActivated = function (_a) {
            var item = _a.item;
            _this.setState({ isDropdownOpen: false });
            switch (item.value.name) {
                case 'bullet_list':
                    _this.handleBulletListClick();
                    break;
                case 'ordered_list':
                    _this.handleOrderedListClick();
                    break;
            }
        };
        return _this;
    }
    ToolbarLists.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, isSmall = _a.isSmall, isReducedSpacing = _a.isReducedSpacing, isSeparator = _a.isSeparator, bulletListActive = _a.bulletListActive, bulletListDisabled = _a.bulletListDisabled, orderedListActive = _a.orderedListActive, orderedListDisabled = _a.orderedListDisabled, formatMessage = _a.intl.formatMessage;
        var isDropdownOpen = this.state.isDropdownOpen;
        if (!isSmall) {
            var labelUnorderedList = formatMessage(messages_1.messages.unorderedList);
            var labelOrderedList = formatMessage(messages_1.messages.orderedList);
            return (React.createElement(styles_1.ButtonGroup, { width: isReducedSpacing ? 'small' : 'large' },
                React.createElement(ToolbarButton_1.default, { spacing: isReducedSpacing ? 'none' : 'default', onClick: this.handleBulletListClick, selected: bulletListActive, disabled: bulletListDisabled || disabled, title: keymaps_1.tooltip(keymaps_1.toggleBulletList, labelUnorderedList), iconBefore: React.createElement(bullet_list_1.default, { label: labelUnorderedList }) }),
                React.createElement(ToolbarButton_1.default, { spacing: isReducedSpacing ? 'none' : 'default', onClick: this.handleOrderedListClick, selected: orderedListActive, disabled: orderedListDisabled || disabled, title: keymaps_1.tooltip(keymaps_1.toggleOrderedList, labelOrderedList), iconBefore: React.createElement(number_list_1.default, { label: labelOrderedList }) }),
                isSeparator && React.createElement(styles_1.Separator, null)));
        }
        else {
            var items = this.createItems();
            var _b = this.props, popupsMountPoint = _b.popupsMountPoint, popupsBoundariesElement = _b.popupsBoundariesElement, popupsScrollableElement = _b.popupsScrollableElement;
            var labelLists = formatMessage(messages_1.messages.lists);
            return (React.createElement(styles_1.Wrapper, null,
                React.createElement(DropdownMenu_1.default, { items: items, onItemActivated: this.onItemActivated, mountTo: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement, isOpen: isDropdownOpen, onOpenChange: this.onOpenChange, fitHeight: 188, fitWidth: 175 },
                    React.createElement(ToolbarButton_1.default, { spacing: isReducedSpacing ? 'none' : 'default', selected: bulletListActive || orderedListActive, disabled: disabled, onClick: this.handleTriggerClick, title: labelLists, iconBefore: React.createElement(styles_1.Wrapper, null,
                            React.createElement(bullet_list_1.default, { label: labelLists }),
                            React.createElement(styles_1.ExpandIconWrapper, null,
                                React.createElement(chevron_down_1.default, { label: labelLists }))) })),
                isSeparator && React.createElement(styles_1.Separator, null)));
        }
    };
    return ToolbarLists;
}(react_1.PureComponent));
exports.default = react_intl_1.injectIntl(ToolbarLists);
//# sourceMappingURL=index.js.map