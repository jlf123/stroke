"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var layout_two_equal_1 = require("@atlaskit/icon/glyph/editor/layout-two-equal");
var adf_schema_1 = require("@atlaskit/adf-schema");
var ToolbarInsertBlock_1 = require("../insert-block/ui/ToolbarInsertBlock");
var main_1 = require("./pm-plugins/main");
exports.pluginKey = main_1.pluginKey;
var toolbar_1 = require("./toolbar");
var actions_1 = require("./actions");
exports.default = {
    nodes: function () {
        return [
            { name: 'layoutSection', node: adf_schema_1.layoutSection },
            { name: 'layoutColumn', node: adf_schema_1.layoutColumn },
        ];
    },
    pmPlugins: function () {
        return [
            {
                name: 'layout',
                plugin: function (_a) {
                    var props = _a.props;
                    return main_1.default(props.allowLayouts);
                },
            },
        ];
    },
    pluginsOptions: {
        floatingToolbar: function (state, intl) {
            var _a = main_1.pluginKey.getState(state), pos = _a.pos, allowBreakout = _a.allowBreakout;
            if (pos !== null) {
                return toolbar_1.buildToolbar(state, intl, pos, allowBreakout);
            }
            return undefined;
        },
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(ToolbarInsertBlock_1.messages.columns),
                    keywords: ['layout', 'section'],
                    priority: 1100,
                    icon: function () { return (React.createElement(layout_two_equal_1.default, { label: formatMessage(ToolbarInsertBlock_1.messages.columns) })); },
                    action: function (insert, state) {
                        return insert(actions_1.createDefaultLayoutSection(state));
                    },
                },
            ];
        },
    },
};
//# sourceMappingURL=index.js.map