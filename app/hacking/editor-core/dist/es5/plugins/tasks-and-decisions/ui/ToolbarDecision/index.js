"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var react_intl_1 = require("react-intl");
var decision_1 = require("@atlaskit/icon/glyph/editor/decision");
var analytics_1 = require("../../../../analytics");
var ToolbarButton_1 = require("../../../../ui/ToolbarButton");
var commands_1 = require("../../commands");
var ToolbarInsertBlock_1 = require("../../../insert-block/ui/ToolbarInsertBlock");
var ToolbarDecision = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarDecision, _super);
    function ToolbarDecision() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { disabled: false };
        _this.handleInsertDecision = analytics_1.withAnalytics('atlassian.fabric.decision.trigger.button', function () {
            var editorView = _this.props.editorView;
            if (!editorView) {
                return false;
            }
            commands_1.insertTaskDecision(editorView, 'decisionList');
            return true;
        });
        return _this;
    }
    ToolbarDecision.prototype.render = function () {
        var disabled = this.state.disabled;
        var _a = this.props, isDisabled = _a.isDisabled, isReducedSpacing = _a.isReducedSpacing, formatMessage = _a.intl.formatMessage;
        var label = formatMessage(ToolbarInsertBlock_1.messages.decision);
        return (React.createElement(ToolbarButton_1.default, { onClick: this.handleInsertDecision, disabled: disabled || isDisabled, spacing: isReducedSpacing ? 'none' : 'default', title: label + " <>", iconBefore: React.createElement(decision_1.default, { label: label }) }));
    };
    return ToolbarDecision;
}(react_1.PureComponent));
exports.ToolbarDecision = ToolbarDecision;
exports.default = react_intl_1.injectIntl(ToolbarDecision);
//# sourceMappingURL=index.js.map