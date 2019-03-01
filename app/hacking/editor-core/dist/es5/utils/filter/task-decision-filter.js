"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filter_1 = require("./filter");
var taskDecisionAllowedNodeTypes = new Set([
    'text',
    'emoji',
    'mention',
    'hardBreak',
]);
exports.taskDecisionDocFilter = function (doc, schema) {
    return filter_1.filterContentByType(doc, taskDecisionAllowedNodeTypes, schema, true);
};
exports.taskDecisionSliceFilter = function (slice, schema) {
    return filter_1.filterSliceByType(slice, taskDecisionAllowedNodeTypes, schema, true);
};
//# sourceMappingURL=task-decision-filter.js.map