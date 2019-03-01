"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_intl_1 = require("react-intl");
var remove_1 = require("@atlaskit/icon/glyph/editor/remove");
var settings_1 = require("@atlaskit/icon/glyph/editor/settings");
var messages_1 = require("../../messages");
var analytics_1 = require("../../analytics");
var main_1 = require("./pm-plugins/main");
var actions_1 = require("./actions");
var utils_1 = require("./utils");
exports.messages = react_intl_1.defineMessages({
    tableOptions: {
        id: 'fabric.editor.tableOptions',
        defaultMessage: 'Table options',
        description: 'Opens a menu with additional table options',
    },
    headerRow: {
        id: 'fabric.editor.headerRow',
        defaultMessage: 'Header row',
        description: 'Marks the first table row as a header row',
    },
    headerColumn: {
        id: 'fabric.editor.headerColumn',
        defaultMessage: 'Header column',
        description: 'Marks the first table column as a header row',
    },
    numberedColumn: {
        id: 'fabric.editor.numberedColumn',
        defaultMessage: 'Numbered column',
        description: 'Adds an auto-numbering column to your table',
    },
});
var withAnalytics = function (command, eventName, properties) { return function (state, dispatch) {
    analytics_1.analyticsService.trackEvent(eventName, properties);
    return command(state, dispatch);
}; };
exports.getToolbarConfig = function (state, _a) {
    var formatMessage = _a.formatMessage;
    var tableState = main_1.pluginKey.getState(state);
    if (tableState &&
        tableState.tableRef &&
        tableState.tableNode &&
        tableState.pluginConfig) {
        var pluginConfig = tableState.pluginConfig;
        return {
            title: 'Table floating controls',
            getDomRef: function () { return tableState.tableFloatingToolbarTarget; },
            nodeType: state.schema.nodes.table,
            items: [
                {
                    type: 'dropdown',
                    title: formatMessage(exports.messages.tableOptions),
                    icon: settings_1.default,
                    hidden: !(pluginConfig.allowHeaderRow && pluginConfig.allowHeaderColumn),
                    options: [
                        {
                            title: formatMessage(exports.messages.headerRow),
                            onClick: withAnalytics(actions_1.toggleHeaderRow, 'atlassian.editor.format.table.toggleHeaderRow.button'),
                            selected: utils_1.checkIfHeaderRowEnabled(state),
                            hidden: !pluginConfig.allowHeaderRow,
                        },
                        {
                            title: formatMessage(exports.messages.headerColumn),
                            onClick: withAnalytics(actions_1.toggleHeaderColumn, 'atlassian.editor.format.table.toggleHeaderColumn.button'),
                            selected: utils_1.checkIfHeaderColumnEnabled(state),
                            hidden: !pluginConfig.allowHeaderColumn,
                        },
                        {
                            title: formatMessage(exports.messages.numberedColumn),
                            selected: utils_1.checkIfNumberColumnEnabled(state),
                            onClick: withAnalytics(actions_1.toggleNumberColumn, 'atlassian.editor.format.table.toggleNumberColumn.button'),
                            hidden: !pluginConfig.allowNumberColumn,
                        },
                    ],
                },
                {
                    type: 'separator',
                    hidden: !(pluginConfig.allowBackgroundColor &&
                        pluginConfig.allowHeaderRow &&
                        pluginConfig.allowHeaderColumn &&
                        pluginConfig.allowMergeCells),
                },
                {
                    type: 'button',
                    appearance: 'danger',
                    icon: remove_1.default,
                    onClick: actions_1.deleteTable,
                    onMouseEnter: actions_1.hoverTable(true),
                    onMouseLeave: actions_1.clearHoverSelection,
                    title: formatMessage(messages_1.default.remove),
                },
            ],
        };
    }
};
//# sourceMappingURL=toolbar.js.map