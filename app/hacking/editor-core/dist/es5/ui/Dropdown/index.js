"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var droplist_1 = require("@atlaskit/droplist");
var editor_common_1 = require("@atlaskit/editor-common");
/**
 * Wrapper around @atlaskit/droplist which uses Popup and Portal to render
 * droplist outside of "overflow: hidden" containers when needed.
 *
 * Also it controls popper's placement.
 */
var Dropdown = /** @class */ (function (_super) {
    tslib_1.__extends(Dropdown, _super);
    function Dropdown(props) {
        var _this = _super.call(this, props) || this;
        _this.handleRef = function (target) {
            _this.setState({ target: target });
        };
        _this.updatePopupPlacement = function (placement) {
            _this.setState({ popupPlacement: placement });
        };
        _this.state = {
            popupPlacement: ['bottom', 'left'],
        };
        return _this;
    }
    Dropdown.prototype.renderDropdown = function () {
        var _a = this.state, target = _a.target, popupPlacement = _a.popupPlacement;
        var _b = this.props, children = _b.children, mountTo = _b.mountTo, boundariesElement = _b.boundariesElement, scrollableElement = _b.scrollableElement, onOpenChange = _b.onOpenChange, fitHeight = _b.fitHeight, fitWidth = _b.fitWidth, zIndex = _b.zIndex;
        return (React.createElement(editor_common_1.Popup, { target: target, mountTo: mountTo, boundariesElement: boundariesElement, scrollableElement: scrollableElement, onPlacementChanged: this.updatePopupPlacement, fitHeight: fitHeight, fitWidth: fitWidth, zIndex: zIndex },
            React.createElement("div", { style: { height: 0, minWidth: fitWidth || 0 } },
                React.createElement(droplist_1.default, { isOpen: true, onOpenChange: onOpenChange, appearance: "tall", position: popupPlacement.join(' '), shouldFlip: false, shouldFitContainer: true }, children))));
    };
    Dropdown.prototype.render = function () {
        var _a = this.props, trigger = _a.trigger, isOpen = _a.isOpen;
        return (React.createElement("div", null,
            React.createElement("div", { ref: this.handleRef }, trigger),
            isOpen ? this.renderDropdown() : null));
    };
    return Dropdown;
}(react_1.PureComponent));
exports.default = Dropdown;
//# sourceMappingURL=index.js.map