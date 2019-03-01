"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var editor_1 = require("../../editor");
var EditorWithActions_1 = require("../../labs/EditorWithActions");
var ChromeCollapsed_1 = require("../ChromeCollapsed");
var CollapsedEditor = /** @class */ (function (_super) {
    tslib_1.__extends(CollapsedEditor, _super);
    function CollapsedEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleEditorRef = function (editorRef, editorRefCallback) {
            if (editorRefCallback && typeof editorRefCallback === 'function') {
                editorRefCallback(editorRef);
            }
            _this.editorComponent = editorRef;
        };
        return _this;
    }
    CollapsedEditor.prototype.componentWillReceiveProps = function (nextProps, nextState) {
        if (!this.props.isExpanded && nextProps.isExpanded) {
            this.shouldTriggerExpandEvent = true;
        }
    };
    CollapsedEditor.prototype.componentDidUpdate = function () {
        if (this.shouldTriggerExpandEvent && this.editorComponent) {
            this.shouldTriggerExpandEvent = false;
            if (this.props.onExpand) {
                this.props.onExpand();
            }
        }
    };
    CollapsedEditor.prototype.render = function () {
        var _this = this;
        var child = React.Children.only(this.props.children);
        if (child.type !== editor_1.default && child.type !== EditorWithActions_1.default) {
            throw new Error('Expected child to be of type `Editor`');
        }
        if (!this.props.isExpanded) {
            return (React.createElement(ChromeCollapsed_1.default, { onFocus: this.props.onFocus, text: this.props.placeholder }));
        }
        return React.cloneElement(child, {
            ref: function (editorComponent) {
                return _this.handleEditorRef(editorComponent, child.ref);
            },
        });
    };
    return CollapsedEditor;
}(React.Component));
exports.default = CollapsedEditor;
//# sourceMappingURL=index.js.map