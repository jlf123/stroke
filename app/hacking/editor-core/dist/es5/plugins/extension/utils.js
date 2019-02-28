"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_utils_1 = require("prosemirror-utils");
exports.getExtensionNode = function (state) {
    var selection = state.selection;
    var _a = state.schema.nodes, extension = _a.extension, inlineExtension = _a.inlineExtension, bodiedExtension = _a.bodiedExtension;
    if (prosemirror_utils_1.isNodeSelection(selection) &&
        prosemirror_utils_1.findSelectedNodeOfType([extension, bodiedExtension, inlineExtension])(selection)) {
        return {
            node: selection.node,
            pos: selection.$from.pos,
        };
    }
    return prosemirror_utils_1.findParentNodeOfType([extension, inlineExtension, bodiedExtension])(selection);
};
//# sourceMappingURL=utils.js.map