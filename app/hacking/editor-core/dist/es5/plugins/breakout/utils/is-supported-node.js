"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var supportedNodesForBreakout = ['codeBlock', 'layoutSection'];
function isSupportedNodeForBreakout(node) {
    return supportedNodesForBreakout.indexOf(node.type.name) !== -1;
}
exports.isSupportedNodeForBreakout = isSupportedNodeForBreakout;
//# sourceMappingURL=is-supported-node.js.map