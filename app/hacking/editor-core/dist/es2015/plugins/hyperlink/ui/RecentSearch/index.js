import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import { analyticsService } from '../../../../analytics';
import PanelTextInput from '../../../../ui/PanelTextInput';
import RecentList from './RecentList';
import { FloatingToolbar } from '../styles';
import { getNearestNonTextNode } from '../../../../ui/FloatingToolbar';
var Container = styled.span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  width: 420px;\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n"], ["\n  width: 420px;\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n"])));
var RecentSearch = /** @class */ (function (_super) {
    tslib_1.__extends(RecentSearch, _super);
    function RecentSearch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            selectedIndex: -1,
            isLoading: false,
            text: '',
            items: [],
        };
        _this.updateInput = function (input) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f;
            return tslib_1.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        this.setState({ text: input });
                        if (!this.state.activityProvider) return [3 /*break*/, 4];
                        if (!(input.length === 0)) return [3 /*break*/, 2];
                        _a = this.setState;
                        _b = {};
                        _c = limit;
                        return [4 /*yield*/, this.state.activityProvider.getRecentItems()];
                    case 1:
                        _a.apply(this, [(_b.items = _c.apply(void 0, [_g.sent()]),
                                _b.selectedIndex = -1,
                                _b)]);
                        return [3 /*break*/, 4];
                    case 2:
                        _d = this.setState;
                        _e = {};
                        _f = limit;
                        return [4 /*yield*/, this.state.activityProvider.searchRecent(input)];
                    case 3:
                        _d.apply(this, [(_e.items = _f.apply(void 0, [_g.sent()]),
                                _e.selectedIndex = 0,
                                _e)]);
                        _g.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.handleSelected = function (href, text) {
            if (_this.props.onSubmit) {
                _this.props.onSubmit(href, text);
                _this.trackAutoCompleteAnalyticsEvent('atlassian.editor.format.hyperlink.autocomplete.click');
            }
        };
        _this.handleMouseMove = function (objectId) {
            var items = _this.state.items;
            if (items) {
                var index = findIndex(items, function (item) { return item.objectId === objectId; });
                _this.setState({
                    selectedIndex: index,
                });
            }
        };
        _this.handleSubmit = function () {
            var _a = _this.state, items = _a.items, text = _a.text, selectedIndex = _a.selectedIndex;
            // add the link selected in the dropdown if there is one, otherwise submit the value of the input field
            if (items && items.length > 0 && selectedIndex > -1) {
                var item = items[selectedIndex];
                if (_this.props.onSubmit) {
                    _this.props.onSubmit(item.url, item.name);
                    _this.trackAutoCompleteAnalyticsEvent('atlassian.editor.format.hyperlink.autocomplete.keyboard');
                }
            }
            else if (text && text.length > 0) {
                if (_this.props.onSubmit) {
                    _this.props.onSubmit(text);
                    _this.trackAutoCompleteAnalyticsEvent('atlassian.editor.format.hyperlink.autocomplete.notselected');
                }
            }
        };
        _this.handleKeyDown = function (e) {
            var _a = _this.state, items = _a.items, selectedIndex = _a.selectedIndex;
            if (!items || !items.length) {
                return;
            }
            if (e.keyCode === 40) {
                // down
                e.preventDefault();
                _this.setState({
                    selectedIndex: (selectedIndex + 1) % items.length,
                });
            }
            else if (e.keyCode === 38) {
                // up
                e.preventDefault();
                _this.setState({
                    selectedIndex: selectedIndex > 0 ? selectedIndex - 1 : items.length - 1,
                });
            }
        };
        _this.handleBlur = function () {
            if (_this.props.onBlur) {
                _this.props.onBlur(_this.state.text);
            }
        };
        return _this;
    }
    RecentSearch.prototype.resolveProvider = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var activityProvider;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.activityProvider];
                    case 1:
                        activityProvider = _a.sent();
                        this.setState({ activityProvider: activityProvider });
                        return [2 /*return*/, activityProvider];
                }
            });
        });
    };
    RecentSearch.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var activityProvider;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resolveProvider()];
                    case 1:
                        activityProvider = _a.sent();
                        this.loadRecentItems(activityProvider);
                        return [2 /*return*/];
                }
            });
        });
    };
    RecentSearch.prototype.loadRecentItems = function (activityProvider) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, , 2, 3]);
                        this.setState({ isLoading: true });
                        _a = this.setState;
                        _b = {};
                        _c = limit;
                        return [4 /*yield*/, activityProvider.getRecentItems()];
                    case 1:
                        _a.apply(this, [(_b.items = _c.apply(void 0, [_d.sent()]), _b)]);
                        return [3 /*break*/, 3];
                    case 2:
                        this.setState({ isLoading: false });
                        return [7 /*endfinally*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RecentSearch.prototype.render = function () {
        var _a = this.props, target = _a.target, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, placeholder = _a.placeholder;
        var _b = this.state, items = _b.items, isLoading = _b.isLoading, selectedIndex = _b.selectedIndex;
        return (React.createElement(FloatingToolbar, { target: getNearestNonTextNode(target), popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, fitWidth: 420, fitHeight: 350, zIndex: 500, offset: [0, 12], className: "recent-search" },
            React.createElement(Container, null,
                React.createElement(PanelTextInput, { placeholder: placeholder, autoFocus: true, onSubmit: this.handleSubmit, onChange: this.updateInput, onBlur: this.handleBlur, onCancel: this.handleBlur, onKeyDown: this.handleKeyDown }),
                React.createElement(RecentList, { items: items, isLoading: isLoading, selectedIndex: selectedIndex, onSelect: this.handleSelected, onMouseMove: this.handleMouseMove }))));
    };
    RecentSearch.prototype.trackAutoCompleteAnalyticsEvent = function (name) {
        var numChars = this.state.text ? this.state.text.length : 0;
        analyticsService.trackEvent(name, { numChars: numChars });
    };
    return RecentSearch;
}(PureComponent));
export default RecentSearch;
var findIndex = function (array, predicate) {
    var index = -1;
    array.some(function (item, i) {
        if (predicate(item)) {
            index = i;
            return true;
        }
        return false;
    });
    return index;
};
var limit = function (items) {
    return items.slice(0, 5);
};
var templateObject_1;
//# sourceMappingURL=index.js.map