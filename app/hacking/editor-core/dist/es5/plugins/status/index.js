"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var adf_schema_1 = require("@atlaskit/adf-schema");
var label_1 = require("@atlaskit/icon/glyph/label");
var prosemirror_utils_1 = require("prosemirror-utils");
var plugin_1 = require("./plugin");
var WithPluginState_1 = require("../../ui/WithPluginState");
var statusPicker_1 = require("./ui/statusPicker");
var actions_1 = require("./actions");
var baseStatusPlugin = function () { return ({
    nodes: function () {
        return [{ name: 'status', node: adf_schema_1.status }];
    },
    pmPlugins: function () {
        return [
            {
                name: 'status',
                plugin: plugin_1.default,
            },
        ];
    },
    contentComponent: function (_a) {
        var editorView = _a.editorView;
        var domAtPos = editorView.domAtPos.bind(editorView);
        return (React.createElement(WithPluginState_1.default, { plugins: {
                statusState: plugin_1.pluginKey,
            }, render: function (_a) {
                var _b = _a.statusState, statusState = _b === void 0 ? {} : _b;
                var showStatusPickerAt = statusState.showStatusPickerAt;
                if (showStatusPickerAt === null) {
                    return null;
                }
                var target = prosemirror_utils_1.findDomRefAtPos(showStatusPickerAt, domAtPos);
                var statusNode = editorView.state.doc.nodeAt(showStatusPickerAt);
                if (!statusNode || statusNode.type.name !== 'status') {
                    return null;
                }
                var _c = statusNode.attrs, text = _c.text, color = _c.color, localId = _c.localId;
                return (React.createElement(statusPicker_1.default, { autoFocus: statusState.autoFocus, target: target, defaultText: text, defaultColor: color, defaultLocalId: localId, onSelect: function (status) {
                        actions_1.updateStatus(status)(editorView);
                    }, onTextChanged: function (status) {
                        actions_1.updateStatus(status)(editorView);
                    }, closeStatusPicker: function () {
                        actions_1.commitStatusPicker()(editorView);
                    }, onEnter: function () {
                        actions_1.commitStatusPicker()(editorView);
                    } }));
            } }));
    },
}); };
var createQuickInsertMenuItem = function () { return ({
    title: 'Status',
    priority: 700,
    keywords: ['lozenge'],
    icon: function () { return React.createElement(label_1.default, { label: "Status" }); },
    action: actions_1.createStatus(),
}); };
var decorateWithPluginOptions = function (plugin, options) {
    if (options.menuDisabled === true) {
        return plugin;
    }
    plugin.pluginsOptions = {
        quickInsert: [createQuickInsertMenuItem()],
    };
    return plugin;
};
var statusPlugin = function (options) {
    return decorateWithPluginOptions(baseStatusPlugin(), options);
};
exports.default = statusPlugin;
//# sourceMappingURL=index.js.map