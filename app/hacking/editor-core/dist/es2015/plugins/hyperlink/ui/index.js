import * as tslib_1 from "tslib";
import * as React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { findDomRefAtPos } from 'prosemirror-utils';
import { setLinkText, removeLink, hideLinkToolbar, setLinkHref, insertLink, } from '../commands';
import HyperlinkEdit from './HyperlinkEdit';
import RecentSearch from './RecentSearch';
import { normalizeUrl } from '../utils';
import { InsertStatus } from '../pm-plugins/main';
export var messages = defineMessages({
    linkPlaceholder: {
        id: 'fabric.editor.linkPlaceholder',
        defaultMessage: 'Paste link',
        description: 'Create a new link by pasting a URL.',
    },
    linkTextPlaceholder: {
        id: 'fabric.editor.linkTextPlaceholder',
        defaultMessage: 'Text to display',
        description: 'Enter the text you’d like to display for the link (instead of the URL).',
    },
    linkPlaceholderWithSearch: {
        id: 'fabric.editor.linkPlaceholderWithSearch',
        defaultMessage: 'Paste link or search recently viewed',
        description: 'Create a new link by pasting a URL or searching pages you’ve recently visited.',
    },
});
var AddDisplayTextToolbar = /** @class */ (function (_super) {
    tslib_1.__extends(AddDisplayTextToolbar, _super);
    function AddDisplayTextToolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddDisplayTextToolbar.prototype.render = function () {
        var _a = this.props, pos = _a.pos, node = _a.node, view = _a.view, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, formatMessage = _a.intl.formatMessage;
        var existingLink = node.type.schema.marks.link.isInSet(node.marks).attrs.href;
        var unlink = function () {
            return removeLink(pos)(view.state, view.dispatch) && view.focus();
        };
        var hideToolbar = function () {
            return hideLinkToolbar()(view.state, view.dispatch) && view.focus();
        };
        var updateLinkText = function (text) {
            return setLinkText(pos, text)(view.state, view.dispatch) && view.focus();
        };
        var updateLinkTextOrHideToolbar = function (text) {
            return updateLinkText(text) || hideToolbar();
        };
        return (React.createElement(HyperlinkEdit, { target: findDomRefAtPos(pos, view.domAtPos.bind(view)), popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, alwaysOpenLinkAt: existingLink, placeholder: formatMessage(messages.linkTextPlaceholder), onSubmit: updateLinkText, onBlur: updateLinkTextOrHideToolbar, onUnlink: unlink, onOpenLink: function () { } }));
    };
    return AddDisplayTextToolbar;
}(React.PureComponent));
export { AddDisplayTextToolbar };
export var AddDisplayTextToolbarWithIntl = injectIntl(AddDisplayTextToolbar);
var EditLinkHrefToolbar = /** @class */ (function (_super) {
    tslib_1.__extends(EditLinkHrefToolbar, _super);
    function EditLinkHrefToolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditLinkHrefToolbar.prototype.render = function () {
        var _a = this.props, pos = _a.pos, node = _a.node, view = _a.view, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, formatMessage = _a.intl.formatMessage;
        var existingLink = node.type.schema.marks.link.isInSet(node.marks).attrs.href;
        var hideToolbar = function () {
            return hideLinkToolbar()(view.state, view.dispatch) && view.focus();
        };
        var updateLinkHref = function (href) {
            return setLinkHref(pos, href)(view.state, view.dispatch) && view.focus();
        };
        var updateLinkHrefOrHideToolbar = function (href) {
            return updateLinkHref(href) || hideToolbar();
        };
        var unlink = function () {
            return removeLink(pos)(view.state, view.dispatch) && view.focus();
        };
        return (React.createElement(HyperlinkEdit, { target: findDomRefAtPos(pos, view.domAtPos.bind(view)), popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, defaultValue: existingLink, placeholder: formatMessage(messages.linkPlaceholder), onSubmit: updateLinkHref, onBlur: updateLinkHrefOrHideToolbar, onUnlink: unlink, onOpenLink: function () { } }));
    };
    return EditLinkHrefToolbar;
}(React.PureComponent));
export { EditLinkHrefToolbar };
export var EditLinkHrefToolbarWithIntl = injectIntl(EditLinkHrefToolbar);
var InsertLinkToolbar = /** @class */ (function (_super) {
    tslib_1.__extends(InsertLinkToolbar, _super);
    function InsertLinkToolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InsertLinkToolbar.prototype.render = function () {
        var _a = this.props, from = _a.from, to = _a.to, view = _a.view, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, formatMessage = _a.intl.formatMessage;
        var hideToolbar = function () {
            return hideLinkToolbar()(view.state, view.dispatch) && view.focus();
        };
        var addLink = function (href) {
            return insertLink(from, to, href)(view.state, view.dispatch) && view.focus();
        };
        return (React.createElement(HyperlinkEdit, { target: findDomRefAtPos(from, view.domAtPos.bind(view)), popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, autoFocus: true, placeholder: formatMessage(messages.linkPlaceholder), onSubmit: addLink, onBlur: hideToolbar }));
    };
    return InsertLinkToolbar;
}(React.PureComponent));
export { InsertLinkToolbar };
export var InsertLinkToolbarWithIntl = injectIntl(InsertLinkToolbar);
var ActivityPoweredInsertLinkToolbar = /** @class */ (function (_super) {
    tslib_1.__extends(ActivityPoweredInsertLinkToolbar, _super);
    function ActivityPoweredInsertLinkToolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActivityPoweredInsertLinkToolbar.prototype.render = function () {
        var _a = this.props, from = _a.from, to = _a.to, view = _a.view, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, activityProvider = _a.activityProvider, formatMessage = _a.intl.formatMessage;
        var hideToolbar = function () {
            return hideLinkToolbar()(view.state, view.dispatch) && view.focus();
        };
        var addLink = function (href, text) {
            return insertLink(from, to, href, text)(view.state, view.dispatch) &&
                view.focus();
        };
        return (React.createElement(RecentSearch, { target: findDomRefAtPos(from, view.domAtPos.bind(view)), popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, autoFocus: true, activityProvider: activityProvider, placeholder: formatMessage(messages.linkPlaceholderWithSearch), onSubmit: addLink, onBlur: hideToolbar }));
    };
    return ActivityPoweredInsertLinkToolbar;
}(React.PureComponent));
export { ActivityPoweredInsertLinkToolbar };
export var ActivityPoweredInsertLinkToolbarWithIntl = injectIntl(ActivityPoweredInsertLinkToolbar);
export default function HyperlinkToolbar(props) {
    var hyperlinkState = props.hyperlinkState, view = props.view, popupsMountPoint = props.popupsMountPoint, popupsBoundariesElement = props.popupsBoundariesElement, activityProvider = props.activityProvider;
    if (hyperlinkState && hyperlinkState.activeLinkMark) {
        if (hyperlinkState.activeLinkMark.type === InsertStatus.EDIT_LINK_TOOLBAR) {
            var _a = hyperlinkState.activeLinkMark, node = _a.node, pos = _a.pos;
            var mark = view.state.schema.marks.link.isInSet(node.marks);
            var isLinkTextTheSameAsTheLinkUrl = mark.attrs.href === normalizeUrl(node.text);
            var Toolbar = isLinkTextTheSameAsTheLinkUrl
                ? AddDisplayTextToolbarWithIntl
                : EditLinkHrefToolbarWithIntl;
            return (React.createElement(Toolbar, { pos: pos, node: node, view: view, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement }));
        }
        else if (hyperlinkState.activeLinkMark.type === InsertStatus.INSERT_LINK_TOOLBAR) {
            var _b = hyperlinkState.activeLinkMark, from = _b.from, to = _b.to;
            if (activityProvider) {
                return (React.createElement(ActivityPoweredInsertLinkToolbarWithIntl, { from: from, to: to, view: view, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, activityProvider: activityProvider }));
            }
            else {
                return (React.createElement(InsertLinkToolbarWithIntl, { from: from, to: to, view: view, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement }));
            }
        }
    }
    return null;
}
//# sourceMappingURL=index.js.map