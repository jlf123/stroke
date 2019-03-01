"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var code_1 = require("@atlaskit/icon/glyph/editor/code");
var adf_schema_1 = require("@atlaskit/adf-schema");
var main_1 = require("./pm-plugins/main");
var toolbar_1 = require("./toolbar");
var keymaps_1 = require("./pm-plugins/keymaps");
var ide_ux_1 = require("./pm-plugins/ide-ux");
var types_1 = require("../block-type/types");
var codeBlockPlugin = function (options) {
    if (options === void 0) { options = {}; }
    return ({
        nodes: function () {
            return [{ name: 'codeBlock', node: adf_schema_1.codeBlock }];
        },
        pmPlugins: function () {
            return [
                { name: 'codeBlock', plugin: main_1.createPlugin },
                {
                    name: 'codeBlockIDEKeyBindings',
                    plugin: function () { return (options.enableKeybindingsForIDE ? ide_ux_1.default : undefined); },
                },
                {
                    name: 'codeBlockKeyMap',
                    plugin: function (_a) {
                        var schema = _a.schema;
                        return keymaps_1.default(schema);
                    },
                },
            ];
        },
        pluginsOptions: {
            quickInsert: function (_a) {
                var formatMessage = _a.formatMessage;
                return [
                    {
                        title: formatMessage(types_1.messages.codeblock),
                        priority: 700,
                        icon: function () { return (React.createElement(code_1.default, { label: formatMessage(types_1.messages.codeblock) })); },
                        action: function (insert, state) {
                            var schema = state.schema;
                            return insert(schema.nodes.codeBlock.createChecked());
                        },
                    },
                ];
            },
            floatingToolbar: toolbar_1.getToolbarConfig,
        },
    });
};
exports.default = codeBlockPlugin;
//# sourceMappingURL=index.js.map