"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var PropTypes = require("prop-types");
var actions_1 = require("../../actions");
var EditorContext = /** @class */ (function (_super) {
    tslib_1.__extends(EditorContext, _super);
    function EditorContext(props) {
        var _this = _super.call(this, props) || this;
        _this.editorActions = props.editorActions || new actions_1.default();
        return _this;
    }
    EditorContext.prototype.getChildContext = function () {
        return {
            editorActions: this.editorActions,
        };
    };
    EditorContext.prototype.render = function () {
        return React.Children.only(this.props.children);
    };
    EditorContext.childContextTypes = {
        editorActions: PropTypes.object,
    };
    return EditorContext;
}(React.Component));
exports.default = EditorContext;
//# sourceMappingURL=index.js.map