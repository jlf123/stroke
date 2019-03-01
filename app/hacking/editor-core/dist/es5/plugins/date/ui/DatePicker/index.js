"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ReactDOM = require("react-dom");
var editor_common_1 = require("@atlaskit/editor-common");
var calendar_1 = require("@atlaskit/calendar");
var theme_1 = require("@atlaskit/theme");
var with_outer_listeners_1 = require("../../../../ui/with-outer-listeners");
var PopupWithListeners = with_outer_listeners_1.default(editor_common_1.Popup);
var calendarStyle = {
    padding: theme_1.borderRadius(),
    borderRadius: theme_1.borderRadius(),
    boxShadow: "0 4px 8px -2px " + theme_1.colors.N60A + ", 0 0 1px " + theme_1.colors.N60A,
    backgroundColor: theme_1.colors.N0,
};
var DatePicker = /** @class */ (function (_super) {
    tslib_1.__extends(DatePicker, _super);
    function DatePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = function (_a) {
            var day = _a.day, month = _a.month, year = _a.year;
            _this.setState({
                day: day,
                month: month,
                year: year,
            });
        };
        _this.handleRef = function (ref) {
            var elm = ref && ReactDOM.findDOMNode(ref);
            if (elm) {
                elm.focus();
            }
        };
        var timestamp = props.element.getAttribute('timestamp');
        if (timestamp) {
            var _a = editor_common_1.timestampToUTCDate(timestamp), day = _a.day, month = _a.month, year = _a.year;
            _this.state = {
                selected: [editor_common_1.timestampToIsoFormat(timestamp)],
                day: day,
                month: month,
                year: year,
            };
        }
        return _this;
    }
    DatePicker.prototype.render = function () {
        var _a = this.props, element = _a.element, closeDatePicker = _a.closeDatePicker, onSelect = _a.onSelect;
        var timestamp = element.getAttribute('timestamp');
        if (!timestamp) {
            return null;
        }
        return (React.createElement(PopupWithListeners, { target: element, offset: [0, 8], fitHeight: 327, fitWidth: 340, handleClickOutside: closeDatePicker, handleEscapeKeydown: closeDatePicker, zIndex: editor_common_1.akEditorFloatingDialogZIndex },
            React.createElement(calendar_1.default, tslib_1.__assign({ onChange: this.handleChange, onSelect: onSelect }, this.state, { ref: this.handleRef, innerProps: { style: calendarStyle } }))));
    };
    return DatePicker;
}(React.Component));
exports.default = DatePicker;
//# sourceMappingURL=index.js.map