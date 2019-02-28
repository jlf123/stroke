"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Loadable = require("react-loadable");
exports.HelpDialogLoader = Loadable({
    loader: function () {
        return Promise.resolve().then(function () { return require(/* webpackChunkName:"@atlaskit-internal-editor-core-helpdialog" */ './index'); }).then(function (module) { return module.default; });
    },
    loading: function () { return null; },
});
//# sourceMappingURL=HelpDialogLoader.js.map