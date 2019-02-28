"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var commands_1 = require("../../../commands");
var ClickArea = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  flex-grow: 1;\n"], ["\n  flex-grow: 1;\n"])));
ClickArea.displayName = 'ClickArea';
var ClickAreaInline = /** @class */ (function (_super) {
    tslib_1.__extends(ClickAreaInline, _super);
    function ClickAreaInline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (event) {
            var editorView = _this.props.editorView;
            if (editorView) {
                if (commands_1.createParagraphAtEnd()(editorView.state, editorView.dispatch)) {
                    editorView.focus();
                    event.stopPropagation();
                }
            }
        };
        return _this;
    }
    ClickAreaInline.prototype.render = function () {
        return React.createElement(ClickArea, { onClick: this.handleClick });
    };
    return ClickAreaInline;
}(React.Component));
exports.default = ClickAreaInline;
var templateObject_1;
//# sourceMappingURL=index.js.map