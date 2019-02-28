"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var adf_schema_1 = require("@atlaskit/adf-schema");
var prosemirror_state_1 = require("prosemirror-state");
var nodeviews_1 = require("../../nodeviews");
var unsupported_block_1 = require("./nodeviews/unsupported-block");
var unsupported_inline_1 = require("./nodeviews/unsupported-inline");
var utils_1 = require("./utils");
exports.pluginKey = new prosemirror_state_1.PluginKey('unsupportedContentPlugin');
var createPlugin = function (_a) {
    var schema = _a.schema, portalProviderAPI = _a.portalProviderAPI;
    return new prosemirror_state_1.Plugin({
        state: {
            init: function (config, state) {
                utils_1.traverseNode(state.doc, schema);
            },
            apply: function (tr, pluginState, oldState, newState) {
                return pluginState;
            },
        },
        key: exports.pluginKey,
        props: {
            nodeViews: {
                confluenceUnsupportedBlock: nodeviews_1.ReactNodeView.fromComponent(unsupported_block_1.default, portalProviderAPI),
                confluenceUnsupportedInline: nodeviews_1.ReactNodeView.fromComponent(unsupported_inline_1.default, portalProviderAPI),
                unsupportedBlock: nodeviews_1.ReactNodeView.fromComponent(unsupported_block_1.default, portalProviderAPI),
                unsupportedInline: nodeviews_1.ReactNodeView.fromComponent(unsupported_inline_1.default, portalProviderAPI),
            },
        },
    });
};
var unsupportedContentPlugin = {
    nodes: function () {
        return [
            {
                name: 'confluenceUnsupportedBlock',
                node: adf_schema_1.confluenceUnsupportedBlock,
            },
            {
                name: 'confluenceUnsupportedInline',
                node: adf_schema_1.confluenceUnsupportedInline,
            },
            {
                name: 'unsupportedBlock',
                node: adf_schema_1.unsupportedBlock,
            },
            {
                name: 'unsupportedInline',
                node: adf_schema_1.unsupportedInline,
            },
        ];
    },
    pmPlugins: function () {
        return [
            {
                name: 'unsupportedContent',
                plugin: createPlugin,
            },
        ];
    },
};
exports.default = unsupportedContentPlugin;
//# sourceMappingURL=index.js.map