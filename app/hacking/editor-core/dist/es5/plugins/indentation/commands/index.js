"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commands_1 = require("../../../commands");
var isIndentationAllowed = function (schema, node, parent) {
    var _a = schema.nodes, paragraph = _a.paragraph, heading = _a.heading, alignment = schema.marks.alignment;
    if ([paragraph, heading].indexOf(node.type) > -1) {
        if (alignment) {
            var hasAlignment = node.marks.filter(function (mark) { return mark.type === alignment; })[0];
            return !hasAlignment;
        }
        return true;
    }
    return false;
};
exports.indent = function (state, dispatch) {
    var indentation = state.schema.marks.indentation;
    return commands_1.toggleBlockMark(indentation, function (oldMark) {
        // No mark - add a mark with level 1
        return !oldMark
            ? { level: 1 }
            : // Level is at 6 or higher - do nothing
                oldMark.level >= 6
                    ? undefined
                    : // For other cases - increase level by 1
                        { level: oldMark.level + 1 };
    }, isIndentationAllowed)(state, dispatch);
};
exports.outdent = function (state, dispatch) {
    var indentation = state.schema.marks.indentation;
    return commands_1.toggleBlockMark(indentation, function (oldMark) {
        // No mark - do nothing
        return !oldMark
            ? undefined
            : // Level is at 1 or lower - remove the mark
                oldMark.level <= 1
                    ? false
                    : // For other cases - decrease level by 1
                        { level: oldMark.level - 1 };
    }, isIndentationAllowed)(state, dispatch);
};
exports.removeIndentation = function (state, dispatch) {
    return commands_1.toggleBlockMark(state.schema.marks.indentation, function () { return false; })(state, dispatch);
};
//# sourceMappingURL=index.js.map