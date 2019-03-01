"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var ToolbarButton_1 = require("../../ToolbarButton");
var AlignmentButton = /** @class */ (function (_super) {
    tslib_1.__extends(AlignmentButton, _super);
    function AlignmentButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClick = function (e) {
            var _a = _this.props, onClick = _a.onClick, value = _a.value;
            e.preventDefault();
            onClick(value);
        };
        return _this;
    }
    AlignmentButton.prototype.render = function () {
        var _a = this.props, label = _a.label, isSelected = _a.isSelected, content = _a.content;
        return (React.createElement(ToolbarButton_1.default, { disabled: false, selected: isSelected, title: label, onClick: this.onClick, iconBefore: content }));
    };
    return AlignmentButton;
}(react_1.PureComponent));
exports.default = AlignmentButton;
//# sourceMappingURL=index.js.map