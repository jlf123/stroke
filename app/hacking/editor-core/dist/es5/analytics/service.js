"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handler_1 = require("./handler");
/**
 * The service allows @analytics annotations to access the analytics Handler
 * from an arbitrary scope. This coupling assumes that there is only one analytics
 * Handler that should be used on the page across all components.
 */
var AnalyticsService = /** @class */ (function () {
    function AnalyticsService() {
        // trackEvent: analyticsHandler = (name: string, properties?: analyticsProperties) => {};
        this.trackEvent = handler_1.detectHandler();
    }
    Object.defineProperty(AnalyticsService.prototype, "handler", {
        set: function (handler) {
            this.trackEvent = handler ? handler : function () { };
        },
        enumerable: true,
        configurable: true
    });
    return AnalyticsService;
}());
exports.AnalyticsService = AnalyticsService;
exports.default = new AnalyticsService();
//# sourceMappingURL=service.js.map