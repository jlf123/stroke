"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_tables_1 = require("prosemirror-tables");
var prosemirror_utils_1 = require("prosemirror-utils");
var main_1 = require("../pm-plugins/main");
exports.isIsolating = function (node) {
    return !!node.type.spec.isolating;
};
exports.containsHeaderColumn = function (state, table) {
    var tableHeader = state.schema.nodes.tableHeader;
    var contains = true;
    table.content.forEach(function (row) {
        if (row.firstChild && row.firstChild.type !== tableHeader) {
            contains = false;
        }
    });
    return contains;
};
exports.containsHeaderRow = function (state, table) {
    var map = prosemirror_tables_1.TableMap.get(table);
    for (var i = 0; i < map.width; i++) {
        var cell = table.nodeAt(map.map[i]);
        if (cell && cell.type !== state.schema.nodes.tableHeader) {
            return false;
        }
    }
    return true;
};
function filterNearSelection(state, findNode, predicate, defaultValue) {
    var found = findNode(state.selection);
    if (!found) {
        return defaultValue;
    }
    return predicate(state, found.node, found.pos);
}
exports.filterNearSelection = filterNearSelection;
exports.checkIfHeaderColumnEnabled = function (state) {
    return filterNearSelection(state, prosemirror_utils_1.findTable, exports.containsHeaderColumn, false);
};
exports.checkIfHeaderRowEnabled = function (state) {
    return filterNearSelection(state, prosemirror_utils_1.findTable, exports.containsHeaderRow, false);
};
exports.checkIfNumberColumnEnabled = function (state) {
    return filterNearSelection(state, prosemirror_utils_1.findTable, function (_, table) { return !!table.attrs.isNumberColumnEnabled; }, false);
};
exports.isLayoutSupported = function (state) {
    var permittedLayouts = main_1.pluginKey.getState(state).pluginConfig.permittedLayouts;
    var _a = state.schema.nodes, bodiedExtension = _a.bodiedExtension, layoutSection = _a.layoutSection;
    return (!prosemirror_utils_1.hasParentNodeOfType([layoutSection, bodiedExtension])(state.selection) &&
        permittedLayouts &&
        (permittedLayouts === 'all' ||
            (permittedLayouts.indexOf('default') > -1 &&
                permittedLayouts.indexOf('wide') > -1 &&
                permittedLayouts.indexOf('full-page') > -1)));
};
//# sourceMappingURL=nodes.js.map