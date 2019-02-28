"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_intl_1 = require("react-intl");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_utils_1 = require("prosemirror-utils");
var remove_1 = require("@atlaskit/icon/glyph/editor/remove");
var open_1 = require("@atlaskit/icon/glyph/open");
var analytics_1 = require("../../analytics");
var messages_1 = require("../../messages");
exports.messages = react_intl_1.defineMessages({
    block: {
        id: 'fabric.editor.displayBlock',
        defaultMessage: 'Display as card',
        description: 'Display link as a card with a rich preview similar to in a Facebook feed with page title, description, and potentially an image.',
    },
    inline: {
        id: 'fabric.editor.displayInline',
        defaultMessage: 'Display as link',
        description: 'Display link with the title only.',
    },
    link: {
        id: 'fabric.editor.displayLink',
        defaultMessage: 'Display as text',
        description: 'Convert the card to become a regular text-based hyperlink.',
    },
});
var remove = function (state, dispatch) {
    if (dispatch) {
        dispatch(prosemirror_utils_1.removeSelectedNode(state.tr));
    }
    analytics_1.analyticsService.trackEvent('atlassian.editor.format.card.delete.button');
    return true;
};
var visit = function (state) {
    if (state.selection instanceof prosemirror_state_1.NodeSelection) {
        var attrs = state.selection.node.attrs;
        var data = attrs.data || {};
        var url = attrs.url || data.url;
        window.open(url);
        analytics_1.analyticsService.trackEvent('atlassian.editor.format.card.visit.button');
        return true;
    }
    return false;
};
// Temporarily disabled after https://product-fabric.atlassian.net/browse/MS-1308
/*
const changeAppearance = (selectedOption: SelectOption) => {
  if (selectedOption.value === 'link') {
    return changeSelectedCardToLink;
  } else {
    return setSelectedCardAppearance(selectedOption.value as CardAppearance);
  }
};

const buildDropdown = (
  state: EditorState,
  intl: InjectedIntl,
): FloatingToolbarItem<Command> => {
  const { selection } = state;
  const selectedNode = selection instanceof NodeSelection && selection.node;
  const options: SelectOption[] = [];
  const { inlineCard, blockCard } = state.schema.nodes;

  if (selectedNode && [inlineCard, blockCard].indexOf(selectedNode.type) > -1) {
    const currentAppearance = appearanceForNodeType(selectedNode.type);

    ['block', 'inline', 'link'].forEach(value => {
      // don't allow conversion to link if it has no url attached
      if (value === 'link' && !selectedNode.attrs.url) {
        return;
      }

      if (value === 'block') {
        // don't allow conversion if the parent node doesn't allow it
        const { $from } = selection;
        const containerDepth =
          currentAppearance === 'block' ? $from.depth : $from.depth - 1;

        const allowed = $from
          .node(containerDepth)
          .type.validContent(
            Fragment.from(
              blockCard.createChecked(
                selectedNode.attrs,
                undefined,
                selectedNode.marks,
              ),
            ),
          );

        if (!allowed) {
          return;
        }
      }

      options.push({
        value,
        label: intl.formatMessage(messages[value]),
        selected: currentAppearance === value,
      });
    });
  }

  return {
    type: 'select',
    options,
    defaultValue: options.find(option => !!option.selected),
    onChange: changeAppearance,
  };
}; */
exports.floatingToolbar = function (state, intl) {
    var _a = state.schema.nodes, inlineCard = _a.inlineCard, blockCard = _a.blockCard;
    return {
        title: 'Card floating controls',
        nodeType: [inlineCard, blockCard],
        items: [
            // Temporarily disabled after https://product-fabric.atlassian.net/browse/MS-1308
            // buildDropdown(state, intl),
            // { type: 'separator' },
            {
                type: 'button',
                icon: open_1.default,
                title: intl.formatMessage(messages_1.default.visit),
                onClick: visit,
            },
            { type: 'separator' },
            {
                type: 'button',
                appearance: 'danger',
                icon: remove_1.default,
                title: intl.formatMessage(messages_1.default.remove),
                onClick: remove,
            },
        ],
    };
};
//# sourceMappingURL=toolbar.js.map