"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("./main");
var imageUploadAction = function (tr, action) {
    return tr.setMeta(main_1.stateKey, action);
};
exports.startUpload = function (event) { return function (tr) {
    return imageUploadAction(tr, {
        name: 'START_UPLOAD',
        event: event,
    });
}; };
//# sourceMappingURL=actions.js.map