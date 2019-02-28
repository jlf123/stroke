"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var service_1 = require("./service");
function withAnalytics(analyticsEventName, trackedFn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = trackedFn.apply(void 0, tslib_1.__spread(args));
        if (result) {
            try {
                service_1.default.trackEvent(analyticsEventName);
            }
            catch (e) {
                // tslint:disable-next-line:no-console
                console.error('An exception has been thrown when trying to track analytics event:', e);
            }
        }
        return result;
    };
}
exports.withAnalytics = withAnalytics;
//# sourceMappingURL=withAnalytics.js.map