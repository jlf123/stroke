import { liftTarget } from 'prosemirror-transform';
export var FORMATTING_NODE_TYPES = [
    'heading',
    'codeBlock',
    'blockquote',
    'panel',
];
export var FORMATTING_MARK_TYPES = [
    'em',
    'code',
    'strike',
    'strong',
    'underline',
    'textColor',
    'subsup',
];
export function clearFormatting() {
    return function (state, dispatch) {
        var tr = state.tr;
        FORMATTING_MARK_TYPES.forEach(function (mark) {
            var _a = tr.selection, from = _a.from, to = _a.to;
            if (state.schema.marks[mark]) {
                tr.removeMark(from, to, state.schema.marks[mark]);
            }
        });
        FORMATTING_NODE_TYPES.forEach(function (nodeName) {
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
                            var targetLiftDepth = liftTarget(nodeRange);
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
//# sourceMappingURL=clear-formatting.js.map