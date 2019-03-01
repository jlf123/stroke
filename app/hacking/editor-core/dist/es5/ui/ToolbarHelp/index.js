"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var question_1 = require("@atlaskit/icon/glyph/question");
var ToolbarButton_1 = require("../ToolbarButton");
var WithHelpTrigger_1 = require("../WithHelpTrigger");
var ToolbarHelp = function () { return (React.createElement(WithHelpTrigger_1.default, { render: function (showHelp) { return (React.createElement(ToolbarButton_1.default, { onClick: showHelp, title: "Open help dialog", titlePosition: "left", iconBefore: React.createElement(question_1.default, { label: "Open help dialog" }) })); } })); };
exports.default = ToolbarHelp;
//# sourceMappingURL=index.js.map