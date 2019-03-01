import { filterContentByType, filterSliceByType } from './filter';
var taskDecisionAllowedNodeTypes = new Set([
    'text',
    'emoji',
    'mention',
    'hardBreak',
]);
export var taskDecisionDocFilter = function (doc, schema) {
    return filterContentByType(doc, taskDecisionAllowedNodeTypes, schema, true);
};
export var taskDecisionSliceFilter = function (slice, schema) {
    return filterSliceByType(slice, taskDecisionAllowedNodeTypes, schema, true);
};
//# sourceMappingURL=task-decision-filter.js.map