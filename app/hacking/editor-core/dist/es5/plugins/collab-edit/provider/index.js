"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
tslib_1.__exportStar(require("./types"), exports);
var collab_provider_1 = require("./collab-provider");
exports.CollabProvider = collab_provider_1.CollabProvider;
exports.logger = function (msg, data, style) {
    if (data === void 0) { data = null; }
    if (style === void 0) { style = 'color:blue;font-weight:bold;'; }
    // tslint:disable-next-line:no-console
    console.log("%cCollab-Edit: " + msg, style);
    if (data) {
        // tslint:disable-next-line:no-console
        console.log(data);
    }
};
//# sourceMappingURL=index.js.map