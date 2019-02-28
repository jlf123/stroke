import { name, version } from '../package.json';
var nextMajorVersion = function () {
    return [Number(version.split('.')[0]) + 1, 0, 0].join('.');
};
export { name, version, nextMajorVersion };
//# sourceMappingURL=version.js.map