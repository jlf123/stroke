"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var styles_1 = require("../styles");
var Lozenge_1 = require("../Lozenge");
var styles_2 = require("./styles");
var InlineExtension = /** @class */ (function (_super) {
    tslib_1.__extends(InlineExtension, _super);
    function InlineExtension() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InlineExtension.prototype.render = function () {
        var _a = this.props, node = _a.node, children = _a.children;
        var hasChildren = !!children;
        var className = hasChildren
            ? 'with-overlay with-children'
            : 'with-overlay';
        return (React.createElement(styles_2.Wrapper, { className: "extension-container " + className },
            React.createElement(styles_1.Overlay, { className: "extension-overlay" }),
            children ? children : React.createElement(Lozenge_1.default, { node: node })));
    };
    return InlineExtension;
}(react_1.Component));
exports.default = InlineExtension;
//# sourceMappingURL=index.js.map