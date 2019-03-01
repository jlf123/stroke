"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var adf_utils_1 = require("@atlaskit/adf-utils");
exports.isMarkAllowedInRange = function (doc, ranges, type) {
    var _loop_1 = function (i) {
        var _a = ranges[i], $from = _a.$from, $to = _a.$to;
        var can = $from.depth === 0 ? doc.type.allowsMarkType(type) : false;
        doc.nodesBetween($from.pos, $to.pos, function (node) {
            if (can) {
                return false;
            }
            can = node.inlineContent && node.type.allowsMarkType(type);
        });
        if (can) {
            return { value: can };
        }
    };
    for (var i = 0; i < ranges.length; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return false;
};
exports.isMarkExcluded = function (type, marks) {
    if (marks) {
        return marks.some(function (mark) { return mark.type !== type && mark.type.excludes(type); });
    }
    return false;
};
var not = function (fn) { return function (arg) { return !fn(arg); }; };
exports.removeBlockMarks = function (state, marks) {
    var selection = state.selection, schema = state.schema;
    var tr = state.tr;
    // Marks might not exist in Schema
    var marksToRemove = marks.filter(Boolean);
    if (marksToRemove.length === 0) {
        return undefined;
    }
    /** Saves an extra dispatch */
    var blockMarksExists = false;
    var hasMark = function (mark) { return marksToRemove.indexOf(mark.type) > -1; };
    /**
     * When you need to toggle the selection
     * when another type which does not allow alignment is applied
     */
    state.doc.nodesBetween(selection.from, selection.to, function (node, pos) {
        if (node.type === schema.nodes.paragraph && node.marks.some(hasMark)) {
            blockMarksExists = true;
            var resolvedPos = state.doc.resolve(pos);
            var withoutBlockMarks = node.marks.filter(not(hasMark));
            tr = tr.setNodeMarkup(resolvedPos.pos, undefined, node.attrs, withoutBlockMarks);
        }
    });
    return blockMarksExists ? tr : undefined;
};
function removeQueryMarksFromJSON(json) {
    var sanitizedJSON = adf_utils_1.traverse(json, {
        text: function (node) {
            if (!node || !Array.isArray(node.marks)) {
                return node;
            }
            return tslib_1.__assign({}, node, { marks: node.marks.filter(function (mark) { return ['emojiQuery', 'typeAheadQuery'].indexOf(mark.type) === -1; }) });
        },
    });
    return sanitizedJSON;
}
exports.removeQueryMarksFromJSON = removeQueryMarksFromJSON;
//# sourceMappingURL=mark.js.map