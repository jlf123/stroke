"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_utils_1 = require("prosemirror-utils");
var is_supported_node_1 = require("../utils/is-supported-node");
function setBreakoutMode(mode) {
    return function (state, dispatch) {
        var node = prosemirror_utils_1.findParentNode(is_supported_node_1.isSupportedNodeForBreakout)(state.selection);
        if (!node) {
            return false;
        }
        if (dispatch) {
            dispatch(state.tr.setNodeMarkup(node.pos, node.node.type, node.node.attrs, [
                state.schema.marks.breakout.create({ mode: mode }),
            ]));
        }
        return true;
    };
}
exports.setBreakoutMode = setBreakoutMode;
//# sourceMappingURL=set-breakout-mode.js.map