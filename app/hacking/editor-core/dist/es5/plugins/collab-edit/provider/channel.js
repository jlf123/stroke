"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_service_support_1 = require("@atlaskit/util-service-support");
var eventemitter2_1 = require("eventemitter2");
var prosemirror_collab_1 = require("prosemirror-collab");
var _1 = require("./");
var Channel = /** @class */ (function () {
    function Channel(config, pubSubClient) {
        this.eventEmitter = new eventemitter2_1.EventEmitter2();
        this.config = config;
        this.pubSubClient = pubSubClient;
    }
    /**
     * Get initial document from service
     */
    Channel.prototype.getDocument = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, doc, version, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, util_service_support_1.utils.requestService(this.config, {
                                path: "document/" + this.config.docId,
                            })];
                    case 1:
                        _a = _b.sent(), doc = _a.doc, version = _a.version;
                        return [2 /*return*/, {
                                doc: doc,
                                version: version,
                            }];
                    case 2:
                        err_1 = _b.sent();
                        _1.logger("Collab-Edit: Document \"" + this.config.docId + "\" does not exist. Creating one locally.");
                        return [2 /*return*/, {
                                doc: {},
                                version: 1,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Connect to pubsub to start receiving events
     */
    Channel.prototype.connect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var docId, _a, doc, version;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        docId = this.config.docId;
                        return [4 /*yield*/, this.getDocument()];
                    case 1:
                        _a = _b.sent(), doc = _a.doc, version = _a.version;
                        this.pubSubClient.on('CONNECT', function () {
                            _1.logger('Connected to FPS-service');
                        });
                        this.pubSubClient.join(["ari:cloud::fabric:collab-service/" + docId]);
                        this.pubSubClient
                            .on('avi:pf-collab-service:steps:created', function (event, payload) {
                            _1.logger('Received FPS-payload', { payload: payload });
                            _this.emit('data', payload);
                        })
                            .on('avi:pf-collab-service:telepointer:updated', function (event, payload) {
                            _1.logger('Received telepointer-payload', { payload: payload });
                            _this.emit('telepointer', payload);
                        });
                        this.eventEmitter.emit('connected', {
                            doc: doc,
                            version: version,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Channel.prototype.debounce = function (getState) {
        var _this = this;
        _1.logger("Debouncing steps");
        if (this.debounced) {
            clearTimeout(this.debounced);
        }
        this.debounced = window.setTimeout(function () {
            _1.logger("Sending debounced");
            _this.sendSteps(getState(), getState);
        }, 250);
    };
    /**
     * Send steps to service
     */
    Channel.prototype.sendSteps = function (state, getState, localSteps) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var version, _a, steps, response, err_2;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isSending) {
                            this.debounce(getState);
                            return [2 /*return*/];
                        }
                        version = prosemirror_collab_1.getVersion(state);
                        // Don't send any steps before we're ready.
                        if (typeof version === undefined) {
                            return [2 /*return*/];
                        }
                        _a = (localSteps || prosemirror_collab_1.sendableSteps(state) || {}).steps, steps = _a === void 0 ? [] : _a;
                        if (steps.length === 0) {
                            _1.logger("No steps to send. Aborting.");
                            return [2 /*return*/];
                        }
                        this.isSending = true;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, util_service_support_1.utils.requestService(this.config, {
                                path: "document/" + this.config.docId + "/steps",
                                requestInit: {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        version: version,
                                        steps: steps,
                                    }),
                                },
                            })];
                    case 2:
                        response = _b.sent();
                        this.isSending = false;
                        _1.logger("Steps sent and accepted by service.");
                        this.emit('data', response);
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _b.sent();
                        this.isSending = false;
                        _1.logger("Error sending steps: \"" + err_2 + "\"");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get steps from version x to latest
     */
    Channel.prototype.getSteps = function (version) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, util_service_support_1.utils.requestService(this.config, {
                            path: "document/" + this.config.docId + "/steps",
                            queryParams: {
                                version: version,
                            },
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Send telepointer
     */
    Channel.prototype.sendTelepointer = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _1.logger("Sending telepointer", data);
                        return [4 /*yield*/, util_service_support_1.utils.requestService(this.config, {
                                path: "document/" + this.config.docId + "/telepointer",
                                requestInit: {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(data),
                                },
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Subscribe to events emitted by this channel
     */
    Channel.prototype.on = function (evt, handler) {
        this.eventEmitter.on(evt, handler);
        return this;
    };
    /**
     * Unsubscribe from events emitted by this channel
     */
    Channel.prototype.off = function (evt, handler) {
        this.eventEmitter.off(evt, handler);
        return this;
    };
    /**
     * Emit events to subscribers
     */
    Channel.prototype.emit = function (evt, data) {
        this.eventEmitter.emit(evt, data);
        return this;
    };
    return Channel;
}());
exports.Channel = Channel;
//# sourceMappingURL=channel.js.map