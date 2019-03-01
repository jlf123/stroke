"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var react_intl_1 = require("react-intl");
var done_1 = require("@atlaskit/icon/glyph/editor/done");
var theme_1 = require("@atlaskit/theme");
var styles_1 = require("./styles");
// IMO these should live inside @atlaskit/theme
var messages = react_intl_1.defineMessages({
    '#172b4d': {
        id: 'fabric.theme.#172b4d',
        defaultMessage: 'Dark gray',
        description: 'Name of a color.',
    },
    '#97a0af': {
        id: 'fabric.theme.#97a0af',
        defaultMessage: 'Light grey',
        description: 'Name of a color.',
    },
    '#6554c0': {
        id: 'fabric.theme.#6554c0',
        defaultMessage: 'Purple',
        description: 'Name of a color.',
    },
    '#00b8d9': {
        id: 'fabric.theme.#00b8d9',
        defaultMessage: 'Teal',
        description: 'Name of a color.',
    },
    '#36b37e': {
        id: 'fabric.theme.#36b37e',
        defaultMessage: 'Green',
        description: 'Name of a color.',
    },
    '#ff5630': {
        id: 'fabric.theme.#ff5630',
        defaultMessage: 'Red',
        description: 'Name of a color.',
    },
    '#ff991f': {
        id: 'fabric.theme.#ff991f',
        defaultMessage: 'Orange',
        description: 'Name of a color.',
    },
    selected: {
        id: 'fabric.editor.selected',
        defaultMessage: 'Selected',
        description: 'If the item is selected or not.',
    },
});
var Color = /** @class */ (function (_super) {
    tslib_1.__extends(Color, _super);
    function Color() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onMouseDown = function (e) {
            e.preventDefault();
        };
        _this.onClick = function (e) {
            var _a = _this.props, onClick = _a.onClick, value = _a.value;
            e.preventDefault();
            onClick(value);
        };
        return _this;
    }
    Color.prototype.render = function () {
        var _a = this.props, tabIndex = _a.tabIndex, value = _a.value, label = _a.label, isSelected = _a.isSelected, borderColor = _a.borderColor, _b = _a.checkMarkColor, checkMarkColor = _b === void 0 ? theme_1.colors.N0 : _b, formatMessage = _a.intl.formatMessage;
        var borderStyle = "1px solid " + borderColor;
        return (React.createElement(styles_1.ButtonWrapper, null,
            React.createElement(styles_1.Button, { onClick: this.onClick, onMouseDown: this.onMouseDown, tabIndex: tabIndex, className: "" + (isSelected ? 'selected' : ''), title: value && messages[value] ? formatMessage(messages[value]) : label, style: {
                    backgroundColor: value || 'transparent',
                    border: borderStyle,
                } }, isSelected && (React.createElement(done_1.default, { primaryColor: checkMarkColor, label: formatMessage(messages.selected) })))));
    };
    return Color;
}(react_1.PureComponent));
exports.default = react_intl_1.injectIntl(Color);
//# sourceMappingURL=index.js.map