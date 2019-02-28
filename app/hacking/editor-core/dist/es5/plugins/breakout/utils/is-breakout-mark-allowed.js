"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_utils_1 = require("prosemirror-utils");
var is_supported_node_1 = require("./is-supported-node");
function isBreakoutMarkAllowed(state) {
    if (!state.schema.marks.breakout) {
        return false;
    }
    var node = prosemirror_utils_1.findParentNode(is_supported_node_1.isSupportedNodeForBreakout)(state.selection);
    if (!node || node.depth === 0) {
        return false;
    }
    var parent = state.selection.$from.node(node.depth - 1);
    return parent.type.allowsMarkType(state.schema.marks.breakout);
}
exports.isBreakoutMarkAllowed = isBreakoutMarkAllowed;
//# sourceMappingURL=is-breakout-mark-allowed.js.map