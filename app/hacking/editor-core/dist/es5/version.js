"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var package_json_1 = require("../package.json");
exports.name = package_json_1.name;
exports.version = package_json_1.version;
var nextMajorVersion = function () {
    return [Number(package_json_1.version.split('.')[0]) + 1, 0, 0].join('.');
};
exports.nextMajorVersion = nextMajorVersion;
//# sourceMappingURL=version.js.map