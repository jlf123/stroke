"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Direction;
(function (Direction) {
    Direction["UP"] = "up";
    Direction["RIGHT"] = "right";
    Direction["DOWN"] = "down";
    Direction["LEFT"] = "left";
    Direction["BACKWARD"] = "backward";
    Direction["FORWARD"] = "forward";
})(Direction = exports.Direction || (exports.Direction = {}));
function isBackward(dir) {
    return [Direction.UP, Direction.LEFT, Direction.BACKWARD].indexOf(dir) !== -1;
}
exports.isBackward = isBackward;
function isForward(dir) {
    return ([Direction.RIGHT, Direction.DOWN, Direction.FORWARD].indexOf(dir) !== -1);
}
exports.isForward = isForward;
function toString(dir) {
    return Direction[dir];
}
exports.toString = toString;
//# sourceMappingURL=direction.js.map