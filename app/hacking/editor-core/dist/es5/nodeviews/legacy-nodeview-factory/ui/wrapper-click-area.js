"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var utils_1 = require("../../../utils");
var BlockWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  width: 100%;\n"], ["\n  width: 100%;\n"])));
BlockWrapper.displayName = 'BlockWrapperClickArea';
var InlineWrapper = styled_components_1.default.span(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""])));
InlineWrapper.displayName = 'InlineWrapperClickArea';
// tslint:disable-next-line:variable-name
function wrapComponentWithClickArea(ReactComponent, inline) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(WrapperClickArea, _super);
        function WrapperClickArea() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = { selected: false };
            _this.handleDocumentSelectionChange = function (anchorPos, headPos) {
                var _a = _this.props, getPos = _a.getPos, onSelection = _a.onSelection;
                var nodePos = getPos();
                var selected = nodePos >= anchorPos && nodePos < headPos;
                var oldSelected = _this.state.selected;
                _this.setState({ selected: selected }, function () {
                    if (onSelection && selected !== oldSelected) {
                        onSelection(selected);
                    }
                });
            };
            _this.onClick = function () {
                var _a = _this.props, getPos = _a.getPos, view = _a.view;
                utils_1.setNodeSelection(view, getPos());
            };
            return _this;
        }
        WrapperClickArea.prototype.componentDidMount = function () {
            var pluginState = this.props.pluginState;
            pluginState.subscribe(this.handleDocumentSelectionChange);
        };
        WrapperClickArea.prototype.componentWillUnmount = function () {
            var pluginState = this.props.pluginState;
            pluginState.unsubscribe(this.handleDocumentSelectionChange);
        };
        WrapperClickArea.prototype.render = function () {
            var Wrapper = inline ? InlineWrapper : BlockWrapper;
            return (React.createElement(Wrapper, { onClick: this.onClick },
                React.createElement(ReactComponent, tslib_1.__assign({}, this.props, { selected: this.state.selected }))));
        };
        return WrapperClickArea;
    }(react_1.PureComponent));
}
exports.default = wrapComponentWithClickArea;
var templateObject_1, templateObject_2;
//# sourceMappingURL=wrapper-click-area.js.map