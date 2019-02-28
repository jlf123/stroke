"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var Color_1 = require("./Color");
var styles_1 = require("./styles");
var ColorPalette = /** @class */ (function (_super) {
    tslib_1.__extends(ColorPalette, _super);
    function ColorPalette() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorPalette.prototype.render = function () {
        var _a = this.props, palette = _a.palette, _b = _a.cols, cols = _b === void 0 ? 7 : _b, onClick = _a.onClick, selectedColor = _a.selectedColor, borderColors = _a.borderColors, className = _a.className, checkMarkColor = _a.checkMarkColor;
        var colors = [];
        palette.forEach(function (value, key) { return colors.push([key, value]); });
        return (React.createElement(styles_1.ColorPaletteWrapper, { className: className, style: { maxWidth: cols * 32 } }, colors.map(function (_a) {
            var _b = tslib_1.__read(_a, 2), color = _b[0], label = _b[1];
            return (React.createElement(Color_1.default, { key: color, value: color, borderColor: borderColors[label.toLowerCase() || 'transparent'], label: label, onClick: onClick, isSelected: color === selectedColor, checkMarkColor: checkMarkColor }));
        })));
    };
    return ColorPalette;
}(react_1.PureComponent));
exports.default = ColorPalette;
//# sourceMappingURL=index.js.map