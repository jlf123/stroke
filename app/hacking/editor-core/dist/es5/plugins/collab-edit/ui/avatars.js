"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var avatar_1 = require("@atlaskit/avatar");
var avatar_group_1 = require("@atlaskit/avatar-group");
var theme_1 = require("@atlaskit/theme");
var add_1 = require("@atlaskit/icon/glyph/editor/add");
var editor_common_1 = require("@atlaskit/editor-common");
var WithPluginState_1 = require("../../../ui/WithPluginState");
var plugin_1 = require("../plugin");
var utils_1 = require("../utils");
var ToolbarButton_1 = require("../../../ui/ToolbarButton");
var AvatarContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  margin-right: ", "px;\n  display: flex;\n  align-items: center;\n  div:last-child > button {\n    border-radius: 50%;\n    height: 32px;\n    width: 32px;\n    padding: 2px;\n  }\n"], ["\n  margin-right: ", "px;\n  display: flex;\n  align-items: center;\n  div:last-child > button {\n    border-radius: 50%;\n    height: 32px;\n    width: 32px;\n    padding: 2px;\n  }\n"])), theme_1.gridSize());
var InviteTeamWrapper = styled_components_1.default.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  background: ", ";\n  border-radius: 50%;\n  min-width: ", "px;\n  margin-left: -", "px;\n"], ["\n  background: ", ";\n  border-radius: 50%;\n  min-width: ", "px;\n  margin-left: -", "px;\n"])), theme_1.colors.N20, theme_1.gridSize() * 4, theme_1.gridSize() / 2);
var itemAppear = styled_components_1.keyframes(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n0% {\n  transform: scale(0);\n}\n\n50% {\n  transform: scale(1.1);\n}\n\n100% {\n  transform: scale(1);\n}\n"], ["\n0% {\n  transform: scale(0);\n}\n\n50% {\n  transform: scale(1.1);\n}\n\n100% {\n  transform: scale(1);\n}\n"])));
var animateAvatar = function (_a) {
    var shouldAnimate = _a.shouldAnimate;
    if (!shouldAnimate) {
        return;
    }
    return "\n    & > div {\n      animation: " + itemAppear + " 500ms 1;\n      animation-fill-mode: both;\n    }\n  ";
};
var animateBadge = function (_a) {
    var shouldAnimate = _a.shouldAnimate;
    if (!shouldAnimate) {
        return;
    }
    return "\n    animation: " + itemAppear + " 250ms 1;\n    animation-fill-mode: both;\n    animation-delay: 400ms;\n  ";
};
var AvatarItem = styled_components_1.default.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  position: relative;\n  align-self: center;\n\n  ", "\n\n  &::before {\n    content: '", "';\n    display: block;\n    position: absolute;\n    right: -1px;\n    bottom: -1px;\n    width: 13px;\n    height: 13px;\n    z-index: ", ";\n    border-radius: 3px;\n    background: ", ";\n    color: #fff;\n    font-size: 9px;\n    line-height: 0;\n    padding-top: 7px;\n    text-align: center;\n    box-shadow: 0 0 1px #fff;\n    box-sizing: border-box;\n\n    ", "\n  }\n"], ["\n  position: relative;\n  align-self: center;\n\n  ", "\n\n  &::before {\n    content: '", "';\n    display: block;\n    position: absolute;\n    right: -1px;\n    bottom: -1px;\n    width: 13px;\n    height: 13px;\n    z-index: ", ";\n    border-radius: 3px;\n    background: ", ";\n    color: #fff;\n    font-size: 9px;\n    line-height: 0;\n    padding-top: 7px;\n    text-align: center;\n    box-shadow: 0 0 1px #fff;\n    box-sizing: border-box;\n\n    ", "\n  }\n"])), animateAvatar, function (props) { return props.avatar; }, editor_common_1.akEditorSmallZIndex, function (props) { return props.badgeColor; }, animateBadge);
function Item(props) {
    var color = utils_1.getAvatarColor(props.sessionId).color.solid;
    var avatar = props.name.substr(0, 1).toUpperCase();
    var children = props.children, theme = props.theme, other = tslib_1.__rest(props, ["children", "theme"]);
    return (React.createElement(AvatarItem, { badgeColor: color, avatar: avatar, shouldAnimate: props.isInteractive },
        React.createElement(avatar_1.default, tslib_1.__assign({}, other))));
}
var Avatars = /** @class */ (function (_super) {
    tslib_1.__extends(Avatars, _super);
    function Avatars() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onAvatarClick = function (event) { };
        _this.renderAvatars = function (state) {
            if (!state.data) {
                return null;
            }
            var _a = state.data, sessionId = _a.sessionId, activeParticipants = _a.activeParticipants;
            var avatars = activeParticipants
                .toArray()
                .map(function (p) { return ({
                email: p.email,
                key: p.sessionId,
                name: p.name,
                src: p.avatar,
                sessionId: p.sessionId,
                size: 'medium',
                component: Item,
            }); })
                .sort(function (p) { return (p.sessionId === sessionId ? -1 : 1); });
            if (!avatars.length) {
                return null;
            }
            return (React.createElement(AvatarContainer, null,
                React.createElement(avatar_group_1.default, { appearance: "stack", size: "medium", data: avatars, onAvatarClick: _this.onAvatarClick }),
                _this.props.inviteToEditHandler && (React.createElement(InviteTeamWrapper, null,
                    React.createElement(ToolbarButton_1.default, { onClick: _this.props.inviteToEditHandler, selected: _this.props.isInviteToEditButtonSelected, title: "Invite to edit", titlePosition: "bottom", iconBefore: React.createElement(add_1.default, { label: "Invite to edit" }) })))));
        };
        return _this;
    }
    Avatars.prototype.render = function () {
        return (React.createElement(WithPluginState_1.default, { plugins: { data: plugin_1.pluginKey }, render: this.renderAvatars, editorView: this.props.editorView }));
    };
    return Avatars;
}(React.Component));
exports.default = Avatars;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=avatars.js.map