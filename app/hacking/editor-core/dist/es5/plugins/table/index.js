"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var prosemirror_tables_1 = require("prosemirror-tables");
var prosemirror_utils_1 = require("prosemirror-utils");
var table_1 = require("@atlaskit/icon/glyph/editor/table");
var editor_common_1 = require("@atlaskit/editor-common");
var adf_schema_1 = require("@atlaskit/adf-schema");
var LayoutButton_1 = require("./ui/LayoutButton");
var WithPluginState_1 = require("../../ui/WithPluginState");
var ToolbarInsertBlock_1 = require("../insert-block/ui/ToolbarInsertBlock");
var main_1 = require("./pm-plugins/main");
var keymap_1 = require("./pm-plugins/keymap");
var table_resizing_1 = require("./pm-plugins/table-resizing");
var toolbar_1 = require("./toolbar");
var FloatingContextualMenu_1 = require("./ui/FloatingContextualMenu");
var utils_1 = require("./utils");
exports.HANDLE_WIDTH = 6;
exports.pluginConfig = function (tablesConfig) {
    var config = !tablesConfig || typeof tablesConfig === 'boolean' ? {} : tablesConfig;
    return config.advanced
        ? tslib_1.__assign({ allowBackgroundColor: true, allowColumnResizing: true, allowHeaderColumn: true, allowHeaderRow: true, allowMergeCells: true, allowNumberColumn: true, stickToolbarToBottom: true, permittedLayouts: 'all', allowControls: true }, config) : config;
};
var tablesPlugin = function (options) { return ({
    nodes: function () {
        return [
            { name: 'table', node: adf_schema_1.table },
            { name: 'tableHeader', node: adf_schema_1.tableHeader },
            { name: 'tableRow', node: adf_schema_1.tableRow },
            { name: 'tableCell', node: adf_schema_1.tableCell },
        ];
    },
    pmPlugins: function () {
        return [
            {
                name: 'table',
                plugin: function (_a) {
                    var _b = _a.props, allowTables = _b.allowTables, appearance = _b.appearance, eventDispatcher = _a.eventDispatcher, dispatch = _a.dispatch, portalProviderAPI = _a.portalProviderAPI;
                    return main_1.createPlugin(dispatch, portalProviderAPI, eventDispatcher, exports.pluginConfig(allowTables), appearance);
                },
            },
            {
                name: 'tablePMColResizing',
                plugin: function (_a) {
                    var dispatch = _a.dispatch, allowTables = _a.props.allowTables;
                    var allowColumnResizing = exports.pluginConfig(allowTables).allowColumnResizing;
                    return allowColumnResizing
                        ? table_resizing_1.createPlugin(dispatch, {
                            handleWidth: exports.HANDLE_WIDTH,
                            cellMinWidth: editor_common_1.tableCellMinWidth,
                        })
                        : undefined;
                },
            },
            // Needs to be lower priority than prosemirror-tables.tableEditing
            // plugin as it is currently swallowing backspace events inside tables
            { name: 'tableKeymap', plugin: function () { return keymap_1.keymapPlugin(); } },
            { name: 'tableEditing', plugin: function () { return prosemirror_tables_1.tableEditing(); } },
        ];
    },
    contentComponent: function (_a) {
        var editorView = _a.editorView, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, appearance = _a.appearance;
        return (React.createElement(WithPluginState_1.default, { plugins: {
                pluginState: main_1.pluginKey,
            }, render: function (_a) {
                var pluginState = _a.pluginState;
                return (React.createElement(React.Fragment, null,
                    React.createElement(FloatingContextualMenu_1.default, { editorView: editorView, mountPoint: popupsMountPoint, boundariesElement: popupsBoundariesElement, targetCellPosition: pluginState.targetCellPosition, isOpen: pluginState.isContextualMenuOpen, pluginConfig: pluginState.pluginConfig }),
                    appearance === 'full-page' &&
                        utils_1.isLayoutSupported(editorView.state) && (React.createElement(LayoutButton_1.default, { editorView: editorView, mountPoint: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement, targetRef: pluginState.tableFloatingToolbarTarget }))));
            } }));
    },
    pluginsOptions: {
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(ToolbarInsertBlock_1.messages.table),
                    priority: 600,
                    icon: function () { return React.createElement(table_1.default, { label: formatMessage(ToolbarInsertBlock_1.messages.table) }); },
                    action: function (insert, state) {
                        return insert(prosemirror_utils_1.createTable(state.schema));
                    },
                },
            ];
        },
        floatingToolbar: toolbar_1.getToolbarConfig,
    },
}); };
exports.default = tablesPlugin;
//# sourceMappingURL=index.js.map