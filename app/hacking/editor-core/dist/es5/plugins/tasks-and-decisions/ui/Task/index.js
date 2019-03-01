"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_intl_1 = require("react-intl");
var react_1 = require("react");
var editor_common_1 = require("@atlaskit/editor-common");
var task_item_with_providers_1 = require("./task-item-with-providers");
var messages = react_intl_1.defineMessages({
    placeholder: {
        id: 'fabric.editor.taskPlaceholder',
        defaultMessage: "Type your action, use '@' to assign to someone.",
        description: 'Placeholder description for an empty action/task in the editor',
    },
});
var TaskItem = /** @class */ (function (_super) {
    tslib_1.__extends(TaskItem, _super);
    function TaskItem(props) {
        var _this = _super.call(this, props) || this;
        _this.renderWithProvider = function (providerFactory) {
            var _a = _this.props, providers = _a.providers, formatMessage = _a.intl.formatMessage, otherProps = tslib_1.__rest(_a, ["providers", "intl"]);
            var taskDecisionProvider = providerFactory.taskDecisionProvider, contextIdentifierProvider = providerFactory.contextIdentifierProvider;
            var placeholder = formatMessage(messages.placeholder);
            return (React.createElement(task_item_with_providers_1.default, tslib_1.__assign({}, otherProps, { placeholder: placeholder, taskDecisionProvider: taskDecisionProvider, contextIdentifierProvider: contextIdentifierProvider })));
        };
        _this.providerFactory = props.providers || new editor_common_1.ProviderFactory();
        return _this;
    }
    TaskItem.prototype.componentWillUnmount = function () {
        if (!this.props.providers) {
            // new ProviderFactory is created if no `providers` has been set
            // in this case when component is unmounted it's safe to destroy this providerFactory
            this.providerFactory.destroy();
        }
    };
    TaskItem.prototype.render = function () {
        return (React.createElement(editor_common_1.WithProviders, { providers: ['taskDecisionProvider', 'contextIdentifierProvider'], providerFactory: this.providerFactory, renderNode: this.renderWithProvider }));
    };
    return TaskItem;
}(react_1.PureComponent));
exports.TaskItem = TaskItem;
exports.default = react_intl_1.injectIntl(TaskItem);
//# sourceMappingURL=index.js.map