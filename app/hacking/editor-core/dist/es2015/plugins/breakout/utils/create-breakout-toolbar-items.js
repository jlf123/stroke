import FullWidthIcon from '@atlaskit/icon/glyph/editor/media-full-width';
import WideIcon from '@atlaskit/icon/glyph/editor/media-wide';
import CenterIcon from '@atlaskit/icon/glyph/editor/media-center';
import commonMessages from '../../../messages';
import { removeBreakout } from '../commands/remove-breakout';
import { setBreakoutMode } from '../commands/set-breakout-mode';
import { getBreakoutMode } from './get-breakout-mode';
import { isBreakoutMarkAllowed } from './is-breakout-mark-allowed';
export function createBreakoutToolbarItems(state, _a) {
    var formatMessage = _a.formatMessage;
    if (!isBreakoutMarkAllowed(state)) {
        return false;
    }
    var breakoutMode = getBreakoutMode(state);
    var centerButton = {
        type: 'button',
        icon: CenterIcon,
        onClick: removeBreakout(),
        title: formatMessage(commonMessages.layoutFixedWidth),
        selected: !breakoutMode,
    };
    var wideButton = {
        type: 'button',
        icon: WideIcon,
        onClick: setBreakoutMode('wide'),
        title: formatMessage(commonMessages.layoutWide),
        selected: breakoutMode === 'wide',
    };
    var fullWidthButton = {
        type: 'button',
        icon: FullWidthIcon,
        onClick: setBreakoutMode('full-width'),
        title: formatMessage(commonMessages.layoutFullWidth),
        selected: breakoutMode === 'full-width',
    };
    return [centerButton, wideButton, fullWidthButton];
}
//# sourceMappingURL=create-breakout-toolbar-items.js.map