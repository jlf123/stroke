"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var commands_1 = require("../../../commands");
var gap_cursor_1 = require("../../../plugins/gap-cursor");
var utils_1 = require("../../../utils");
var ClickWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  flex-grow: 1;\n  height: 100%;\n"], ["\n  flex-grow: 1;\n  height: 100%;\n"])));
ClickWrapper.displayName = 'ClickWrapper';
// we ignore all of the clicks made inside <div class="ak-editor-content-area" /> (but not clicks on the node itself)
var insideContentArea = function (ref) {
    while (ref) {
        if (ref.classList && ref.classList.contains('ak-editor-content-area')) {
            return true;
        }
        ref = ref.parentNode;
    }
    return false;
};
var ClickAreaBlock = /** @class */ (function (_super) {
    tslib_1.__extends(ClickAreaBlock, _super);
    function ClickAreaBlock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (event) {
            var view = _this.props.editorView;
            var contentArea = event.currentTarget.querySelector('.ak-editor-content-area');
            // @see https://product-fabric.atlassian.net/browse/ED-4287
            // click event gets triggered twice on a checkbox (on <label> first and then on <input>)
            // by the time it gets triggered on input, PM already re-renders nodeView and detaches it from DOM
            // which doesn't pass the check !contentArea.contains(event.target)
            var isInputClicked = event.target.nodeName === 'INPUT';
            // @see ED-5126
            var isPopupClicked = !!utils_1.closestElement(event.target, '[data-editor-popup]');
            if ((!contentArea || !insideContentArea(event.target.parentNode)) &&
                !isInputClicked &&
                !isPopupClicked &&
                view) {
                var dispatch = view.dispatch, dom = view.dom;
                var bottomAreaClicked = event.clientY > dom.getBoundingClientRect().bottom;
                var isParagrpahAppended = bottomAreaClicked
                    ? commands_1.createParagraphAtEnd()(view.state, dispatch)
                    : false;
                var isGapCursorSet = gap_cursor_1.setCursorForTopLevelBlocks(event, dom, view.posAtCoords.bind(view))(view.state, dispatch);
                if (isParagrpahAppended || isGapCursorSet) {
                    view.focus();
                    event.stopPropagation();
                }
            }
        };
        return _this;
    }
    ClickAreaBlock.prototype.render = function () {
        return (React.createElement(ClickWrapper, { onClick: this.handleClick }, this.props.children));
    };
    return ClickAreaBlock;
}(React.Component));
exports.default = ClickAreaBlock;
var templateObject_1;
//# sourceMappingURL=index.js.map