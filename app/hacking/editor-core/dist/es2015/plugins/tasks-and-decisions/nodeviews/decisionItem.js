import * as tslib_1 from "tslib";
import * as React from 'react';
import DecisionItem from '../ui/Decision';
import { ReactNodeView } from '../../../nodeviews';
var Decision = /** @class */ (function (_super) {
    tslib_1.__extends(Decision, _super);
    function Decision() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Decision.prototype.isContentEmpty = function () {
        return this.node.content.childCount === 0;
    };
    Decision.prototype.createDomRef = function () {
        var domRef = document.createElement('li');
        domRef.style['list-style-type'] = 'none';
        return domRef;
    };
    Decision.prototype.getContentDOM = function () {
        return { dom: document.createElement('div') };
    };
    Decision.prototype.render = function (props, forwardRef) {
        return (React.createElement(DecisionItem, { contentRef: forwardRef, showPlaceholder: this.isContentEmpty() }));
    };
    Decision.prototype.update = function (node, decorations) {
        var _this = this;
        /**
         * Returning false here when the previous content was empty – fixes an error where the editor fails to set selection
         * inside the contentDOM after a transaction. See ED-2374.
         */
        return _super.prototype.update.call(this, node, decorations, function (currentNode, newNode) { return !_this.isContentEmpty(); });
    };
    return Decision;
}(ReactNodeView));
export var decisionItemNodeView = function (portalProviderAPI) { return function (node, view, getPos) {
    return new Decision(node, view, getPos, portalProviderAPI).init();
}; };
//# sourceMappingURL=decisionItem.js.map