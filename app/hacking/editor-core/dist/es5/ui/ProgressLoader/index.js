"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var cross_1 = require("@atlaskit/icon/glyph/cross");
var button_1 = require("@atlaskit/button");
var styles_1 = require("./styles");
var ProgressLoader = /** @class */ (function (_super) {
    tslib_1.__extends(ProgressLoader, _super);
    function ProgressLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProgressLoader.prototype.render = function () {
        var _a = this.props, progress = _a.progress, maxWidth = _a.maxWidth, onCancel = _a.onCancel, cancelLabel = _a.cancelLabel;
        var maxLoaderWidth = maxWidth - 45;
        return (React.createElement(styles_1.Container, null,
            React.createElement(styles_1.ProgressLoaderWrapper, null,
                React.createElement(styles_1.BackgroundWrapper, { maxWidth: maxLoaderWidth },
                    React.createElement(styles_1.LoaderStyle, { progress: progress, maxWidth: maxLoaderWidth }))),
            onCancel && (React.createElement("div", { onClick: onCancel },
                React.createElement(button_1.default, { appearance: "subtle" },
                    React.createElement(cross_1.default, { size: "small", label: cancelLabel || '' }))))));
    };
    return ProgressLoader;
}(react_1.PureComponent));
exports.default = ProgressLoader;
//# sourceMappingURL=index.js.map