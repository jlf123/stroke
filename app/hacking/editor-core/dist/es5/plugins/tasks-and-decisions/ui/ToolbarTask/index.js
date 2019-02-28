"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var react_intl_1 = require("react-intl");
var task_1 = require("@atlaskit/icon/glyph/editor/task");
var analytics_1 = require("../../../../analytics");
var ToolbarButton_1 = require("../../../../ui/ToolbarButton");
var commands_1 = require("../../commands");
var ToolbarInsertBlock_1 = require("../../../insert-block/ui/ToolbarInsertBlock");
var ToolbarTask = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarTask, _super);
    function ToolbarTask() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { disabled: false };
        _this.handleInsertTask = analytics_1.withAnalytics('atlassian.fabric.action.trigger.button', function () {
            var editorView = _this.props.editorView;
            if (!editorView) {
                return false;
            }
            commands_1.insertTaskDecision(editorView, 'taskList');
            return true;
        });
        return _this;
    }
    ToolbarTask.prototype.render = function () {
        var disabled = this.state.disabled;
        var _a = this.props, isDisabled = _a.isDisabled, isReducedSpacing = _a.isReducedSpacing, formatMessage = _a.intl.formatMessage;
        var label = formatMessage(ToolbarInsertBlock_1.messages.action);
        return (React.createElement(ToolbarButton_1.default, { onClick: this.handleInsertTask, disabled: disabled || isDisabled, spacing: isReducedSpacing ? 'none' : 'default', title: label + " []", iconBefore: React.createElement(task_1.default, { label: label }) }));
    };
    return ToolbarTask;
}(react_1.PureComponent));
exports.ToolbarTask = ToolbarTask;
exports.default = react_intl_1.injectIntl(ToolbarTask);
//# sourceMappingURL=index.js.map