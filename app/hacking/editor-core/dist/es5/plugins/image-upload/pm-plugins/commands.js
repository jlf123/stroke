"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_utils_1 = require("prosemirror-utils");
var utils_1 = require("../utils");
var main_1 = require("./main");
var actions_1 = require("./actions");
exports.insertExternalImage = function (options) { return function (state, dispatch) {
    var pluginState = main_1.stateKey.getState(state);
    if (!pluginState.enabled || !options.src) {
        return false;
    }
    var mediaNode = utils_1.createExternalMediaNode(options.src, state.schema);
    if (!mediaNode) {
        return false;
    }
    if (dispatch) {
        dispatch(prosemirror_utils_1.safeInsert(mediaNode, state.selection.$to.pos)(state.tr).scrollIntoView());
    }
    return true;
}; };
exports.startImageUpload = function (event) { return function (state, dispatch) {
    var pluginState = main_1.stateKey.getState(state);
    if (!pluginState.enabled) {
        return false;
    }
    if (dispatch) {
        dispatch(actions_1.startUpload(event)(state.tr));
    }
    return true;
}; };
//# sourceMappingURL=commands.js.map