import * as tslib_1 from "tslib";
import * as React from 'react';
import { findParentNodeOfTypeClosestToPos } from 'prosemirror-utils';
import { akEditorWideLayoutWidth, calcPxFromColumns, calcPctFromPx, calcPxFromPct, akEditorBreakoutPadding, calcColumnsFromPx, breakoutWideScaleRatio, } from '@atlaskit/editor-common';
import { Wrapper } from './styled';
import Resizer, { handleSides } from './Resizer';
var imageAlignmentMap = {
    left: 'start',
    right: 'end',
};
var ResizableMediaSingle = /** @class */ (function (_super) {
    tslib_1.__extends(ResizableMediaSingle, _super);
    function ResizableMediaSingle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.calcNewSize = function (newWidth, stop) {
            var layout = _this.props.layout;
            var newPct = calcPctFromPx(newWidth, _this.props.lineLength) * 100;
            if (newPct <= 100) {
                var newLayout = void 0;
                if (_this.wrappedLayout && (stop ? newPct !== 100 : true)) {
                    newLayout = layout;
                }
                else {
                    newLayout = 'center';
                }
                return {
                    width: newPct,
                    layout: newLayout,
                };
            }
            else {
                // wide or full-width
                var newLayout = newWidth <= akEditorWideLayoutWidth ? 'wide' : 'full-width';
                return {
                    width: _this.props.pctWidth || null,
                    layout: newLayout,
                };
            }
        };
        _this.calcColumnLeft = function () {
            var offsetLeft = _this.calcOffsetLeft();
            return _this.insideInlineLike
                ? Math.floor(calcColumnsFromPx(offsetLeft, _this.props.lineLength, _this.props.gridSize))
                : 0;
        };
        return _this;
    }
    Object.defineProperty(ResizableMediaSingle.prototype, "wrappedLayout", {
        get: function () {
            var layout = this.props.layout;
            return (layout === 'wrap-left' ||
                layout === 'wrap-right' ||
                layout === 'align-start' ||
                layout === 'align-end');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizableMediaSingle.prototype, "$pos", {
        get: function () {
            var pos = this.props.getPos();
            if (typeof pos !== 'number') {
                return null;
            }
            return this.props.state.doc.resolve(pos);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizableMediaSingle.prototype, "gridWidth", {
        /**
         * The maxmimum number of grid columns this node can resize to.
         */
        get: function () {
            var gridSize = this.props.gridSize;
            return !(this.wrappedLayout || this.insideInlineLike)
                ? gridSize / 2
                : gridSize;
        },
        enumerable: true,
        configurable: true
    });
    ResizableMediaSingle.prototype.calcOffsetLeft = function () {
        var offsetLeft = 0;
        if (this.wrapper && this.insideInlineLike) {
            var currentNode = this.wrapper;
            var pm = document.querySelector('.ProseMirror');
            while (currentNode &&
                currentNode.parentElement &&
                !currentNode.parentElement.classList.contains('ProseMirror') &&
                currentNode !== document.body) {
                offsetLeft += currentNode.offsetLeft;
                currentNode = currentNode.parentElement;
            }
            offsetLeft -= pm.offsetLeft;
        }
        return offsetLeft;
    };
    Object.defineProperty(ResizableMediaSingle.prototype, "snapPoints", {
        get: function () {
            var offsetLeft = this.calcOffsetLeft();
            var _a = this.props, containerWidth = _a.containerWidth, lineLength = _a.lineLength, appearance = _a.appearance;
            var snapTargets = [];
            for (var i = 0; i < this.gridWidth; i++) {
                snapTargets.push(calcPxFromColumns(i, lineLength, this.gridWidth) - offsetLeft);
            }
            // full width
            snapTargets.push(lineLength - offsetLeft);
            var minimumWidth = calcPxFromColumns(this.wrappedLayout || this.insideInlineLike ? 1 : 2, lineLength, this.props.gridSize);
            var snapPoints = snapTargets.filter(function (width) { return width >= minimumWidth; });
            var $pos = this.$pos;
            if (!$pos) {
                return snapPoints;
            }
            var isTopLevel = $pos.parent.type.name === 'doc';
            if (isTopLevel && appearance === 'full-page') {
                snapPoints.push(akEditorWideLayoutWidth);
                var fullWidthPoint = containerWidth - akEditorBreakoutPadding;
                if (fullWidthPoint > akEditorWideLayoutWidth) {
                    snapPoints.push(fullWidthPoint);
                }
            }
            return snapPoints;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizableMediaSingle.prototype, "insideInlineLike", {
        get: function () {
            var $pos = this.$pos;
            if (!$pos) {
                return false;
            }
            var _a = this.props.state.schema.nodes, table = _a.table, listItem = _a.listItem;
            return !!findParentNodeOfTypeClosestToPos($pos, [table, listItem]);
        },
        enumerable: true,
        configurable: true
    });
    ResizableMediaSingle.prototype.render = function () {
        var _this = this;
        var _a = this.props, origWidth = _a.width, origHeight = _a.height, layout = _a.layout, pctWidth = _a.pctWidth, lineLength = _a.lineLength, containerWidth = _a.containerWidth;
        var pxWidth = origWidth;
        if (layout === 'wide') {
            var wideWidth = lineLength * breakoutWideScaleRatio;
            pxWidth = wideWidth > containerWidth ? lineLength : wideWidth;
        }
        else if (layout === 'full-width') {
            pxWidth = containerWidth - akEditorBreakoutPadding;
        }
        else if (pctWidth && origWidth && origHeight) {
            pxWidth = Math.ceil(calcPxFromPct(pctWidth / 100, lineLength || containerWidth));
        }
        // scale, keeping aspect ratio
        var height = (origHeight / origWidth) * pxWidth;
        var width = pxWidth;
        var enable = {};
        handleSides.forEach(function (side) {
            var oppositeSide = side === 'left' ? 'right' : 'left';
            enable[side] =
                ['full-width', 'wide', 'center']
                    .concat("wrap-" + oppositeSide)
                    .concat("align-" + imageAlignmentMap[oppositeSide])
                    .indexOf(layout) > -1;
            if (side === 'left' && _this.insideInlineLike) {
                enable[side] = false;
            }
        });
        return (React.createElement(Wrapper, { width: width, height: height, layout: layout, containerWidth: containerWidth || origWidth, innerRef: function (elem) { return (_this.wrapper = elem); } },
            React.createElement(Resizer, tslib_1.__assign({}, this.props, { width: width, height: height, selected: this.props.selected, enable: enable, calcNewSize: this.calcNewSize, snapPoints: this.snapPoints, scaleFactor: !this.wrappedLayout && !this.insideInlineLike ? 2 : 1, isInlineLike: this.insideInlineLike, getColumnLeft: this.calcColumnLeft }), this.props.children)));
    };
    return ResizableMediaSingle;
}(React.Component));
export default ResizableMediaSingle;
//# sourceMappingURL=index.js.map