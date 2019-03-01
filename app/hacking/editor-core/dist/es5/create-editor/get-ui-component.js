"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../ui/Appearance/Message");
var FullPage_1 = require("../ui/Appearance/FullPage");
var Chromeless_1 = require("../ui/Appearance/Chromeless");
var Comment_1 = require("../ui/Appearance/Comment");
var Mobile_1 = require("../ui/Appearance/Mobile");
function getUiComponent(appearance) {
    appearance = appearance || 'message';
    switch (appearance) {
        case 'message':
            return Message_1.default;
        case 'full-page':
            return FullPage_1.default;
        case 'chromeless':
            return Chromeless_1.default;
        case 'comment':
            return Comment_1.default;
        case 'mobile':
            return Mobile_1.default;
        default:
            throw new Error("Appearance '" + appearance + "' is not supported by the editor.");
    }
}
exports.default = getUiComponent;
//# sourceMappingURL=get-ui-component.js.map