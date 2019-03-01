"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_utils_1 = require("prosemirror-utils");
exports.getActiveAlignment = function (state) {
    var node = prosemirror_utils_1.findParentNodeOfType([
        state.schema.nodes.paragraph,
        state.schema.nodes.heading,
    ])(state.selection);
    var getMark = node &&
        node.node.marks.filter(function (mark) { return mark.type === state.schema.marks.alignment; })[0];
    return (getMark && getMark.attrs.align) || 'start';
};
//# sourceMappingURL=index.js.map