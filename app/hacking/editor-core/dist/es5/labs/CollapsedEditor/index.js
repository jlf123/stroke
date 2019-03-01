"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ChromeCollapsed_1 = require("../../ui/ChromeCollapsed");
var CollapsedEditor = /** @class */ (function (_super) {
    tslib_1.__extends(CollapsedEditor, _super);
    function CollapsedEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { editorModules: CollapsedEditor.editorModules };
        return _this;
    }
    CollapsedEditor.prototype.componentDidMount = function () {
        if (!this.state.editorModules) {
            this.loadEditorModules();
        }
    };
    CollapsedEditor.prototype.loadEditorModules = function () {
        var _this = this;
        Promise.resolve().then(function () { return require(/* webpackChunkName:"@atlaskit-internal_editor-core-async" */ '../../'); }).then(function (modules) {
            CollapsedEditor.editorModules = modules;
            _this.setState({ editorModules: modules });
        });
    };
    CollapsedEditor.prototype.render = function () {
        if (!this.props.isExpanded) {
            return (React.createElement(ChromeCollapsed_1.default, { onFocus: this.props.onClickToExpand, text: this.props.placeholder }));
        }
        if (!this.state.editorModules) {
            // TODO: Proper loading state
            return React.createElement(ChromeCollapsed_1.default, { text: "Loading..." });
        }
        var _a = this.state.editorModules, Editor = _a.Editor, rest = tslib_1.__rest(_a, ["Editor"]);
        return this.props.renderEditor(Editor, rest);
    };
    return CollapsedEditor;
}(React.Component));
exports.default = CollapsedEditor;
//# sourceMappingURL=index.js.map