"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_state_1 = require("prosemirror-state");
var date_1 = require("./nodeviews/date");
var nodeviews_1 = require("../../nodeviews");
exports.pluginKey = new prosemirror_state_1.PluginKey('datePlugin');
var createPlugin = function (_a) {
    var dispatch = _a.dispatch, portalProviderAPI = _a.portalProviderAPI;
    return new prosemirror_state_1.Plugin({
        state: {
            init: function () { return ({ showDatePickerAt: null }); },
            apply: function (tr, state) {
                var meta = tr.getMeta(exports.pluginKey);
                if (meta) {
                    // ED-5033, calendar control open for element in plugin state, when node-view is clicked.
                    // Following chanek ensures that if same node-view is clicked twice calendar should close,
                    // but if a different node-view is clicked, calendar should open next the that node-view.
                    var newState = void 0;
                    if (meta.showDatePickerAt === state.showDatePickerAt) {
                        newState = tslib_1.__assign({}, state, { showDatePickerAt: null });
                    }
                    else {
                        newState = tslib_1.__assign({}, state, meta);
                    }
                    dispatch(exports.pluginKey, newState);
                    return newState;
                }
                if (tr.docChanged && state.showDatePickerAt) {
                    var _a = tr.mapping.mapResult(state.showDatePickerAt), pos = _a.pos, deleted = _a.deleted;
                    var newState = {
                        showDatePickerAt: deleted ? null : pos,
                    };
                    if (newState.showDatePickerAt !== state.showDatePickerAt) {
                        dispatch(exports.pluginKey, newState);
                        return newState;
                    }
                }
                return state;
            },
        },
        key: exports.pluginKey,
        props: {
            nodeViews: {
                date: nodeviews_1.ReactNodeView.fromComponent(date_1.default, portalProviderAPI),
            },
        },
    });
};
exports.default = createPlugin;
//# sourceMappingURL=plugin.js.map