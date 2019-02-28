import { setParentNodeMarkup, removeParentNodeOfType } from 'prosemirror-utils';
import { analyticsService } from '../../analytics';
export var removePanel = function () { return function (state, dispatch) {
    var nodes = state.schema.nodes, tr = state.tr;
    analyticsService.trackEvent("atlassian.editor.format.panel.delete.button");
    if (dispatch) {
        dispatch(removeParentNodeOfType(nodes.panel)(tr));
    }
    return true;
}; };
export var changePanelType = function (panelType) { return function (state, dispatch) {
    var nodes = state.schema.nodes, tr = state.tr;
    analyticsService.trackEvent("atlassian.editor.format.panel." + panelType + ".button");
    if (dispatch) {
        dispatch(setParentNodeMarkup(nodes.panel, null, { panelType: panelType })(tr));
    }
    return true;
}; };
//# sourceMappingURL=actions.js.map