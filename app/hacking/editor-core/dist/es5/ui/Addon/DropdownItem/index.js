"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles_1 = require("./styles");
var DropdownItemWrapper = function (props) { return (React.createElement(styles_1.DropdownItem, { onClick: function () {
        return props.onClick &&
            props.onClick({
                actionOnClick: props.actionOnClick,
                renderOnClick: props.renderOnClick,
            });
    } },
    React.createElement("span", null, props.icon),
    props.children)); };
exports.default = DropdownItemWrapper;
//# sourceMappingURL=index.js.map