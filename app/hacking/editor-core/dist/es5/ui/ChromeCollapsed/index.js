"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var styles_1 = require("./styles");
var ChromeCollapsed = /** @class */ (function (_super) {
    tslib_1.__extends(ChromeCollapsed, _super);
    function ChromeCollapsed() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.focusHandler = function (e) {
            /**
             * We need this magic for FireFox.
             * The reason we need it is, when, in FireFox, we have focus inside input,
             * and then we remove that input and move focus to another place programmatically,
             * for whatever reason UP/DOWN arrows don't work until you blur and focus editor manually.
             */
            if (_this.input) {
                _this.input.blur();
            }
            if (_this.props.onFocus) {
                _this.props.onFocus(e);
            }
        };
        _this.handleInputRef = function (ref) {
            _this.input = ref;
        };
        return _this;
    }
    ChromeCollapsed.prototype.render = function () {
        var placeholder = this.props.text || 'Type something…';
        return (React.createElement(styles_1.Input, { innerRef: this.handleInputRef, onFocus: this.focusHandler, placeholder: placeholder }));
    };
    return ChromeCollapsed;
}(react_1.PureComponent));
exports.default = ChromeCollapsed;
//# sourceMappingURL=index.js.map