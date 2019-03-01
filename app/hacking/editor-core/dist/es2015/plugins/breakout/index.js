import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import { Plugin } from 'prosemirror-state';
import { breakout } from '@atlaskit/adf-schema';
import { calcBreakoutWidth } from '@atlaskit/editor-common';
import { ReactNodeView } from '../../nodeviews';
import WithPluginState from '../../ui/WithPluginState';
import { pluginKey as widthPluginKey } from '../width';
export var Wrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  .ProseMirror > .breakoutView-content-wrap &[data-layout='full-width'],\n  .ProseMirror > .breakoutView-content-wrap &[data-layout='wide'] {\n    margin-left: 50%;\n    transform: translateX(-50%);\n  }\n"], ["\n  .ProseMirror > .breakoutView-content-wrap &[data-layout='full-width'],\n  .ProseMirror > .breakoutView-content-wrap &[data-layout='wide'] {\n    margin-left: 50%;\n    transform: translateX(-50%);\n  }\n"])));
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
        return (React.createElement(WithPluginState, { editorView: this.view, plugins: { widthState: widthPluginKey }, render: function (_a) {
                var _b = _a.widthState, widthState = _b === void 0 ? { width: 0 } : _b;
                return (React.createElement(Wrapper, { className: "fabric-editor-breakout-mark", "data-layout": mode, style: { width: calcBreakoutWidth(mode, widthState.width) } },
                    React.createElement("div", { ref: forwardRef })));
            } }));
    };
    return BreakoutView;
}(ReactNodeView));
function createPlugin(_a) {
    var portalProviderAPI = _a.portalProviderAPI, providerFactory = _a.providerFactory;
    return new Plugin({
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
        return [{ name: 'breakout', mark: breakout }];
    },
};
export default breakoutPlugin;
var templateObject_1;
//# sourceMappingURL=index.js.map