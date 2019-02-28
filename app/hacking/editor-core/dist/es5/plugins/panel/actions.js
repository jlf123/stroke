"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_utils_1 = require("prosemirror-utils");
var analytics_1 = require("../../analytics");
exports.removePanel = function () { return function (state, dispatch) {
    var nodes = state.schema.nodes, tr = state.tr;
    analytics_1.analyticsService.trackEvent("atlassian.editor.format.panel.delete.button");
    if (dispatch) {
        dispatch(prosemirror_utils_1.removeParentNodeOfType(nodes.panel)(tr));
    }
    return true;
}; };
exports.changePanelType = function (panelType) { return function (state, dispatch) {
    var nodes = state.schema.nodes, tr = state.tr;
    analytics_1.analyticsService.trackEvent("atlassian.editor.format.panel." + panelType + ".button");
    if (dispatch) {
        dispatch(prosemirror_utils_1.setParentNodeMarkup(nodes.panel, null, { panelType: panelType })(tr));
    }
    return true;
}; };
//# sourceMappingURL=actions.js.map