"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var AlignmentButton_1 = require("./AlignmentButton");
var styles_1 = require("./styles");
var ToolbarAlignment_1 = require("../../plugins/alignment/ui/ToolbarAlignment");
var alignmentOptions = [
    { title: 'Align left', value: 'start' },
    { title: 'Align center', value: 'center' },
    { title: 'Align right', value: 'end' },
];
var Alignment = /** @class */ (function (_super) {
    tslib_1.__extends(Alignment, _super);
    function Alignment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Alignment.prototype.render = function () {
        var _a = this.props, onClick = _a.onClick, selectedAlignment = _a.selectedAlignment, className = _a.className;
        return (React.createElement(styles_1.AlignmentWrapper, { className: className, style: { maxWidth: 3 * 32 } }, alignmentOptions.map(function (alignment) {
            var value = alignment.value, title = alignment.title;
            return (React.createElement(AlignmentButton_1.default, { content: ToolbarAlignment_1.iconMap[value], key: value, value: value, label: title, onClick: onClick, isSelected: value === selectedAlignment }));
        })));
    };
    return Alignment;
}(react_1.PureComponent));
exports.default = Alignment;
//# sourceMappingURL=index.js.map