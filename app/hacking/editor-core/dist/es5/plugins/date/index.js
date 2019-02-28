"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var date_1 = require("@atlaskit/icon/glyph/editor/date");
var adf_schema_1 = require("@atlaskit/adf-schema");
var prosemirror_utils_1 = require("prosemirror-utils");
var Loadable = require("react-loadable");
var WithPluginState_1 = require("../../ui/WithPluginState");
var ToolbarInsertBlock_1 = require("../insert-block/ui/ToolbarInsertBlock");
var actions_1 = require("./actions");
var plugin_1 = require("./plugin");
var keymap_1 = require("./keymap");
var editor_disabled_1 = require("../editor-disabled");
var DatePicker = Loadable({
    loader: function () {
        return Promise.resolve().then(function () { return require(/* webpackChunkName:"@atlaskit-internal-editor-datepicker" */ './ui/DatePicker'); }).then(function (module) { return module.default; });
    },
    loading: function () { return null; },
});
var datePlugin = {
    nodes: function () {
        return [{ name: 'date', node: adf_schema_1.date }];
    },
    pmPlugins: function () {
        return [
            {
                name: 'date',
                plugin: function (options) {
                    DatePicker.preload();
                    return plugin_1.default(options);
                },
            },
            {
                name: 'dateKeymap',
                plugin: function (_a) {
                    var schema = _a.schema;
                    DatePicker.preload();
                    return keymap_1.default(schema);
                },
            },
        ];
    },
    contentComponent: function (_a) {
        var editorView = _a.editorView;
        var dispatch = editorView.dispatch;
        var domAtPos = editorView.domAtPos.bind(editorView);
        return (React.createElement(WithPluginState_1.default, { plugins: {
                datePlugin: plugin_1.pluginKey,
                editorDisabledPlugin: editor_disabled_1.pluginKey,
            }, render: function (_a) {
                var editorDisabledPlugin = _a.editorDisabledPlugin, datePlugin = _a.datePlugin;
                var showDatePickerAt = datePlugin.showDatePickerAt;
                if (!showDatePickerAt ||
                    (editorDisabledPlugin || {}).editorDisabled) {
                    return null;
                }
                var element = prosemirror_utils_1.findDomRefAtPos(showDatePickerAt, domAtPos);
                return (React.createElement(DatePicker, { key: showDatePickerAt, element: element, onSelect: function (date) { return actions_1.insertDate(date)(editorView.state, dispatch); }, closeDatePicker: function () {
                        return actions_1.setDatePickerAt(null)(editorView.state, dispatch);
                    } }));
            } }));
    },
    pluginsOptions: {
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(ToolbarInsertBlock_1.messages.date),
                    priority: 800,
                    keywords: ['time', 'today', '/'],
                    icon: function () { return React.createElement(date_1.default, { label: formatMessage(ToolbarInsertBlock_1.messages.date) }); },
                    action: function (insert, state) {
                        var dateNode = state.schema.nodes.date.createChecked({
                            timestamp: Date.now().toString(),
                        });
                        var tr = insert(dateNode, { selectInlineNode: true });
                        return tr.setMeta(plugin_1.pluginKey, {
                            showDatePickerAt: tr.selection.from,
                        });
                    },
                },
            ];
        },
    },
};
exports.default = datePlugin;
//# sourceMappingURL=index.js.map