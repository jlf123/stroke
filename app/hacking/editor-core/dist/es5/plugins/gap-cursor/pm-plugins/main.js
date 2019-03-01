"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_view_1 = require("prosemirror-view");
var prosemirror_utils_1 = require("prosemirror-utils");
var selection_1 = require("../selection");
var utils_1 = require("../utils");
var actions_1 = require("../actions");
exports.pluginKey = new prosemirror_state_1.PluginKey('gapCursorPlugin');
var plugin = new prosemirror_state_1.Plugin({
    key: exports.pluginKey,
    // this hack fixes gap cursor alignment on each cursor movement after its been rendered to DOM
    view: function () {
        return {
            update: function (view) {
                if (view.state.selection instanceof selection_1.GapCursorSelection) {
                    utils_1.fixCursorAlignment(view);
                }
            },
        };
    },
    props: {
        decorations: function (_a) {
            var doc = _a.doc, selection = _a.selection;
            if (selection instanceof selection_1.GapCursorSelection) {
                var $from = selection.$from, side = selection.side;
                var node = document.createElement('span');
                node.className = "ProseMirror-gapcursor " + (side === selection_1.Side.LEFT ? '-left' : '-right');
                node.appendChild(document.createElement('span'));
                // render decoration DOM node always to the left of the target node even if selection points to the right
                // otherwise positioning of the right gap cursor is a nightmare when the target node has a nodeView with vertical margins
                var position = selection.head;
                if (side === selection_1.Side.RIGHT && $from.nodeBefore) {
                    var nodeBeforeStart = prosemirror_utils_1.findPositionOfNodeBefore(selection);
                    if (typeof nodeBeforeStart === 'number') {
                        position = nodeBeforeStart;
                    }
                }
                return prosemirror_view_1.DecorationSet.create(doc, [
                    prosemirror_view_1.Decoration.widget(position, node, { key: "" + selection_1.JSON_ID, side: -1 }),
                ]);
            }
            return null;
        },
        // render gap cursor only when its valid
        createSelectionBetween: function (view, $anchor, $head) {
            if ($anchor.pos === $head.pos && selection_1.GapCursorSelection.valid($head)) {
                return new selection_1.GapCursorSelection($head);
            }
            return;
        },
        // there's no space between top level nodes and the wrapping ProseMirror contenteditable area and handleClick won't capture clicks, there's nothing to click on
        // it handles only attempts to set gap cursor for nested nodes, where we have space between parent and child nodes
        // top level nodes are handled by <ClickAreaBlock>
        handleClick: function (view, position, event) {
            var posAtCoords = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
            });
            // this helps to ignore all of the clicks outside of the parent (e.g. nodeView controls)
            if (posAtCoords &&
                posAtCoords.inside !== position &&
                !utils_1.isIgnoredClick(event.target)) {
                // max available space between parent and child from the left side in px
                // this ensures the correct side of the gap cursor in case of clicking in between two block nodes
                var leftSideOffsetX = 20;
                var side = event.offsetX > leftSideOffsetX ? selection_1.Side.RIGHT : selection_1.Side.LEFT;
                return actions_1.setGapCursorAtPos(position, side)(view.state, view.dispatch);
            }
            return false;
        },
    },
});
exports.default = plugin;
//# sourceMappingURL=main.js.map