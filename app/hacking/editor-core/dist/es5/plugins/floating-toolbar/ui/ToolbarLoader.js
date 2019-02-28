"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Loadable = require("react-loadable");
exports.ToolbarLoader = Loadable({
    loader: function () {
        return Promise.resolve().then(function () { return require(/* webpackChunkName:"@atlaskit-internal-editor-core-floating-toolbar" */ './Toolbar'); }).then(function (module) { return module.default; });
    },
    loading: function () { return null; },
});
//# sourceMappingURL=ToolbarLoader.js.map