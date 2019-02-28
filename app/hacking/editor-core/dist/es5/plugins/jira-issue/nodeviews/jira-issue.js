"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var logo_1 = require("@atlaskit/logo");
var theme_1 = require("@atlaskit/theme");
// tslint:disable-next-line:variable-name
var WrapperNode = styled_components_1.default.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  align-items: center;\n  background: ", ";\n  border: 1px solid ", ";\n  border-radius: ", "px;\n  box-sizing: border-box;\n  cursor: default;\n  display: inline-flex;\n  font-size: 13px;\n  margin: 0 2px;\n  min-height: 24px;\n  padding: 0 4px;\n  user-select: none;\n  vertical-align: middle;\n  white-space: nowrap;\n\n  .ProseMirror-selectednode & {\n    background: ", ";\n    outline: none;\n  }\n"], ["\n  align-items: center;\n  background: ", ";\n  border: 1px solid ", ";\n  border-radius: ", "px;\n  box-sizing: border-box;\n  cursor: default;\n  display: inline-flex;\n  font-size: 13px;\n  margin: 0 2px;\n  min-height: 24px;\n  padding: 0 4px;\n  user-select: none;\n  vertical-align: middle;\n  white-space: nowrap;\n\n  .ProseMirror-selectednode & {\n    background: ", ";\n    outline: none;\n  }\n"])), theme_1.colors.N30, theme_1.colors.N50, theme_1.borderRadius(), theme_1.colors.N50);
// tslint:disable-next-line:variable-name
var JiraChildNode = styled_components_1.default.span(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  display: inline-block;\n  color: #707070;\n  line-height: 24px;\n  vertical-align: top;\n\n  &::before {\n    color: black;\n    content: 'JIRA | ';\n  }\n"], ["\n  display: inline-block;\n  color: #707070;\n  line-height: 24px;\n  vertical-align: top;\n\n  &::before {\n    color: black;\n    content: 'JIRA | ';\n  }\n"])));
// tslint:disable-next-line:variable-name
var SvgChildNode = styled_components_1.default.span(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  display: inline-block;\n  height: 24px;\n  vertical-align: top;\n  width: 24px;\n\n  & > div {\n    height: 24px;\n    width: 24px;\n  }\n"], ["\n  display: inline-block;\n  height: 24px;\n  vertical-align: top;\n  width: 24px;\n\n  & > div {\n    height: 24px;\n    width: 24px;\n  }\n"])));
function JIRAIssueNode(props) {
    var issueKey = props.node.attrs.issueKey;
    return (React.createElement(WrapperNode, null,
        React.createElement(SvgChildNode, null,
            React.createElement(logo_1.JiraIcon, { size: "small" })),
        React.createElement(JiraChildNode, null, issueKey)));
}
exports.default = JIRAIssueNode;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=jira-issue.js.map