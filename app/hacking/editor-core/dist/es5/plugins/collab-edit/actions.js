"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_collab_1 = require("prosemirror-collab");
var prosemirror_transform_1 = require("prosemirror-transform");
var prosemirror_state_1 = require("prosemirror-state");
var utils_1 = require("./utils");
exports.handleInit = function (initData, view, options) {
    var doc = initData.doc, json = initData.json, version = initData.version;
    if (doc) {
        var state = view.state;
        var tr = utils_1.replaceDocument(doc, state, version, options);
        tr.setMeta('isRemote', true);
        var newState = state.apply(tr);
        view.updateState(newState);
    }
    else if (json) {
        exports.applyRemoteSteps(json, undefined, view);
    }
};
exports.handleConnection = function (connectionData, view) {
    var tr = view.state.tr;
    view.dispatch(tr.setMeta('sessionId', connectionData));
};
exports.handlePresence = function (presenceData, view) {
    var tr = view.state.tr;
    view.dispatch(tr.setMeta('presence', presenceData));
};
exports.applyRemoteData = function (remoteData, view, options) {
    var json = remoteData.json, newState = remoteData.newState, _a = remoteData.userIds, userIds = _a === void 0 ? [] : _a;
    if (json) {
        exports.applyRemoteSteps(json, userIds, view, options);
    }
    else if (newState) {
        view.updateState(newState);
    }
};
exports.applyRemoteSteps = function (json, userIds, view, options) {
    var state = view.state, schema = view.state.schema;
    var steps = json.map(function (step) { return prosemirror_transform_1.Step.fromJSON(schema, step); });
    var tr;
    if (options && options.useNativePlugin) {
        tr = prosemirror_collab_1.receiveTransaction(state, steps, userIds);
    }
    else {
        tr = state.tr;
        steps.forEach(function (step) { return tr.step(step); });
    }
    if (tr) {
        tr.setMeta('addToHistory', false);
        tr.setMeta('isRemote', true);
        var newState = state.apply(tr);
        view.updateState(newState);
    }
};
exports.handleTelePointer = function (telepointerData, view) {
    var tr = view.state.tr;
    view.dispatch(tr.setMeta('telepointer', telepointerData));
};
function isAllSelection(selection) {
    return selection instanceof prosemirror_state_1.AllSelection;
}
function isNodeSelection(selection) {
    return selection instanceof prosemirror_state_1.NodeSelection;
}
exports.getSendableSelection = function (selection) {
    /**
     * <kbd>CMD + A</kbd> triggers a AllSelection
     * <kbd>escape</kbd> triggers a NodeSelection
     */
    return {
        type: 'textSelection',
        anchor: selection.anchor,
        head: isAllSelection(selection) || isNodeSelection(selection)
            ? selection.head - 1
            : selection.head,
    };
};
//# sourceMappingURL=actions.js.map