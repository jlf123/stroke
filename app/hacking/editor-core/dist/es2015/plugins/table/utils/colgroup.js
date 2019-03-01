import { DOMSerializer } from 'prosemirror-model';
import { getFragmentBackingArray } from '../../../utils/slice';
export var generateColgroup = function (node) {
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
export var renderColgroupFromNode = function (node) {
    var rendered = DOMSerializer.renderSpec(document, 
    // @ts-ignore
    ['colgroup', {}].concat(generateColgroup(node)));
    if (rendered.dom) {
        return rendered.dom;
    }
};
export var insertColgroupFromNode = function (tableElem, node) {
    var colgroup = tableElem.querySelector('colgroup');
    if (colgroup) {
        tableElem.removeChild(colgroup);
    }
    colgroup = renderColgroupFromNode(node);
    tableElem.insertBefore(colgroup, tableElem.firstChild);
    return colgroup.children;
};
export var hasTableBeenResized = function (node) {
    return !!getFragmentBackingArray(node.content.firstChild.content).find(function (cell) { return cell.attrs.colwidth; });
};
//# sourceMappingURL=colgroup.js.map