"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_view_1 = require("prosemirror-view");
var types_1 = require("../types");
exports.createControlsHoverDecoration = function (cells, danger) {
    var deco = cells.map(function (cell) {
        var classes = [types_1.TableCssClassName.HOVERED_CELL];
        if (danger) {
            classes.push('danger');
        }
        return prosemirror_view_1.Decoration.node(cell.pos, cell.pos + cell.node.nodeSize, {
            class: classes.join(' '),
        }, { key: types_1.TableDecorations.CONTROLS_HOVER });
    });
    return deco;
};
exports.findControlsHoverDecoration = function (decorationSet) {
    return decorationSet.find(undefined, undefined, function (spec) { return spec.key === types_1.TableDecorations.CONTROLS_HOVER; });
};
//# sourceMappingURL=decoration.js.map