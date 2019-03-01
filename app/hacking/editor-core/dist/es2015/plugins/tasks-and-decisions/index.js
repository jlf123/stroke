import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import EditorTaskIcon from '@atlaskit/icon/glyph/editor/task';
import EditorDecisionIcon from '@atlaskit/icon/glyph/editor/decision';
import { decisionItem, decisionList, taskItem, taskList, uuid, } from '@atlaskit/adf-schema';
import { messages as insertBlockMessages } from '../insert-block/ui/ToolbarInsertBlock';
import { createPlugin } from './pm-plugins/main';
import inputRulePlugin from './pm-plugins/input-rules';
import keymap from './pm-plugins/keymaps';
import ToolbarDecision from './ui/ToolbarDecision';
import ToolbarTask from './ui/ToolbarTask';
// tslint:disable-next-line:variable-name
var TaskDecisionToolbarGroup = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n"], ["\n  display: flex;\n"])));
var tasksAndDecisionsPlugin = {
    nodes: function () {
        return [
            { name: 'decisionList', node: decisionList },
            { name: 'decisionItem', node: decisionItem },
            { name: 'taskList', node: taskList },
            { name: 'taskItem', node: taskItem },
        ];
    },
    pmPlugins: function () {
        return [
            {
                name: 'tasksAndDecisions',
                plugin: function (_a) {
                    var schema = _a.schema, props = _a.props, portalProviderAPI = _a.portalProviderAPI, providerFactory = _a.providerFactory;
                    return createPlugin(portalProviderAPI, providerFactory);
                },
            },
            {
                name: 'tasksAndDecisionsInputRule',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return inputRulePlugin(schema);
                },
            },
            {
                name: 'tasksAndDecisionsKeyMap',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return keymap(schema);
                },
            },
        ];
    },
    secondaryToolbarComponent: function (_a) {
        var editorView = _a.editorView, disabled = _a.disabled;
        return (React.createElement(TaskDecisionToolbarGroup, null,
            React.createElement(ToolbarDecision, { editorView: editorView, isDisabled: disabled, isReducedSpacing: true }),
            React.createElement(ToolbarTask, { editorView: editorView, isDisabled: disabled, isReducedSpacing: true })));
    },
    pluginsOptions: {
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(insertBlockMessages.action),
                    priority: 100,
                    keywords: ['checkbox', 'task', 'todo'],
                    icon: function () { return (React.createElement(EditorTaskIcon, { label: formatMessage(insertBlockMessages.action) })); },
                    action: function (insert, state) {
                        return insert(state.schema.nodes.taskList.createChecked({ localId: uuid.generate() }, state.schema.nodes.taskItem.createChecked({
                            localId: uuid.generate(),
                        })));
                    },
                },
                {
                    title: formatMessage(insertBlockMessages.decision),
                    priority: 900,
                    icon: function () { return (React.createElement(EditorDecisionIcon, { label: formatMessage(insertBlockMessages.decision) })); },
                    action: function (insert, state) {
                        return insert(state.schema.nodes.decisionList.createChecked({ localId: uuid.generate() }, state.schema.nodes.decisionItem.createChecked({
                            localId: uuid.generate(),
                        })));
                    },
                },
            ];
        },
    },
};
export default tasksAndDecisionsPlugin;
var templateObject_1;
//# sourceMappingURL=index.js.map