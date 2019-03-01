"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_intl_1 = require("react-intl");
var styled_components_1 = require("styled-components");
var status_1 = require("@atlaskit/status");
var plugin_1 = require("../plugin");
var actions_1 = require("../actions");
var theme_1 = require("@atlaskit/theme");
var B100 = theme_1.colors.B100;
exports.StatusContainer = styled_components_1.default.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  cursor: pointer;\n\n  display: inline-block;\n  border-radius: 5px;\n  max-width: 100%;\n\n  /* Prevent responsive layouts increasing height of container by changing\n     font size and therefore line-height. */\n  line-height: 0;\n\n  opacity: ", ";\n\n  border: 2px solid ", ";\n  }\n\n  * ::selection {\n    background-color: transparent;\n  }\n"], ["\n  cursor: pointer;\n\n  display: inline-block;\n  border-radius: 5px;\n  max-width: 100%;\n\n  /* Prevent responsive layouts increasing height of container by changing\n     font size and therefore line-height. */\n  line-height: 0;\n\n  opacity: ",
    ";\n\n  border: 2px solid ",
    ";\n  }\n\n  * ::selection {\n    background-color: transparent;\n  }\n"])), function (props) {
    return props.placeholderStyle ? 0.5 : 1;
}, function (props) {
    return props.selected ? B100 : 'transparent';
});
exports.messages = react_intl_1.defineMessages({
    placeholder: {
        id: 'fabric.editor.statusPlaceholder',
        defaultMessage: 'Set a status',
        description: 'Placeholder description for an empty (new) status item in the editor',
    },
});
var StatusNodeView = /** @class */ (function (_super) {
    tslib_1.__extends(StatusNodeView, _super);
    function StatusNodeView(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSelectionChange = function (newSelection, prevSelection) {
            var getPos = _this.props.getPos;
            var from = newSelection.from, to = newSelection.to;
            var statusPos = getPos();
            var selected = from <= statusPos && to > statusPos;
            if (_this.state.selected !== selected) {
                _this.setState({
                    selected: selected,
                });
            }
        };
        _this.handleClick = function (event) {
            if (event.nativeEvent.stopImmediatePropagation) {
                event.nativeEvent.stopImmediatePropagation();
            }
            var _a = _this.props.view, state = _a.state, dispatch = _a.dispatch;
            actions_1.setStatusPickerAt(state.selection.from)(state, dispatch);
        };
        _this.state = {
            selected: false,
        };
        return _this;
    }
    StatusNodeView.prototype.componentDidMount = function () {
        var view = this.props.view;
        var selectionChanges = plugin_1.pluginKey.getState(view.state).selectionChanges;
        if (selectionChanges) {
            selectionChanges.subscribe(this.handleSelectionChange);
        }
    };
    StatusNodeView.prototype.componentWillUnmount = function () {
        var view = this.props.view;
        var selectionChanges = plugin_1.pluginKey.getState(view.state).selectionChanges;
        if (selectionChanges) {
            selectionChanges.unsubscribe(this.handleSelectionChange);
        }
    };
    StatusNodeView.prototype.render = function () {
        var _a = this.props, _b = _a.node.attrs, text = _b.text, color = _b.color, localId = _b.localId, formatMessage = _a.intl.formatMessage;
        var selected = this.state.selected;
        var statusText = text ? text : formatMessage(exports.messages.placeholder);
        return (React.createElement(exports.StatusContainer, { selected: selected, placeholderStyle: !text },
            React.createElement(status_1.Status, { text: statusText, color: color, localId: localId, onClick: this.handleClick })));
    };
    return StatusNodeView;
}(React.Component));
exports.default = react_intl_1.injectIntl(StatusNodeView);
var templateObject_1;
//# sourceMappingURL=status.js.map