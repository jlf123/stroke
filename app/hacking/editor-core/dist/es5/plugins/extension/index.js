"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var adf_schema_1 = require("@atlaskit/adf-schema");
var plugin_1 = require("./plugin");
var toolbar_1 = require("./toolbar");
var extensionPlugin = {
    nodes: function () {
        return [
            { name: 'extension', node: adf_schema_1.extension },
            { name: 'bodiedExtension', node: adf_schema_1.bodiedExtension },
            { name: 'inlineExtension', node: adf_schema_1.inlineExtension },
        ];
    },
    pmPlugins: function () {
        return [
            {
                name: 'extension',
                plugin: function (_a) {
                    var props = _a.props, dispatch = _a.dispatch, providerFactory = _a.providerFactory, portalProviderAPI = _a.portalProviderAPI;
                    return plugin_1.default(dispatch, providerFactory, props.extensionHandlers || {}, portalProviderAPI, props.allowExtension);
                },
            },
        ];
    },
    pluginsOptions: {
        floatingToolbar: toolbar_1.getToolbarConfig,
    },
};
exports.default = extensionPlugin;
//# sourceMappingURL=index.js.map