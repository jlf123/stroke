"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var event_dispatcher_1 = require("../../event-dispatcher");
var DefaultMediaStateManager = /** @class */ (function (_super) {
    tslib_1.__extends(DefaultMediaStateManager, _super);
    function DefaultMediaStateManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = new Map();
        return _this;
    }
    DefaultMediaStateManager.prototype.getState = function (id) {
        return id ? this.state.get(id) : undefined;
    };
    DefaultMediaStateManager.prototype.getAllState = function () {
        return this.state;
    };
    DefaultMediaStateManager.prototype.newState = function (id, newState) {
        var state = tslib_1.__assign({}, (this.state.get(id) || {}), newState, { id: id });
        this.state.set(id, state);
        return state;
    };
    DefaultMediaStateManager.prototype.updateState = function (id, newState) {
        var state = this.newState(id, newState);
        this.emit(id, state);
        return state;
    };
    DefaultMediaStateManager.prototype.destroy = function () {
        this.state.clear();
        _super.prototype.destroy.call(this);
    };
    return DefaultMediaStateManager;
}(event_dispatcher_1.EventDispatcher));
exports.default = DefaultMediaStateManager;
//# sourceMappingURL=default-state-manager.js.map