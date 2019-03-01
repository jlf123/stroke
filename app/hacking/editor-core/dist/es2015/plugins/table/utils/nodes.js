import { TableMap } from 'prosemirror-tables';
import { findTable, hasParentNodeOfType } from 'prosemirror-utils';
import { pluginKey } from '../pm-plugins/main';
export var isIsolating = function (node) {
    return !!node.type.spec.isolating;
};
export var containsHeaderColumn = function (state, table) {
    var tableHeader = state.schema.nodes.tableHeader;
    var contains = true;
    table.content.forEach(function (row) {
        if (row.firstChild && row.firstChild.type !== tableHeader) {
            contains = false;
        }
    });
    return contains;
};
export var containsHeaderRow = function (state, table) {
    var map = TableMap.get(table);
    for (var i = 0; i < map.width; i++) {
        var cell = table.nodeAt(map.map[i]);
        if (cell && cell.type !== state.schema.nodes.tableHeader) {
            return false;
        }
    }
    return true;
};
export function filterNearSelection(state, findNode, predicate, defaultValue) {
    var found = findNode(state.selection);
    if (!found) {
        return defaultValue;
    }
    return predicate(state, found.node, found.pos);
}
export var checkIfHeaderColumnEnabled = function (state) {
    return filterNearSelection(state, findTable, containsHeaderColumn, false);
};
export var checkIfHeaderRowEnabled = function (state) {
    return filterNearSelection(state, findTable, containsHeaderRow, false);
};
export var checkIfNumberColumnEnabled = function (state) {
    return filterNearSelection(state, findTable, function (_, table) { return !!table.attrs.isNumberColumnEnabled; }, false);
};
export var isLayoutSupported = function (state) {
    var permittedLayouts = pluginKey.getState(state).pluginConfig.permittedLayouts;
    var _a = state.schema.nodes, bodiedExtension = _a.bodiedExtension, layoutSection = _a.layoutSection;
    return (!hasParentNodeOfType([layoutSection, bodiedExtension])(state.selection) &&
        permittedLayouts &&
        (permittedLayouts === 'all' ||
            (permittedLayouts.indexOf('default') > -1 &&
                permittedLayouts.indexOf('wide') > -1 &&
                permittedLayouts.indexOf('full-page') > -1)));
};
//# sourceMappingURL=nodes.js.map