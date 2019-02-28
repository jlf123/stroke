"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_collab_1 = require("prosemirror-collab");
var plugin_1 = require("./plugin");
exports.pluginKey = plugin_1.pluginKey;
var provider_1 = require("./provider");
exports.CollabProvider = provider_1.CollabProvider;
var collabEditPlugin = function (options) { return ({
    pmPlugins: function () {
        var _a = options || {}, _b = _a.useNativePlugin, useNativePlugin = _b === void 0 ? false : _b, _c = _a.userId, userId = _c === void 0 ? null : _c;
        return tslib_1.__spread((useNativePlugin
            ? [
                {
                    name: 'pmCollab',
                    plugin: function () { return prosemirror_collab_1.collab({ clientID: userId }); },
                },
            ]
            : []), [
            {
                name: 'collab',
                plugin: function (_a) {
                    var dispatch = _a.dispatch, providerFactory = _a.providerFactory;
                    return plugin_1.createPlugin(dispatch, providerFactory, options);
                },
            },
        ]);
    },
}); };
exports.default = collabEditPlugin;
//# sourceMappingURL=index.js.map