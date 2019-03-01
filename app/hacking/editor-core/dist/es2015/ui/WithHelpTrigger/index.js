import * as tslib_1 from "tslib";
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { openHelpCommand } from '../../plugins/help-dialog';
import { analyticsService } from '../../analytics';
var WithHelpTrigger = /** @class */ (function (_super) {
    tslib_1.__extends(WithHelpTrigger, _super);
    function WithHelpTrigger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.openHelp = function () {
            analyticsService.trackEvent('atlassian.editor.help.button');
            var editorView = _this.context.editorActions._privateGetEditorView();
            if (editorView) {
                openHelpCommand(editorView.state.tr, editorView.dispatch);
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
export default WithHelpTrigger;
//# sourceMappingURL=index.js.map