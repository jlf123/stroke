"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_utils_1 = require("prosemirror-utils");
var is_supported_node_1 = require("../utils/is-supported-node");
function removeBreakout() {
    return function (state, dispatch) {
        var node = prosemirror_utils_1.findParentNode(is_supported_node_1.isSupportedNodeForBreakout)(state.selection);
        if (!node) {
            return false;
        }
        var marks = node.node.marks.filter(function (m) { return m.type.name !== 'breakout'; });
        if (dispatch) {
            dispatch(state.tr.setNodeMarkup(node.pos, node.node.type, node.node.attrs, marks));
        }
        return true;
    };
}
exports.removeBreakout = removeBreakout;
//# sourceMappingURL=remove-breakout.js.map