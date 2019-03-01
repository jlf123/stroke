"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var prosemirror_utils_1 = require("prosemirror-utils");
var editor_common_1 = require("@atlaskit/editor-common");
var styled_1 = require("./styled");
var Resizer_1 = require("./Resizer");
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
            var newPct = editor_common_1.calcPctFromPx(newWidth, _this.props.lineLength) * 100;
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
                var newLayout = newWidth <= editor_common_1.akEditorWideLayoutWidth ? 'wide' : 'full-width';
                return {
                    width: _this.props.pctWidth || null,
                    layout: newLayout,
                };
            }
        };
        _this.calcColumnLeft = function () {
            var offsetLeft = _this.calcOffsetLeft();
            return _this.insideInlineLike
                ? Math.floor(editor_common_1.calcColumnsFromPx(offsetLeft, _this.props.lineLength, _this.props.gridSize))
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
                snapTargets.push(editor_common_1.calcPxFromColumns(i, lineLength, this.gridWidth) - offsetLeft);
            }
            // full width
            snapTargets.push(lineLength - offsetLeft);
            var minimumWidth = editor_common_1.calcPxFromColumns(this.wrappedLayout || this.insideInlineLike ? 1 : 2, lineLength, this.props.gridSize);
            var snapPoints = snapTargets.filter(function (width) { return width >= minimumWidth; });
            var $pos = this.$pos;
            if (!$pos) {
                return snapPoints;
            }
            var isTopLevel = $pos.parent.type.name === 'doc';
            if (isTopLevel && appearance === 'full-page') {
                snapPoints.push(editor_common_1.akEditorWideLayoutWidth);
                var fullWidthPoint = containerWidth - editor_common_1.akEditorBreakoutPadding;
                if (fullWidthPoint > editor_common_1.akEditorWideLayoutWidth) {
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
            return !!prosemirror_utils_1.findParentNodeOfTypeClosestToPos($pos, [table, listItem]);
        },
        enumerable: true,
        configurable: true
    });
    ResizableMediaSingle.prototype.render = function () {
        var _this = this;
        var _a = this.props, origWidth = _a.width, origHeight = _a.height, layout = _a.layout, pctWidth = _a.pctWidth, lineLength = _a.lineLength, containerWidth = _a.containerWidth;
        var pxWidth = origWidth;
        if (layout === 'wide') {
            var wideWidth = lineLength * editor_common_1.breakoutWideScaleRatio;
            pxWidth = wideWidth > containerWidth ? lineLength : wideWidth;
        }
        else if (layout === 'full-width') {
            pxWidth = containerWidth - editor_common_1.akEditorBreakoutPadding;
        }
        else if (pctWidth && origWidth && origHeight) {
            pxWidth = Math.ceil(editor_common_1.calcPxFromPct(pctWidth / 100, lineLength || containerWidth));
        }
        // scale, keeping aspect ratio
        var height = (origHeight / origWidth) * pxWidth;
        var width = pxWidth;
        var enable = {};
        Resizer_1.handleSides.forEach(function (side) {
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
        return (React.createElement(styled_1.Wrapper, { width: width, height: height, layout: layout, containerWidth: containerWidth || origWidth, innerRef: function (elem) { return (_this.wrapper = elem); } },
            React.createElement(Resizer_1.default, tslib_1.__assign({}, this.props, { width: width, height: height, selected: this.props.selected, enable: enable, calcNewSize: this.calcNewSize, snapPoints: this.snapPoints, scaleFactor: !this.wrappedLayout && !this.insideInlineLike ? 2 : 1, isInlineLike: this.insideInlineLike, getColumnLeft: this.calcColumnLeft }), this.props.children)));
    };
    return ResizableMediaSingle;
}(React.Component));
exports.default = ResizableMediaSingle;
//# sourceMappingURL=index.js.map