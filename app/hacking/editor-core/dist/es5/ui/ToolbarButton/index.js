"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tooltip_1 = require("@atlaskit/tooltip");
var React = require("react");
var react_1 = require("react");
var styles_1 = require("./styles");
var ToolbarButton = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarButton, _super);
    function ToolbarButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (event) {
            var _a = _this.props, disabled = _a.disabled, onClick = _a.onClick;
            if (!disabled && onClick) {
                onClick(event);
            }
        };
        return _this;
    }
    ToolbarButton.prototype.render = function () {
        var button = (React.createElement(styles_1.AkButton, { appearance: "subtle", ariaHaspopup: true, className: this.props.className, href: this.props.href, ariaLabel: this.props.ariaLabel, iconAfter: this.props.iconAfter, iconBefore: this.props.iconBefore, isDisabled: this.props.disabled, isSelected: this.props.selected, onClick: this.handleClick, spacing: this.props.spacing || 'default', target: this.props.target, theme: this.props.theme, shouldFitContainer: true }, this.props.children));
        var position = this.props.titlePosition || 'top';
        var tooltipContent = !this.props.hideTooltip ? this.props.title : null;
        return this.props.title ? (React.createElement(tooltip_1.default, { content: tooltipContent, hideTooltipOnClick: true, position: position }, button)) : (button);
    };
    ToolbarButton.defaultProps = {
        className: '',
    };
    return ToolbarButton;
}(react_1.PureComponent));
exports.default = ToolbarButton;
//# sourceMappingURL=index.js.map