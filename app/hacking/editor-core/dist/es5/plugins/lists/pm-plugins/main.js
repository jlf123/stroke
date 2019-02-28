"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_utils_1 = require("prosemirror-utils");
var utils_1 = require("../utils");
var mark_1 = require("../../../utils/mark");
exports.pluginKey = new prosemirror_state_1.PluginKey('listsPlugin');
exports.createPlugin = function (dispatch) {
    return new prosemirror_state_1.Plugin({
        state: {
            init: function () { return ({
                bulletListActive: false,
                bulletListDisabled: false,
                orderedListActive: false,
                orderedListDisabled: false,
            }); },
            apply: function (tr, pluginState, _, state) {
                var _a = state.schema.nodes, bulletList = _a.bulletList, orderedList = _a.orderedList;
                var listParent = prosemirror_utils_1.findParentNodeOfType([bulletList, orderedList])(tr.selection);
                var bulletListActive = !!listParent && listParent.node.type === bulletList;
                var orderedListActive = !!listParent && listParent.node.type === orderedList;
                var bulletListDisabled = !(bulletListActive ||
                    orderedListActive ||
                    utils_1.isWrappingPossible(bulletList, state));
                var orderedListDisabled = !(bulletListActive ||
                    orderedListActive ||
                    utils_1.isWrappingPossible(orderedList, state));
                if (bulletListActive !== pluginState.bulletListActive ||
                    orderedListActive !== pluginState.orderedListActive ||
                    bulletListDisabled !== pluginState.bulletListDisabled ||
                    orderedListDisabled !== pluginState.orderedListDisabled) {
                    var nextPluginState = tslib_1.__assign({}, pluginState, { bulletListActive: bulletListActive,
                        orderedListActive: orderedListActive,
                        bulletListDisabled: bulletListDisabled,
                        orderedListDisabled: orderedListDisabled });
                    dispatch(exports.pluginKey, nextPluginState);
                    return nextPluginState;
                }
                return pluginState;
            },
        },
        view: function (editorView) {
            return {
                update: function (_a) {
                    var state = _a.state, dispatch = _a.dispatch;
                    var _b = state.schema.nodes, bulletList = _b.bulletList, orderedList = _b.orderedList;
                    var _c = state.schema.marks, alignment = _c.alignment, indentation = _c.indentation;
                    var listParent = prosemirror_utils_1.findParentNodeOfType([bulletList, orderedList])(state.tr.selection);
                    if (!listParent) {
                        return;
                    }
                    /** Block mark if exists should be removed when toggled to list items */
                    var removeMarks = mark_1.removeBlockMarks(state, [alignment, indentation]);
                    if (removeMarks) {
                        dispatch(removeMarks);
                    }
                },
            };
        },
        key: exports.pluginKey,
    });
};
//# sourceMappingURL=main.js.map