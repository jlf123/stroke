"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var media_full_width_1 = require("@atlaskit/icon/glyph/editor/media-full-width");
var media_wide_1 = require("@atlaskit/icon/glyph/editor/media-wide");
var media_center_1 = require("@atlaskit/icon/glyph/editor/media-center");
var messages_1 = require("../../../messages");
var remove_breakout_1 = require("../commands/remove-breakout");
var set_breakout_mode_1 = require("../commands/set-breakout-mode");
var get_breakout_mode_1 = require("./get-breakout-mode");
var is_breakout_mark_allowed_1 = require("./is-breakout-mark-allowed");
function createBreakoutToolbarItems(state, _a) {
    var formatMessage = _a.formatMessage;
    if (!is_breakout_mark_allowed_1.isBreakoutMarkAllowed(state)) {
        return false;
    }
    var breakoutMode = get_breakout_mode_1.getBreakoutMode(state);
    var centerButton = {
        type: 'button',
        icon: media_center_1.default,
        onClick: remove_breakout_1.removeBreakout(),
        title: formatMessage(messages_1.default.layoutFixedWidth),
        selected: !breakoutMode,
    };
    var wideButton = {
        type: 'button',
        icon: media_wide_1.default,
        onClick: set_breakout_mode_1.setBreakoutMode('wide'),
        title: formatMessage(messages_1.default.layoutWide),
        selected: breakoutMode === 'wide',
    };
    var fullWidthButton = {
        type: 'button',
        icon: media_full_width_1.default,
        onClick: set_breakout_mode_1.setBreakoutMode('full-width'),
        title: formatMessage(messages_1.default.layoutFullWidth),
        selected: breakoutMode === 'full-width',
    };
    return [centerButton, wideButton, fullWidthButton];
}
exports.createBreakoutToolbarItems = createBreakoutToolbarItems;
//# sourceMappingURL=create-breakout-toolbar-items.js.map