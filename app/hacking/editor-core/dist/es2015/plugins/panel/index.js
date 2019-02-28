import * as React from 'react';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';
import EditorWarningIcon from '@atlaskit/icon/glyph/editor/warning';
import EditorErrorIcon from '@atlaskit/icon/glyph/editor/error';
import EditorSuccessIcon from '@atlaskit/icon/glyph/editor/success';
import EditorNoteIcon from '@atlaskit/icon/glyph/editor/note';
import { panel } from '@atlaskit/adf-schema';
import { messages } from '../block-type/types';
import { createPlugin } from './pm-plugins/main';
import { getToolbarConfig } from './toolbar';
import keymap from './pm-plugins/keymaps';
var insertPanelType = function (panelType, state) {
    return state.schema.nodes.panel.createChecked({ panelType: panelType }, state.schema.nodes.paragraph.createChecked());
};
var panelPlugin = {
    nodes: function () {
        return [{ name: 'panel', node: panel }];
    },
    pmPlugins: function () {
        return [
            { name: 'panel', plugin: createPlugin },
            {
                name: 'panelKeyMap',
                plugin: function () { return keymap(); },
            },
        ];
    },
    pluginsOptions: {
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(messages.panel),
                    keywords: ['info'],
                    priority: 900,
                    icon: function () { return React.createElement(InfoIcon, { label: formatMessage(messages.panel) }); },
                    action: function (insert, state) {
                        return insert(insertPanelType('info', state));
                    },
                },
                {
                    title: formatMessage(messages.notePanel),
                    keywords: ['note'],
                    priority: 1000,
                    icon: function () { return (React.createElement(EditorNoteIcon, { label: formatMessage(messages.notePanel) })); },
                    action: function (insert, state) {
                        return insert(insertPanelType('note', state));
                    },
                },
                {
                    title: formatMessage(messages.successPanel),
                    keywords: ['success', 'tip'],
                    priority: 1000,
                    icon: function () { return (React.createElement(EditorSuccessIcon, { label: formatMessage(messages.successPanel) })); },
                    action: function (insert, state) {
                        return insert(insertPanelType('success', state));
                    },
                },
                {
                    title: formatMessage(messages.warningPanel),
                    keywords: ['warning'],
                    priority: 1000,
                    icon: function () { return (React.createElement(EditorWarningIcon, { label: formatMessage(messages.warningPanel) })); },
                    action: function (insert, state) {
                        return insert(insertPanelType('warning', state));
                    },
                },
                {
                    title: formatMessage(messages.errorPanel),
                    keywords: ['error'],
                    priority: 1000,
                    icon: function () { return (React.createElement(EditorErrorIcon, { label: formatMessage(messages.errorPanel) })); },
                    action: function (insert, state) {
                        return insert(insertPanelType('error', state));
                    },
                },
            ];
        },
        floatingToolbar: getToolbarConfig,
    },
};
export default panelPlugin;
//# sourceMappingURL=index.js.map