"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var task_1 = require("@atlaskit/icon/glyph/editor/task");
var decision_1 = require("@atlaskit/icon/glyph/editor/decision");
var adf_schema_1 = require("@atlaskit/adf-schema");
var ToolbarInsertBlock_1 = require("../insert-block/ui/ToolbarInsertBlock");
var main_1 = require("./pm-plugins/main");
var input_rules_1 = require("./pm-plugins/input-rules");
var keymaps_1 = require("./pm-plugins/keymaps");
var ToolbarDecision_1 = require("./ui/ToolbarDecision");
var ToolbarTask_1 = require("./ui/ToolbarTask");
// tslint:disable-next-line:variable-name
var TaskDecisionToolbarGroup = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n"], ["\n  display: flex;\n"])));
var tasksAndDecisionsPlugin = {
    nodes: function () {
        return [
            { name: 'decisionList', node: adf_schema_1.decisionList },
            { name: 'decisionItem', node: adf_schema_1.decisionItem },
            { name: 'taskList', node: adf_schema_1.taskList },
            { name: 'taskItem', node: adf_schema_1.taskItem },
        ];
    },
    pmPlugins: function () {
        return [
            {
                name: 'tasksAndDecisions',
                plugin: function (_a) {
                    var schema = _a.schema, props = _a.props, portalProviderAPI = _a.portalProviderAPI, providerFactory = _a.providerFactory;
                    return main_1.createPlugin(portalProviderAPI, providerFactory);
                },
            },
            {
                name: 'tasksAndDecisionsInputRule',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return input_rules_1.default(schema);
                },
            },
            {
                name: 'tasksAndDecisionsKeyMap',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return keymaps_1.default(schema);
                },
            },
        ];
    },
    secondaryToolbarComponent: function (_a) {
        var editorView = _a.editorView, disabled = _a.disabled;
        return (React.createElement(TaskDecisionToolbarGroup, null,
            React.createElement(ToolbarDecision_1.default, { editorView: editorView, isDisabled: disabled, isReducedSpacing: true }),
            React.createElement(ToolbarTask_1.default, { editorView: editorView, isDisabled: disabled, isReducedSpacing: true })));
    },
    pluginsOptions: {
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(ToolbarInsertBlock_1.messages.action),
                    priority: 100,
                    keywords: ['checkbox', 'task', 'todo'],
                    icon: function () { return (React.createElement(task_1.default, { label: formatMessage(ToolbarInsertBlock_1.messages.action) })); },
                    action: function (insert, state) {
                        return insert(state.schema.nodes.taskList.createChecked({ localId: adf_schema_1.uuid.generate() }, state.schema.nodes.taskItem.createChecked({
                            localId: adf_schema_1.uuid.generate(),
                        })));
                    },
                },
                {
                    title: formatMessage(ToolbarInsertBlock_1.messages.decision),
                    priority: 900,
                    icon: function () { return (React.createElement(decision_1.default, { label: formatMessage(ToolbarInsertBlock_1.messages.decision) })); },
                    action: function (insert, state) {
                        return insert(state.schema.nodes.decisionList.createChecked({ localId: adf_schema_1.uuid.generate() }, state.schema.nodes.decisionItem.createChecked({
                            localId: adf_schema_1.uuid.generate(),
                        })));
                    },
                },
            ];
        },
    },
};
exports.default = tasksAndDecisionsPlugin;
var templateObject_1;
//# sourceMappingURL=index.js.map