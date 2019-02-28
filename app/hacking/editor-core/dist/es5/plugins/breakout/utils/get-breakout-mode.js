"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_utils_1 = require("prosemirror-utils");
var is_supported_node_1 = require("./is-supported-node");
function getBreakoutMode(state) {
    var node = prosemirror_utils_1.findParentNode(is_supported_node_1.isSupportedNodeForBreakout)(state.selection);
    if (!node) {
        return;
    }
    var breakoutMark = node.node.marks.find(function (m) { return m.type.name === 'breakout'; });
    if (!breakoutMark) {
        return;
    }
    return breakoutMark.attrs.mode;
}
exports.getBreakoutMode = getBreakoutMode;
//# sourceMappingURL=get-breakout-mode.js.map