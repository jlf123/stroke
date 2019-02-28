"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isDroppedFile(rawEvent) {
    var e = rawEvent;
    if (!e.dataTransfer) {
        return false;
    }
    return (Array.prototype.slice.call(e.dataTransfer.types).indexOf('Files') !== -1);
}
exports.isDroppedFile = isDroppedFile;
//# sourceMappingURL=drag-drop.js.map