"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var PropTypes = require("prop-types");
var help_dialog_1 = require("../../plugins/help-dialog");
var analytics_1 = require("../../analytics");
var WithHelpTrigger = /** @class */ (function (_super) {
    tslib_1.__extends(WithHelpTrigger, _super);
    function WithHelpTrigger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.openHelp = function () {
            analytics_1.analyticsService.trackEvent('atlassian.editor.help.button');
            var editorView = _this.context.editorActions._privateGetEditorView();
            if (editorView) {
                help_dialog_1.openHelpCommand(editorView.state.tr, editorView.dispatch);
            }
        };
        return _this;
    }
    WithHelpTrigger.prototype.render = function () {
        return this.props.render(this.openHelp);
    };
    WithHelpTrigger.contextTypes = {
        editorActions: PropTypes.object.isRequired,
    };
    return WithHelpTrigger;
}(React.Component));
exports.default = WithHelpTrigger;
//# sourceMappingURL=index.js.map