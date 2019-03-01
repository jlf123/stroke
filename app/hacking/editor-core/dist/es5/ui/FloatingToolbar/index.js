"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var editor_common_1 = require("@atlaskit/editor-common");
var styles_1 = require("./styles");
var utils_1 = require("./utils");
exports.handlePositionCalculatedWith = utils_1.handlePositionCalculatedWith;
exports.getOffsetParent = utils_1.getOffsetParent;
exports.getNearestNonTextNode = utils_1.getNearestNonTextNode;
var FloatingToolbar = /** @class */ (function (_super) {
    tslib_1.__extends(FloatingToolbar, _super);
    function FloatingToolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FloatingToolbar.prototype.render = function () {
        var _a = this.props, containerRef = _a.containerRef, children = _a.children, target = _a.target, offset = _a.offset, fitWidth = _a.fitWidth, _b = _a.fitHeight, fitHeight = _b === void 0 ? 40 : _b, onPositionCalculated = _a.onPositionCalculated, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, className = _a.className, alignX = _a.alignX, alignY = _a.alignY, zIndex = _a.zIndex;
        if (!target) {
            return null;
        }
        return (React.createElement(editor_common_1.Popup, { alignX: alignX, alignY: alignY, target: target, zIndex: zIndex, mountTo: popupsMountPoint, boundariesElement: popupsBoundariesElement, offset: offset, fitWidth: fitWidth, fitHeight: fitHeight, onPositionCalculated: onPositionCalculated },
            React.createElement(styles_1.Container, { height: fitHeight, className: className, innerRef: containerRef }, children)));
    };
    return FloatingToolbar;
}(react_1.PureComponent));
exports.default = FloatingToolbar;
//# sourceMappingURL=index.js.map