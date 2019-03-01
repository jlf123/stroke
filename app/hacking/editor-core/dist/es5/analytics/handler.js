"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Provider using globally available, configured Herment instance.
 *
 * @link https://bitbucket.org/atlassian/herment/overview
 */
function hermentHandler(name, properties) {
    try {
        window.AJS.EventQueue.push({ name: name, properties: properties });
    }
    catch (e) {
        // tslint:disable-next-line:no-console
        console.warn('Unable to send analytics event via Herment - has it been initialized?', e);
    }
}
exports.hermentHandler = hermentHandler;
function debugHandler(name, properties) {
    // tslint:disable-next-line:no-console
    console.info('analytics event: ', name, properties ? properties : '[no properties]');
}
exports.debugHandler = debugHandler;
/**
 * Attempt to detect analytics provider.
 */
function detectHandler() {
    // Check Herment is globally available
    if (typeof window !== 'undefined' &&
        window.AJS &&
        window.AJS.EventQueue &&
        typeof window.AJS.EventQueue.push === 'function') {
        return hermentHandler;
    }
    // Unable to detect a suitable handler
    return function () { return null; };
}
exports.detectHandler = detectHandler;
//# sourceMappingURL=handler.js.map