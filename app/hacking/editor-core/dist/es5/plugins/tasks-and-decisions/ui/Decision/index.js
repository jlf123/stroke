"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_intl_1 = require("react-intl");
var task_decision_1 = require("@atlaskit/task-decision");
var messages = react_intl_1.defineMessages({
    placeholder: {
        id: 'fabric.editor.decisionPlaceholder',
        defaultMessage: 'Add a decision…',
        description: 'Placeholder description for an empty decision in the editor',
    },
});
var Decision = /** @class */ (function (_super) {
    tslib_1.__extends(Decision, _super);
    function Decision() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Decision.prototype.render = function () {
        var _a = this.props, contentRef = _a.contentRef, showPlaceholder = _a.showPlaceholder, formatMessage = _a.intl.formatMessage;
        var placeholder = formatMessage(messages.placeholder);
        return (React.createElement(task_decision_1.DecisionItem, { contentRef: contentRef, placeholder: placeholder, showPlaceholder: showPlaceholder }));
    };
    return Decision;
}(React.Component));
exports.Decision = Decision;
exports.default = react_intl_1.injectIntl(Decision);
//# sourceMappingURL=index.js.map