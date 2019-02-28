"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var more_1 = require("@atlaskit/icon/glyph/editor/more");
var editor_common_1 = require("@atlaskit/editor-common");
var ToolbarButton_1 = require("../../ToolbarButton");
var WithEditorActions_1 = require("../../WithEditorActions");
var with_outer_listeners_1 = require("../../with-outer-listeners");
var __1 = require("../");
// tslint:disable-next-line:variable-name
var AddonPopup = with_outer_listeners_1.default(editor_common_1.Popup);
var POPUP_HEIGHT = 188;
var POPUP_WIDTH = 136;
var AddonToolbar = /** @class */ (function (_super) {
    tslib_1.__extends(AddonToolbar, _super);
    function AddonToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: false,
            addonDropdownContent: null,
        };
        _this.togglePopup = function () {
            _this.setState({
                isOpen: !_this.state.isOpen,
                addonDropdownContent: null,
            });
        };
        _this.handleDropdownClick = function (editorActions, renderOnClick) {
            if (renderOnClick) {
                // popup stays open, we just change its content to the component that is returned from renderOnClick()
                _this.setState({
                    addonDropdownContent: renderOnClick(editorActions, _this.togglePopup),
                });
            }
            else {
                // close popup
                _this.togglePopup();
            }
        };
        _this.handleRef = function (target) {
            _this.setState({ target: target });
        };
        // cancel bubbling to fix clickOutside logic:
        // popup re-renders its content before the click event bubbles up to the document
        // therefore click target element would be different from the popup content
        _this.handlePopupClick = function (event) {
            return event.nativeEvent.stopImmediatePropagation();
        };
        return _this;
    }
    AddonToolbar.prototype.render = function () {
        var _this = this;
        var _a = this.props, dropdownItems = _a.dropdownItems, isReducedSpacing = _a.isReducedSpacing;
        var _b = this.state, addonDropdownContent = _b.addonDropdownContent, isOpen = _b.isOpen;
        if (!dropdownItems ||
            (Array.isArray(dropdownItems) && !dropdownItems.length)) {
            return null;
        }
        return (React.createElement("div", { ref: this.handleRef },
            React.createElement(ToolbarButton_1.default, { selected: isOpen, spacing: isReducedSpacing ? 'none' : 'default', onClick: this.togglePopup, title: "Insert addon", iconBefore: React.createElement(more_1.default, { label: "Insert addon" }) }),
            isOpen && (React.createElement(AddonPopup, { handleClickOutside: this.togglePopup, handleEscapeKeydown: this.togglePopup, target: this.state.target, fitHeight: POPUP_HEIGHT, fitWidth: POPUP_WIDTH, alignY: "top" },
                React.createElement("span", { onClick: this.handlePopupClick }, addonDropdownContent ? (addonDropdownContent) : (React.createElement(WithEditorActions_1.default
                // tslint:disable-next-line:jsx-no-lambda
                , { 
                    // tslint:disable-next-line:jsx-no-lambda
                    render: function (editorActions) { return (React.createElement(__1.Dropdown, { onClick: _this.handleDropdownClick, togglePopup: _this.togglePopup, editorActions: editorActions }, dropdownItems)); } })))))));
    };
    return AddonToolbar;
}(React.Component));
exports.default = AddonToolbar;
//# sourceMappingURL=index.js.map