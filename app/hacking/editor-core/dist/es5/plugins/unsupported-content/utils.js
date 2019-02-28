"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_1 = require("../../analytics");
exports.traverseNode = function (node, schema) {
    var cxhtml = '';
    var _a = schema.nodes, unsupportedInline = _a.unsupportedInline, unsupportedBlock = _a.unsupportedBlock;
    if (node.attrs && node.attrs.cxhtml) {
        cxhtml = node.attrs.cxhtml;
    }
    var data = {
        type: node.type.name,
        cxhtml: cxhtml,
        text: node.text || '',
    };
    if (node.type === unsupportedInline) {
        analytics_1.analyticsService.trackEvent('atlassian.editor.confluenceUnsupported.inline', data);
    }
    else if (node.type === unsupportedBlock) {
        analytics_1.analyticsService.trackEvent('atlassian.editor.confluenceUnsupported.block', data);
    }
    else {
        node.content.forEach(function (node) { return exports.traverseNode(node, schema); });
    }
};
//# sourceMappingURL=utils.js.map