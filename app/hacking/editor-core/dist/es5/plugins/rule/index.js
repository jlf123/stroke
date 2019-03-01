"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var divider_1 = require("@atlaskit/icon/glyph/editor/divider");
var adf_schema_1 = require("@atlaskit/adf-schema");
var ToolbarInsertBlock_1 = require("../insert-block/ui/ToolbarInsertBlock");
var keymap_1 = require("./pm-plugins/keymap");
var input_rule_1 = require("./pm-plugins/input-rule");
var rulePlugin = {
    nodes: function () {
        return [{ name: 'rule', node: adf_schema_1.rule }];
    },
    pmPlugins: function () {
        return [
            {
                name: 'ruleInputRule',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return input_rule_1.default(schema);
                },
            },
            {
                name: 'ruleKeymap',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return keymap_1.default(schema);
                },
            },
        ];
    },
    pluginsOptions: {
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(ToolbarInsertBlock_1.messages.horizontalRule),
                    keywords: ['horizontal rule', 'rule', 'line'],
                    priority: 1200,
                    icon: function () { return (React.createElement(divider_1.default, { label: formatMessage(ToolbarInsertBlock_1.messages.horizontalRule) })); },
                    action: function (insert, state) {
                        return insert(state.schema.nodes.rule.createChecked());
                    },
                },
            ];
        },
    },
};
exports.default = rulePlugin;
//# sourceMappingURL=index.js.map