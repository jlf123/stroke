"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commands_1 = require("../../../commands");
/**
 * Iterates over the commands one after the other,
 * passes the tr through and dispatches the cumulated transaction
 */
exports.cascadeCommands = function (cmds) { return function (state, dispatch) {
    var baseTr = state.tr;
    var shouldDispatch = false;
    var onDispatchAction = function (tr) {
        tr.steps.forEach(function (st) {
            baseTr.step(st);
        });
        shouldDispatch = true;
    };
    cmds.forEach(function (cmd) {
        cmd(state, onDispatchAction);
    });
    if (dispatch && shouldDispatch) {
        dispatch(baseTr);
        return true;
    }
    return false;
}; };
exports.isAlignable = function (align) { return function (state, dispatch) {
    var _a = state.schema, _b = _a.nodes, paragraph = _b.paragraph, heading = _b.heading, alignment = _a.marks.alignment;
    return commands_1.toggleBlockMark(alignment, function () { return (!align ? undefined : align === 'start' ? false : { align: align }); }, [paragraph, heading])(state, dispatch);
}; };
exports.changeAlignment = function (align) { return function (state, dispatch) {
    var _a = state.schema, _b = _a.nodes, paragraph = _b.paragraph, heading = _b.heading, alignment = _a.marks.alignment;
    return exports.cascadeCommands([
        commands_1.changeImageAlignment(align),
        commands_1.toggleBlockMark(alignment, function () { return (!align ? undefined : align === 'start' ? false : { align: align }); }, [paragraph, heading]),
    ])(state, dispatch);
}; };
//# sourceMappingURL=index.js.map