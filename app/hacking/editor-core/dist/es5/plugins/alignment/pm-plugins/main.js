"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_state_1 = require("prosemirror-state");
var commands_1 = require("../commands");
var utils_1 = require("../utils");
function createInitialPluginState(editorState, pluginConfig) {
    return {
        align: utils_1.getActiveAlignment(editorState) || pluginConfig.align,
        isEnabled: true,
    };
}
exports.createInitialPluginState = createInitialPluginState;
exports.pluginKey = new prosemirror_state_1.PluginKey('alignmentPlugin');
function createPlugin(dispatch, pluginConfig) {
    return new prosemirror_state_1.Plugin({
        key: exports.pluginKey,
        state: {
            init: function (config, editorState) {
                return createInitialPluginState(editorState, pluginConfig);
            },
            apply: function (tr, state, prevState, nextState) {
                var nextPluginState = utils_1.getActiveAlignment(nextState);
                var isEnabled = commands_1.isAlignable(nextPluginState)(nextState, 
                /**
                 * NOTE: Stan is already making dispatch optional in another PR.
                 * We can remove this once it's merged.
                 */
                undefined);
                var newState = tslib_1.__assign({}, state, { align: nextPluginState, isEnabled: isEnabled });
                if (nextPluginState !== state.align || isEnabled !== state.isEnabled) {
                    dispatch(exports.pluginKey, newState);
                }
                return newState;
            },
        },
    });
}
exports.createPlugin = createPlugin;
//# sourceMappingURL=main.js.map