"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var prosemirror_state_1 = require("prosemirror-state");
var adf_schema_1 = require("@atlaskit/adf-schema");
var editor_common_1 = require("@atlaskit/editor-common");
var nodeviews_1 = require("../../nodeviews");
var WithPluginState_1 = require("../../ui/WithPluginState");
var width_1 = require("../width");
exports.Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  .ProseMirror > .breakoutView-content-wrap &[data-layout='full-width'],\n  .ProseMirror > .breakoutView-content-wrap &[data-layout='wide'] {\n    margin-left: 50%;\n    transform: translateX(-50%);\n  }\n"], ["\n  .ProseMirror > .breakoutView-content-wrap &[data-layout='full-width'],\n  .ProseMirror > .breakoutView-content-wrap &[data-layout='wide'] {\n    margin-left: 50%;\n    transform: translateX(-50%);\n  }\n"])));
var BreakoutView = /** @class */ (function (_super) {
    tslib_1.__extends(BreakoutView, _super);
    function BreakoutView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BreakoutView.prototype.getContentDOM = function () {
        return { dom: document.createElement('div') };
    };
    BreakoutView.prototype.render = function (props, forwardRef) {
        var mode = this.node.attrs.mode;
        return (React.createElement(WithPluginState_1.default, { editorView: this.view, plugins: { widthState: width_1.pluginKey }, render: function (_a) {
                var _b = _a.widthState, widthState = _b === void 0 ? { width: 0 } : _b;
                return (React.createElement(exports.Wrapper, { className: "fabric-editor-breakout-mark", "data-layout": mode, style: { width: editor_common_1.calcBreakoutWidth(mode, widthState.width) } },
                    React.createElement("div", { ref: forwardRef })));
            } }));
    };
    return BreakoutView;
}(nodeviews_1.ReactNodeView));
function createPlugin(_a) {
    var portalProviderAPI = _a.portalProviderAPI, providerFactory = _a.providerFactory;
    return new prosemirror_state_1.Plugin({
        props: {
            nodeViews: {
                breakout: function (node, view, getPos) {
                    return new BreakoutView(node, view, getPos, portalProviderAPI, {
                        providerFactory: providerFactory,
                    }).init();
                },
            },
        },
    });
}
var breakoutPlugin = {
    pmPlugins: function () {
        return [{ name: 'breakout', plugin: createPlugin }];
    },
    marks: function () {
        return [{ name: 'breakout', mark: adf_schema_1.breakout }];
    },
};
exports.default = breakoutPlugin;
var templateObject_1;
//# sourceMappingURL=index.js.map