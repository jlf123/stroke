"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var mention_1 = require("@atlaskit/icon/glyph/editor/mention");
var analytics_1 = require("../../../../analytics");
var ToolbarButton_1 = require("../../../../ui/ToolbarButton");
var insert_mention_query_1 = require("../../commands/insert-mention-query");
var ToolbarMention = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarMention, _super);
    function ToolbarMention() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleInsertMention = analytics_1.withAnalytics('atlassian.fabric.mention.picker.trigger.button', function () {
            if (!_this.props.editorView) {
                return false;
            }
            insert_mention_query_1.insertMentionQuery()(_this.props.editorView.state, _this.props.editorView.dispatch);
            return true;
        });
        return _this;
    }
    ToolbarMention.prototype.render = function () {
        return (React.createElement(ToolbarButton_1.default, { spacing: "none", onClick: this.handleInsertMention, disabled: this.props.isDisabled, title: "Mention @", iconBefore: React.createElement(mention_1.default, { label: "Mention" }) }));
    };
    return ToolbarMention;
}(react_1.PureComponent));
exports.default = ToolbarMention;
//# sourceMappingURL=index.js.map