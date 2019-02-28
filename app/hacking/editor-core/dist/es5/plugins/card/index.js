"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
var adf_schema_1 = require("@atlaskit/adf-schema");
var main_1 = require("./pm-plugins/main");
var toolbar_1 = require("./toolbar");
exports.stateKey = new prosemirror_state_1.PluginKey('cardPlugin');
var cardPlugin = {
    nodes: function () {
        return [
            { name: 'inlineCard', node: adf_schema_1.inlineCard },
            { name: 'blockCard', node: adf_schema_1.blockCard },
        ];
    },
    pmPlugins: function () {
        return [{ name: 'card', plugin: main_1.createPlugin }];
    },
    pluginsOptions: {
        floatingToolbar: toolbar_1.floatingToolbar,
    },
};
exports.default = cardPlugin;
//# sourceMappingURL=index.js.map