"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_model_1 = require("prosemirror-model");
var slice_1 = require("../../../utils/slice");
exports.generateColgroup = function (node) {
    var cols = [];
    node.content.firstChild.content.forEach(function (cell) {
        if (Array.isArray(cell.attrs.colwidth)) {
            cell.attrs.colwidth.forEach(function (width) {
                cols.push(['col', { style: "width: " + width + "px;" }]);
            });
        }
        else {
            cols.push(['col', {}]);
        }
    });
    return cols;
};
exports.renderColgroupFromNode = function (node) {
    var rendered = prosemirror_model_1.DOMSerializer.renderSpec(document, 
    // @ts-ignore
    ['colgroup', {}].concat(exports.generateColgroup(node)));
    if (rendered.dom) {
        return rendered.dom;
    }
};
exports.insertColgroupFromNode = function (tableElem, node) {
    var colgroup = tableElem.querySelector('colgroup');
    if (colgroup) {
        tableElem.removeChild(colgroup);
    }
    colgroup = exports.renderColgroupFromNode(node);
    tableElem.insertBefore(colgroup, tableElem.firstChild);
    return colgroup.children;
};
exports.hasTableBeenResized = function (node) {
    return !!slice_1.getFragmentBackingArray(node.content.firstChild.content).find(function (cell) { return cell.attrs.colwidth; });
};
//# sourceMappingURL=colgroup.js.map