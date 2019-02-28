"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_intl_1 = require("react-intl");
var prosemirror_utils_1 = require("prosemirror-utils");
var layout_two_equal_1 = require("@atlaskit/icon/glyph/editor/layout-two-equal");
var layout_three_equal_1 = require("@atlaskit/icon/glyph/editor/layout-three-equal");
var remove_1 = require("@atlaskit/icon/glyph/editor/remove");
var messages_1 = require("../../messages");
var actions_1 = require("./actions");
var create_breakout_toolbar_items_1 = require("../breakout/utils/create-breakout-toolbar-items");
exports.messages = react_intl_1.defineMessages({
    twoColumns: {
        id: 'fabric.editor.twoColumns',
        defaultMessage: 'Two columns',
        description: '',
    },
    threeColumns: {
        id: 'fabric.editor.threeColumns',
        defaultMessage: 'Three columns',
        description: '',
    },
});
var LAYOUT_TYPES = [
    { type: 'two_equal', title: exports.messages.twoColumns, icon: layout_two_equal_1.default },
    {
        type: 'three_equal',
        title: exports.messages.threeColumns,
        icon: layout_three_equal_1.default,
    },
];
var buildLayoutButton = function (intl, item, currentLayout) { return ({
    type: 'button',
    icon: item.icon,
    title: intl.formatMessage(item.title),
    onClick: actions_1.setPresetLayout(item.type),
    selected: !!currentLayout && currentLayout === item.type,
}); };
exports.buildToolbar = function (state, intl, pos, allowBreakout) {
    var node = state.doc.nodeAt(pos);
    if (node) {
        var currentLayout_1 = actions_1.getPresetLayout(node);
        var breakoutToolbar = allowBreakout
            ? create_breakout_toolbar_items_1.createBreakoutToolbarItems(state, {
                formatMessage: intl.formatMessage,
            })
            : null;
        var separator = {
            type: 'separator',
        };
        var deleteButton = {
            type: 'button',
            appearance: 'danger',
            icon: remove_1.default,
            title: intl.formatMessage(messages_1.default.remove),
            onClick: actions_1.deleteActiveLayoutNode,
        };
        return {
            title: 'Columns floating controls',
            getDomRef: function (view) {
                return prosemirror_utils_1.findDomRefAtPos(pos, view.domAtPos.bind(view));
            },
            nodeType: state.schema.nodes.layoutSection,
            items: tslib_1.__spread(LAYOUT_TYPES.map(function (i) { return buildLayoutButton(intl, i, currentLayout_1); }), (breakoutToolbar ? tslib_1.__spread([separator], breakoutToolbar) : []), [
                separator,
                deleteButton,
            ]),
        };
    }
};
//# sourceMappingURL=toolbar.js.map