"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var analytics_next_1 = require("@atlaskit/analytics-next");
exports.WithCreateAnalyticsEvent = analytics_next_1.withAnalyticsEvents()(/** @class */ (function (_super) {
    tslib_1.__extends(WithCreateAnalyticsEvent, _super);
    function WithCreateAnalyticsEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WithCreateAnalyticsEvent.prototype.render = function () {
        var _a = this.props, render = _a.render, createAnalyticsEvent = _a.createAnalyticsEvent;
        return render(createAnalyticsEvent);
    };
    return WithCreateAnalyticsEvent;
}(React.Component)));
//# sourceMappingURL=index.js.map