"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("./main");
exports.cardAction = function (tr, action) {
    return tr.setMeta(main_1.pluginKey, action);
};
exports.resolveCard = function (url) { return function (tr) {
    return exports.cardAction(tr, {
        type: 'RESOLVE',
        url: url,
    });
}; };
exports.queueCards = function (requests) { return function (tr) {
    return exports.cardAction(tr, {
        type: 'QUEUE',
        requests: requests,
    });
}; };
exports.setProvider = function (cardProvider) { return function (tr) {
    return exports.cardAction(tr, {
        type: 'SET_PROVIDER',
        provider: cardProvider,
    });
}; };
//# sourceMappingURL=actions.js.map