"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseAllWithNonFailFast = function (promises, errorCollector) {
    var wrappedPromises = promises.map(function (p) {
        return p.catch(function (error) {
            if (errorCollector) {
                errorCollector(error);
            }
        });
    });
    return Promise.all(wrappedPromises);
};
//# sourceMappingURL=promise-util.js.map