"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
var adf_schema_1 = require("@atlaskit/adf-schema");
var nodeviews_1 = require("../../nodeviews");
var jira_issue_1 = require("./nodeviews/jira-issue");
exports.pluginKey = new prosemirror_state_1.PluginKey('jiraIssuePlugin');
var createPlugin = function (_a) {
    var portalProviderAPI = _a.portalProviderAPI;
    return new prosemirror_state_1.Plugin({
        key: exports.pluginKey,
        props: {
            nodeViews: {
                confluenceJiraIssue: nodeviews_1.ReactNodeView.fromComponent(jira_issue_1.default, portalProviderAPI),
            },
        },
    });
};
var jiraIssuePlugin = {
    nodes: function () {
        return [{ name: 'confluenceJiraIssue', node: adf_schema_1.confluenceJiraIssue }];
    },
    pmPlugins: function () {
        return [
            {
                name: 'jiraIssue',
                plugin: createPlugin,
            },
        ];
    },
};
exports.default = jiraIssuePlugin;
//# sourceMappingURL=index.js.map