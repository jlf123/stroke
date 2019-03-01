"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var info_1 = require("@atlaskit/icon/glyph/editor/info");
var warning_1 = require("@atlaskit/icon/glyph/editor/warning");
var error_1 = require("@atlaskit/icon/glyph/editor/error");
var success_1 = require("@atlaskit/icon/glyph/editor/success");
var note_1 = require("@atlaskit/icon/glyph/editor/note");
var adf_schema_1 = require("@atlaskit/adf-schema");
var types_1 = require("../block-type/types");
var main_1 = require("./pm-plugins/main");
var toolbar_1 = require("./toolbar");
var keymaps_1 = require("./pm-plugins/keymaps");
var insertPanelType = function (panelType, state) {
    return state.schema.nodes.panel.createChecked({ panelType: panelType }, state.schema.nodes.paragraph.createChecked());
};
var panelPlugin = {
    nodes: function () {
        return [{ name: 'panel', node: adf_schema_1.panel }];
    },
    pmPlugins: function () {
        return [
            { name: 'panel', plugin: main_1.createPlugin },
            {
                name: 'panelKeyMap',
                plugin: function () { return keymaps_1.default(); },
            },
        ];
    },
    pluginsOptions: {
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(types_1.messages.panel),
                    keywords: ['info'],
                    priority: 900,
                    icon: function () { return React.createElement(info_1.default, { label: formatMessage(types_1.messages.panel) }); },
                    action: function (insert, state) {
                        return insert(insertPanelType('info', state));
                    },
                },
                {
                    title: formatMessage(types_1.messages.notePanel),
                    keywords: ['note'],
                    priority: 1000,
                    icon: function () { return (React.createElement(note_1.default, { label: formatMessage(types_1.messages.notePanel) })); },
                    action: function (insert, state) {
                        return insert(insertPanelType('note', state));
                    },
                },
                {
                    title: formatMessage(types_1.messages.successPanel),
                    keywords: ['success', 'tip'],
                    priority: 1000,
                    icon: function () { return (React.createElement(success_1.default, { label: formatMessage(types_1.messages.successPanel) })); },
                    action: function (insert, state) {
                        return insert(insertPanelType('success', state));
                    },
                },
                {
                    title: formatMessage(types_1.messages.warningPanel),
                    keywords: ['warning'],
                    priority: 1000,
                    icon: function () { return (React.createElement(warning_1.default, { label: formatMessage(types_1.messages.warningPanel) })); },
                    action: function (insert, state) {
                        return insert(insertPanelType('warning', state));
                    },
                },
                {
                    title: formatMessage(types_1.messages.errorPanel),
                    keywords: ['error'],
                    priority: 1000,
                    icon: function () { return (React.createElement(error_1.default, { label: formatMessage(types_1.messages.errorPanel) })); },
                    action: function (insert, state) {
                        return insert(insertPanelType('error', state));
                    },
                },
            ];
        },
        floatingToolbar: toolbar_1.getToolbarConfig,
    },
};
exports.default = panelPlugin;
//# sourceMappingURL=index.js.map