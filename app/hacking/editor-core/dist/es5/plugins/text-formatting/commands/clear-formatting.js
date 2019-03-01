"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_transform_1 = require("prosemirror-transform");
exports.FORMATTING_NODE_TYPES = [
    'heading',
    'codeBlock',
    'blockquote',
    'panel',
];
exports.FORMATTING_MARK_TYPES = [
    'em',
    'code',
    'strike',
    'strong',
    'underline',
    'textColor',
    'subsup',
];
function clearFormatting() {
    return function (state, dispatch) {
        var tr = state.tr;
        exports.FORMATTING_MARK_TYPES.forEach(function (mark) {
            var _a = tr.selection, from = _a.from, to = _a.to;
            if (state.schema.marks[mark]) {
                tr.removeMark(from, to, state.schema.marks[mark]);
            }
        });
        exports.FORMATTING_NODE_TYPES.forEach(function (nodeName) {
            var formattedNodeType = state.schema.nodes[nodeName];
            var _a = tr.selection, $from = _a.$from, $to = _a.$to;
            tr.doc.nodesBetween($from.pos, $to.pos, function (node, pos) {
                if (node.hasMarkup(formattedNodeType)) {
                    if (formattedNodeType.isTextblock) {
                        tr.setNodeMarkup(pos, state.schema.nodes.paragraph);
                        return false;
                    }
                    else {
                        var fromPos = tr.doc.resolve(pos + 1);
                        var toPos = tr.doc.resolve(pos + node.nodeSize - 1);
                        var nodeRange = fromPos.blockRange(toPos);
                        if (nodeRange) {
                            var targetLiftDepth = prosemirror_transform_1.liftTarget(nodeRange);
                            if (targetLiftDepth || targetLiftDepth === 0) {
                                tr.lift(nodeRange, targetLiftDepth);
                            }
                        }
                    }
                }
                return true;
            });
        });
        tr.setStoredMarks([]);
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    };
}
exports.clearFormatting = clearFormatting;
//# sourceMappingURL=clear-formatting.js.map