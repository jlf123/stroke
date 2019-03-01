"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var PropTypes = require("prop-types");
var WithEditorActions = /** @class */ (function (_super) {
    tslib_1.__extends(WithEditorActions, _super);
    function WithEditorActions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onContextUpdate = function () {
            // Re-render actions when editorActions changes...
            _this.forceUpdate();
        };
        return _this;
    }
    WithEditorActions.prototype.componentDidMount = function () {
        this.context.editorActions._privateSubscribe(this.onContextUpdate);
    };
    WithEditorActions.prototype.componentWillUnmount = function () {
        this.context.editorActions._privateUnsubscribe(this.onContextUpdate);
    };
    WithEditorActions.prototype.render = function () {
        return this.props.render(this.context.editorActions);
    };
    WithEditorActions.contextTypes = {
        editorActions: PropTypes.object.isRequired,
    };
    return WithEditorActions;
}(React.Component));
exports.default = WithEditorActions;
//# sourceMappingURL=index.js.map