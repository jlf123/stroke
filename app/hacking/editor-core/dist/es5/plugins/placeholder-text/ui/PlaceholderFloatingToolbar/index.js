"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_intl_1 = require("react-intl");
var PanelTextInput_1 = require("../../../../ui/PanelTextInput");
var FloatingToolbar_1 = require("../../../../ui/FloatingToolbar");
exports.messages = react_intl_1.defineMessages({
    placeholderTextPlaceholder: {
        id: 'fabric.editor.placeholderTextPlaceholder',
        defaultMessage: 'Add placeholder text',
        description: '',
    },
});
var PlaceholderFloatingToolbar = /** @class */ (function (_super) {
    tslib_1.__extends(PlaceholderFloatingToolbar, _super);
    function PlaceholderFloatingToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleSubmit = function (value) {
            if (value) {
                _this.props.insertPlaceholder(value);
                _this.props.setFocusInEditor();
            }
            else {
                _this.props.hidePlaceholderFloatingToolbar();
            }
        };
        _this.handleBlur = function () {
            _this.props.hidePlaceholderFloatingToolbar();
        };
        return _this;
    }
    PlaceholderFloatingToolbar.prototype.render = function () {
        var _a = this.props, getNodeFromPos = _a.getNodeFromPos, showInsertPanelAt = _a.showInsertPanelAt, editorViewDOM = _a.editorViewDOM, popupsMountPoint = _a.popupsMountPoint, getFixedCoordinatesFromPos = _a.getFixedCoordinatesFromPos, popupsBoundariesElement = _a.popupsBoundariesElement, formatMessage = _a.intl.formatMessage;
        var target = getNodeFromPos(showInsertPanelAt);
        var offsetParent = FloatingToolbar_1.getOffsetParent(editorViewDOM, popupsMountPoint);
        var getFixedCoordinates = function () {
            return getFixedCoordinatesFromPos(showInsertPanelAt);
        };
        var handlePositionCalculated = FloatingToolbar_1.handlePositionCalculatedWith(offsetParent, target, getFixedCoordinates);
        return (React.createElement(FloatingToolbar_1.default, { target: FloatingToolbar_1.getNearestNonTextNode(target), onPositionCalculated: handlePositionCalculated, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, fitHeight: 32, offset: [0, 12] },
            React.createElement(PanelTextInput_1.default, { placeholder: formatMessage(exports.messages.placeholderTextPlaceholder), onSubmit: this.handleSubmit, onBlur: this.handleBlur, autoFocus: true, width: 300 })));
    };
    return PlaceholderFloatingToolbar;
}(React.Component));
exports.default = react_intl_1.injectIntl(PlaceholderFloatingToolbar);
//# sourceMappingURL=index.js.map