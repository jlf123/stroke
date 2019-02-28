"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var width_1 = require("../../plugins/width");
var editor_common_1 = require("@atlaskit/editor-common");
var WidthEmitter = /** @class */ (function (_super) {
    tslib_1.__extends(WidthEmitter, _super);
    function WidthEmitter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.debounce = null;
        _this.broadcastWidth = function (width) {
            var editorView = _this.props.editorView;
            if (editorView && _this.width !== width) {
                if (_this.debounce) {
                    clearTimeout(_this.debounce);
                }
                // NodeViews will trigger multiple state change error without this debounce
                _this.debounce = window.setTimeout(function () {
                    var pmDom = _this.props.contentArea
                        ? _this.props.contentArea.querySelector('.ProseMirror')
                        : undefined;
                    var tr = editorView.state.tr.setMeta(width_1.pluginKey, {
                        width: width,
                        lineLength: pmDom ? pmDom.clientWidth : undefined,
                    });
                    editorView.dispatch(tr);
                    _this.width = width;
                    _this.debounce = null;
                }, 10);
            }
            return null;
        };
        return _this;
    }
    WidthEmitter.prototype.render = function () {
        var _this = this;
        return (React.createElement(editor_common_1.WidthConsumer, null, function (_a) {
            var width = _a.width;
            return _this.broadcastWidth(width);
        }));
    };
    return WidthEmitter;
}(react_1.Component));
exports.default = WidthEmitter;
//# sourceMappingURL=index.js.map