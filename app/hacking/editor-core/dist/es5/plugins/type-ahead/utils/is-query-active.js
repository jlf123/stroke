"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isQueryActive(mark, doc, from, to) {
    var active = false;
    doc.nodesBetween(from, to, function (node) {
        if (!active && mark.isInSet(node.marks)) {
            active = true;
        }
    });
    return active;
}
exports.isQueryActive = isQueryActive;
//# sourceMappingURL=is-query-active.js.map