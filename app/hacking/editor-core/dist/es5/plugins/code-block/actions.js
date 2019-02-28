"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_utils_1 = require("prosemirror-utils");
exports.removeCodeBlock = function (state, dispatch) {
    var nodes = state.schema.nodes, tr = state.tr;
    if (dispatch) {
        dispatch(prosemirror_utils_1.removeParentNodeOfType(nodes.codeBlock)(tr));
    }
    return true;
};
exports.changeLanguage = function (language) { return function (state, dispatch) {
    var nodes = state.schema.nodes, tr = state.tr;
    // setParentNodeMarkup doesn't typecheck the attributes
    var attrs = { language: language };
    if (dispatch) {
        dispatch(prosemirror_utils_1.setParentNodeMarkup(nodes.codeBlock, null, attrs)(tr));
    }
    return true;
}; };
//# sourceMappingURL=actions.js.map