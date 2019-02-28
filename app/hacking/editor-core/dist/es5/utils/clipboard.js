"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkClipboardTypes(type, item) {
    var isDOMStringList = function (t) { return !t.indexOf && !!t.contains; };
    return isDOMStringList(type) ? type.contains(item) : type.indexOf(item) > -1;
}
exports.checkClipboardTypes = checkClipboardTypes;
function isPastedFile(rawEvent) {
    var clipboardData = rawEvent.clipboardData;
    if (!clipboardData) {
        return false;
    }
    return checkClipboardTypes(clipboardData.types, 'Files');
}
exports.isPastedFile = isPastedFile;
//# sourceMappingURL=clipboard.js.map