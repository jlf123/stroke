"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var react_intl_1 = require("react-intl");
var chevron_down_1 = require("@atlaskit/icon/glyph/chevron-down");
var text_style_1 = require("@atlaskit/icon/glyph/editor/text-style");
var editor_common_1 = require("@atlaskit/editor-common");
var analytics_1 = require("../../../../analytics");
var ToolbarButton_1 = require("../../../../ui/ToolbarButton");
var DropdownMenu_1 = require("../../../../ui/DropdownMenu");
var styles_1 = require("../../../../ui/styles");
var types_1 = require("../../types");
var styled_1 = require("./styled");
exports.messages = react_intl_1.defineMessages({
    textStyles: {
        id: 'fabric.editor.textStyles',
        defaultMessage: 'Text styles',
        description: 'Menu provides access to various heading styles or normal text',
    },
});
var ToolbarBlockType = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarBlockType, _super);
    function ToolbarBlockType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            active: false,
        };
        _this.onOpenChange = function (attrs) {
            _this.setState({ active: attrs.isOpen });
        };
        _this.handleTriggerClick = function () {
            _this.onOpenChange({ isOpen: !_this.state.active });
        };
        _this.createItems = function () {
            var formatMessage = _this.props.intl.formatMessage;
            var _a = _this.props.pluginState, currentBlockType = _a.currentBlockType, availableBlockTypes = _a.availableBlockTypes;
            var items = availableBlockTypes.reduce(function (acc, blockType, blockTypeNo) {
                var isActive = currentBlockType === blockType;
                var tagName = blockType.tagName || 'p';
                acc.push({
                    content: (React.createElement(styled_1.BlockTypeMenuItem, { tagName: tagName, selected: isActive }, react_1.createElement(tagName, {}, formatMessage(blockType.title)))),
                    value: blockType,
                    key: blockType + "-" + blockTypeNo,
                    // ED-2853, hiding tooltips as shortcuts are not working atm.
                    // tooltipDescription: tooltip(findKeymapByDescription(blockType.title)),
                    // tooltipPosition: 'right',
                    isActive: isActive,
                });
                return acc;
            }, []);
            return [{ items: items }];
        };
        _this.handleSelectBlockType = function (_a) {
            var item = _a.item;
            var blockType = item.value;
            _this.props.setBlockType(blockType.name);
            _this.setState({ active: false });
            analytics_1.analyticsService.trackEvent("atlassian.editor.format." + blockType.name + ".button");
        };
        return _this;
    }
    ToolbarBlockType.prototype.render = function () {
        var _this = this;
        var active = this.state.active;
        var _a = this.props, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, isSmall = _a.isSmall, isReducedSpacing = _a.isReducedSpacing, _b = _a.pluginState, currentBlockType = _b.currentBlockType, blockTypesDisabled = _b.blockTypesDisabled, availableBlockTypes = _b.availableBlockTypes, formatMessage = _a.intl.formatMessage;
        var isHeadingDisabled = !availableBlockTypes.some(function (blockType) { return blockType.nodeName === 'heading'; });
        if (isHeadingDisabled) {
            return null;
        }
        var blockTypeTitles = availableBlockTypes
            .filter(function (blockType) { return blockType.name === currentBlockType.name; })
            .map(function (blockType) { return blockType.title; });
        var longestDropdownMenuItem = tslib_1.__spread([
            types_1.NORMAL_TEXT
        ], availableBlockTypes).reduce(function (longest, item) {
            var itemTitle = formatMessage(item.title);
            return itemTitle.length >= longest.length ? itemTitle : longest;
        }, '');
        var toolbarButtonFactory = function (disabled) {
            var labelTextStyles = formatMessage(exports.messages.textStyles);
            return (React.createElement(ToolbarButton_1.default, { spacing: isReducedSpacing ? 'none' : 'default', selected: active, className: "block-type-btn", disabled: disabled, onClick: _this.handleTriggerClick, title: labelTextStyles, ariaLabel: "Font style", iconAfter: React.createElement(styles_1.Wrapper, { isSmall: isSmall },
                    isSmall && React.createElement(text_style_1.default, { label: labelTextStyles }),
                    React.createElement(styles_1.ExpandIconWrapper, null,
                        React.createElement(chevron_down_1.default, { label: labelTextStyles }))) }, !isSmall && (React.createElement(styles_1.ButtonContent, null,
                React.createElement(react_intl_1.FormattedMessage, tslib_1.__assign({}, blockTypeTitles[0] || types_1.NORMAL_TEXT.title)),
                React.createElement("div", { style: { overflow: 'hidden', height: 0 } }, longestDropdownMenuItem)))));
        };
        if (!this.props.isDisabled && !blockTypesDisabled) {
            var items = this.createItems();
            return (React.createElement(styles_1.MenuWrapper, null,
                React.createElement(DropdownMenu_1.default, { items: items, onOpenChange: this.onOpenChange, onItemActivated: this.handleSelectBlockType, isOpen: active, mountTo: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement, zIndex: editor_common_1.akEditorMenuZIndex, fitHeight: 360, fitWidth: 106 }, toolbarButtonFactory(false)),
                React.createElement(styles_1.Separator, null)));
        }
        return (React.createElement(styles_1.Wrapper, null,
            toolbarButtonFactory(true),
            React.createElement(styles_1.Separator, null)));
    };
    return ToolbarBlockType;
}(React.PureComponent));
exports.default = react_intl_1.injectIntl(ToolbarBlockType);
//# sourceMappingURL=index.js.map