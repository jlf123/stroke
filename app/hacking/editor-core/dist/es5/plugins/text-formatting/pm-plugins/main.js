"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_commands_1 = require("prosemirror-commands");
var prosemirror_state_1 = require("prosemirror-state");
var utils_1 = require("../utils");
var text_formatting_1 = require("../commands/text-formatting");
var keymaps = require("../../../keymaps");
var commands = require("../commands/text-formatting");
exports.pluginKey = new prosemirror_state_1.PluginKey('textFormatting');
var getTextFormattingState = function (editorState) {
    var _a = editorState.schema.marks, em = _a.em, code = _a.code, strike = _a.strike, strong = _a.strong, subsup = _a.subsup, underline = _a.underline;
    var state = {};
    if (code) {
        state.codeActive = utils_1.markActive(editorState, code.create());
        state.codeDisabled = !prosemirror_commands_1.toggleMark(code)(editorState);
    }
    if (em) {
        state.emActive = utils_1.anyMarkActive(editorState, em);
        state.emDisabled = state.codeActive ? true : !prosemirror_commands_1.toggleMark(em)(editorState);
    }
    if (strike) {
        state.strikeActive = utils_1.anyMarkActive(editorState, strike);
        state.strikeDisabled = state.codeActive
            ? true
            : !prosemirror_commands_1.toggleMark(strike)(editorState);
    }
    if (strong) {
        state.strongActive = utils_1.anyMarkActive(editorState, strong);
        state.strongDisabled = state.codeActive
            ? true
            : !prosemirror_commands_1.toggleMark(strong)(editorState);
    }
    if (subsup) {
        var subMark = subsup.create({ type: 'sub' });
        var supMark = subsup.create({ type: 'sup' });
        state.subscriptActive = utils_1.markActive(editorState, subMark);
        state.subscriptDisabled = state.codeActive
            ? true
            : !prosemirror_commands_1.toggleMark(subsup, { type: 'sub' })(editorState);
        state.superscriptActive = utils_1.markActive(editorState, supMark);
        state.superscriptDisabled = state.codeActive
            ? true
            : !prosemirror_commands_1.toggleMark(subsup, { type: 'sup' })(editorState);
    }
    if (underline) {
        state.underlineActive = utils_1.anyMarkActive(editorState, underline);
        state.underlineDisabled = state.codeActive
            ? true
            : !prosemirror_commands_1.toggleMark(underline)(editorState);
    }
    return state;
};
exports.plugin = function (dispatch) {
    return new prosemirror_state_1.Plugin({
        state: {
            init: function (config, state) {
                return getTextFormattingState(state);
            },
            apply: function (tr, pluginState, oldState, newState) {
                var state = getTextFormattingState(newState);
                if (!utils_1.deepEqual(pluginState, state)) {
                    dispatch(exports.pluginKey, state);
                    return state;
                }
                return pluginState;
            },
        },
        key: exports.pluginKey,
        props: {
            handleKeyDown: function (view, event) {
                var state = view.state, dispatch = view.dispatch;
                if (event.key === keymaps.moveRight.common) {
                    return commands.moveRight()(state, dispatch);
                }
                else if (event.key === keymaps.moveLeft.common) {
                    return commands.moveLeft(view)(state, dispatch);
                }
                else if (event.key === keymaps.backspace.common) {
                    return commands.removeIgnoredNodes(view)(state, dispatch);
                }
                return false;
            },
            handleTextInput: function (view, from, to, text) {
                var state = view.state, dispatch = view.dispatch;
                return text_formatting_1.createInlineCodeFromTextInput(from, to, text)(state, dispatch);
            },
        },
    });
};
//# sourceMappingURL=main.js.map