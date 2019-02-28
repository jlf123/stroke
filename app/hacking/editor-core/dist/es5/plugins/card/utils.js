"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
exports.appearanceForNodeType = function (spec) {
    if (spec.name === 'inlineCard') {
        return 'inline';
    }
    else if (spec.name === 'blockCard') {
        return 'block';
    }
};
exports.selectedCardAppearance = function (state) {
    return state.selection instanceof prosemirror_state_1.NodeSelection &&
        exports.appearanceForNodeType(state.selection.node.type);
};
//# sourceMappingURL=utils.js.map