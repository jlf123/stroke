"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_view_1 = require("prosemirror-view");
var prosemirror_state_1 = require("prosemirror-state");
exports.inlineCursorTargetStateKey = new prosemirror_state_1.PluginKey('inlineCursorTargetPlugin');
exports.SPECIAL_NODES = ['mention', 'emoji'];
exports.isSpecial = function (node) {
    return node && exports.SPECIAL_NODES.indexOf(node.type.name) !== -1;
};
var ZWSP = '\u200b';
exports.findSpecialNodeAfter = function ($pos, tr) {
    if (exports.isSpecial($pos.nodeAfter)) {
        return $pos.pos + 1;
    }
    var parentOffset = $pos.parentOffset, parent = $pos.parent;
    var docSize = tr.doc.nodeSize - 2;
    if (parentOffset === parent.content.size && $pos.pos + 1 < docSize - 2) {
        var nodeAfter = tr.doc.resolve($pos.pos + 1).nodeAfter;
        if (nodeAfter && exports.isSpecial(nodeAfter.firstChild)) {
            return $pos.pos + 2;
        }
    }
};
exports.findSpecialNodeBefore = function ($pos, tr) {
    if (exports.isSpecial($pos.nodeBefore)) {
        return $pos.pos - 1;
    }
    if ($pos.pos === 0) {
        return;
    }
    var parentOffset = $pos.parentOffset;
    if (parentOffset === 0) {
        var nodeBefore = tr.doc.resolve($pos.pos - 1).nodeBefore;
        if (nodeBefore && exports.isSpecial(nodeBefore.firstChild)) {
            return $pos.pos - 2;
        }
    }
};
exports.default = (function () {
    return new prosemirror_state_1.Plugin({
        key: exports.inlineCursorTargetStateKey,
        state: {
            init: function () { return ({ positions: [] }); },
            apply: function (tr) {
                var selection = tr.selection;
                var $from = selection.$from;
                var positions = [];
                var posAfter = exports.findSpecialNodeAfter($from, tr);
                var posBefore = exports.findSpecialNodeBefore($from, tr);
                if (posAfter !== undefined) {
                    positions.push(posAfter);
                }
                if (posBefore !== undefined) {
                    positions.push(posBefore);
                }
                return { positions: positions };
            },
        },
        props: {
            decorations: function (state) {
                var doc = state.doc;
                var positions = exports.inlineCursorTargetStateKey.getState(state).positions;
                if (positions && positions.length) {
                    var decorations = positions.map(function (position) {
                        var node = document.createElement('span');
                        node.appendChild(document.createTextNode(ZWSP));
                        return prosemirror_view_1.Decoration.widget(position, node, {
                            raw: true,
                            side: -1,
                        });
                    });
                    return prosemirror_view_1.DecorationSet.create(doc, decorations);
                }
                return null;
            },
        },
    });
});
//# sourceMappingURL=inline-cursor-target.js.map