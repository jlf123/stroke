"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var theme_1 = require("@atlaskit/theme");
var editor_common_1 = require("@atlaskit/editor-common");
var date_1 = require("@atlaskit/date");
var actions_1 = require("../actions");
var SelectableDate = styled_components_1.default(date_1.Date)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  .ProseMirror-selectednode & {\n    display: 'relative';\n    &::before {\n      content: '';\n      border: 2px solid ", ";\n      display: 'absolute';\n      background: transparent;\n      border-radius: ", "px;\n      box-sizing: border-box;\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      pointer-events: none;\n    }\n  }\n"], ["\n  .ProseMirror-selectednode & {\n    display: 'relative';\n    &::before {\n      content: '';\n      border: 2px solid ", ";\n      display: 'absolute';\n      background: transparent;\n      border-radius: ", "px;\n      box-sizing: border-box;\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      pointer-events: none;\n    }\n  }\n"])), theme_1.colors.B200, theme_1.borderRadius());
var DateNodeView = /** @class */ (function (_super) {
    tslib_1.__extends(DateNodeView, _super);
    function DateNodeView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (event) {
            event.nativeEvent.stopImmediatePropagation();
            var _a = _this.props.view, state = _a.state, dispatch = _a.dispatch;
            actions_1.setDatePickerAt(state.selection.from)(state, dispatch);
        };
        return _this;
    }
    DateNodeView.prototype.render = function () {
        var _a = this.props, timestamp = _a.node.attrs.timestamp, _b = _a.view.state, schema = _b.schema, selection = _b.selection;
        var parent = selection.$from.parent;
        var withinIncompleteTask = parent.type === schema.nodes.taskItem && parent.attrs.state !== 'DONE';
        var color = withinIncompleteTask && editor_common_1.isPastDate(timestamp) ? 'red' : undefined;
        return (React.createElement("span", { id: Math.random().toString(), onClick: this.handleClick },
            React.createElement(SelectableDate, { color: color, value: timestamp }, withinIncompleteTask
                ? editor_common_1.timestampToTaskContext(timestamp)
                : editor_common_1.timestampToString(timestamp))));
    };
    return DateNodeView;
}(React.Component));
exports.default = DateNodeView;
var templateObject_1;
//# sourceMappingURL=date.js.map