"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var select_1 = require("@atlaskit/select");
var SelectWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  width: ", "px;\n"], ["\n  width: ", "px;\n"])), function (props) { return props.width; });
var Search = /** @class */ (function (_super) {
    tslib_1.__extends(Search, _super);
    function Search() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { isOpen: false };
        return _this;
    }
    Search.prototype.render = function () {
        var _a = this.props, options = _a.options, onChange = _a.onChange, defaultValue = _a.defaultValue, placeholder = _a.placeholder, _b = _a.width, width = _b === void 0 ? 200 : _b;
        return (React.createElement(SelectWrapper, { width: width },
            React.createElement(select_1.default, { options: options, value: defaultValue, onChange: onChange, placeholder: placeholder, spacing: 'compact', menuPlacement: "auto" })));
    };
    return Search;
}(react_1.Component));
exports.default = Search;
var templateObject_1;
//# sourceMappingURL=Select.js.map