"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var editor_common_1 = require("@atlaskit/editor-common");
var theme_1 = require("@atlaskit/theme");
var status_1 = require("@atlaskit/status");
var styles_1 = require("../../../ui/styles");
var with_outer_listeners_1 = require("../../../ui/with-outer-listeners");
var actions_1 = require("../actions");
var analytics_next_1 = require("@atlaskit/analytics-next");
var analytics_1 = require("../analytics");
var PopupWithListeners = with_outer_listeners_1.default(editor_common_1.Popup);
var InputMethod;
(function (InputMethod) {
    InputMethod["blur"] = "blur";
    InputMethod["escKey"] = "escKey";
    InputMethod["enterKey"] = "enterKey";
})(InputMethod = exports.InputMethod || (exports.InputMethod = {}));
var PickerContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  background: ", ";\n  padding: ", "px 0;\n  border-radius: ", "px;\n  ", ";\n"], ["\n  background: ", ";\n  padding: ", "px 0;\n  border-radius: ", "px;\n  ", ";\n"])), theme_1.colors.N0, theme_1.gridSize(), theme_1.borderRadius(), styles_1.dropShadow);
var StatusPicker = /** @class */ (function (_super) {
    tslib_1.__extends(StatusPicker, _super);
    function StatusPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.handleCloseStatusPicker = function (inputMethod) { return function () {
            _this.inputMethod = inputMethod;
            _this.props.closeStatusPicker();
        }; };
        _this.handleClickOutside = _this.handleCloseStatusPicker(InputMethod.blur);
        _this.handleEscapeKeydown = _this.handleCloseStatusPicker(InputMethod.escKey);
        _this.handleEnterKeydown = _this.handleCloseStatusPicker(InputMethod.enterKey);
        _this.onColorHover = function (color) {
            _this.createStatusAnalyticsAndFireFunc({
                action: 'hovered',
                actionSubject: 'statusColorPicker',
                attributes: {
                    color: color,
                    localId: _this.state.localId,
                },
            });
        };
        _this.onColorClick = function (color) {
            var _a = _this.state, text = _a.text, localId = _a.localId;
            _this.setState({ color: color });
            _this.props.onSelect({
                text: text,
                color: color,
                localId: localId,
            });
            _this.createStatusAnalyticsAndFireFunc({
                action: 'clicked',
                actionSubject: 'statusColorPicker',
                attributes: {
                    color: color,
                    localId: localId,
                },
            });
        };
        _this.onTextChanged = function (text) {
            var _a = _this.state, color = _a.color, localId = _a.localId;
            _this.setState({ text: text });
            _this.props.onTextChanged({
                text: text,
                color: color,
                localId: localId,
            });
        };
        _this.onEnter = function () {
            _this.props.onEnter(_this.state);
        };
        // cancel bubbling to fix clickOutside logic:
        // popup re-renders its content before the click event bubbles up to the document
        // therefore click target element would be different from the popup content
        _this.handlePopupClick = function (event) {
            return event.nativeEvent.stopImmediatePropagation();
        };
        _this.state = _this.extractStateFromProps(props);
        _this.createStatusAnalyticsAndFireFunc = analytics_1.createStatusAnalyticsAndFire(props.createAnalyticsEvent);
        return _this;
    }
    StatusPicker.prototype.componentDidMount = function () {
        var _a = this.state, color = _a.color, text = _a.text, localId = _a.localId;
        this.startTime = Date.now();
        this.inputMethod = InputMethod.blur;
        this.createStatusAnalyticsAndFireFunc({
            action: 'opened',
            actionSubject: 'statusPopup',
            attributes: {
                textLength: text ? text.length : 0,
                selectedColor: color,
                localId: localId,
            },
        });
    };
    StatusPicker.prototype.componentWillUnmount = function () {
        var _a = this.state, color = _a.color, text = _a.text, localId = _a.localId;
        var inputMethod = this.inputMethod;
        this.createStatusAnalyticsAndFireFunc({
            action: 'closed',
            actionSubject: 'statusPopup',
            attributes: {
                inputMethod: inputMethod,
                duration: Date.now() - this.startTime,
                textLength: text ? text.length : 0,
                selectedColor: color,
                localId: localId,
            },
        });
        this.startTime = 0;
    };
    StatusPicker.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        var element = this.props.target;
        if (prevProps.target !== element) {
            this.setState(this.extractStateFromProps(this.props));
        }
    };
    StatusPicker.prototype.extractStateFromProps = function (props) {
        var state = {};
        var defaultColor = props.defaultColor, defaultText = props.defaultText, defaultLocalId = props.defaultLocalId;
        state.color = defaultColor || actions_1.DEFAULT_STATUS.color;
        state.text = defaultText || actions_1.DEFAULT_STATUS.text;
        state.localId = defaultLocalId;
        return state;
    };
    StatusPicker.prototype.render = function () {
        var _a = this.props, autoFocus = _a.autoFocus, target = _a.target;
        var _b = this.state, color = _b.color, text = _b.text;
        return (target && (React.createElement(PopupWithListeners, { target: target, offset: [0, 8], handleClickOutside: this.handleClickOutside, handleEscapeKeydown: this.handleEscapeKeydown, handleEnterKeydown: this.handleEnterKeydown, zIndex: editor_common_1.akEditorFloatingDialogZIndex, fitHeight: 40 },
            React.createElement(PickerContainer, { onClick: this.handlePopupClick },
                React.createElement(status_1.StatusPicker, { autoFocus: autoFocus, selectedColor: color, text: text, onColorClick: this.onColorClick, onColorHover: this.onColorHover, onTextChanged: this.onTextChanged, onEnter: this.onEnter })))));
    };
    StatusPicker.defaultProps = {
        autoFocus: false,
    };
    return StatusPicker;
}(React.Component));
exports.default = analytics_next_1.withAnalyticsEvents()(StatusPicker);
var templateObject_1;
//# sourceMappingURL=statusPicker.js.map