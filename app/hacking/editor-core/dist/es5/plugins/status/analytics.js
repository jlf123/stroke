"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var package_json_1 = require("../../../package.json");
exports.FABRIC_CHANNEL = 'fabric-elements';
exports.createStatusAnalyticsAndFire = function (createAnalyticsEvent) { return function (payload) {
    if (createAnalyticsEvent && payload) {
        var statusPayload = tslib_1.__assign({}, payload, { eventType: 'ui' });
        if (!statusPayload.attributes) {
            statusPayload.attributes = {};
        }
        statusPayload.attributes.packageName = package_json_1.name;
        statusPayload.attributes.packageVersion = package_json_1.version;
        statusPayload.attributes.componentName = 'status';
        createAnalyticsEvent(statusPayload).fire(exports.FABRIC_CHANNEL);
    }
}; };
//# sourceMappingURL=analytics.js.map