"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_inputrules_1 = require("prosemirror-inputrules");
var prosemirror_state_1 = require("prosemirror-state");
var input_rules_1 = require("../../../utils/input-rules");
var utils_1 = require("../../../utils");
var matcher;
function inputRulePlugin(schema, providerFactory) {
    if (schema.nodes.emoji && providerFactory) {
        initMatcher(providerFactory);
        var asciiEmojiRule = input_rules_1.createInputRule(AsciiEmojiMatcher.REGEX, inputRuleHandler);
        return prosemirror_inputrules_1.inputRules({
            rules: [asciiEmojiRule],
        });
    }
}
exports.inputRulePlugin = inputRulePlugin;
function initMatcher(providerFactory) {
    var handleProvider = function (name, provider) {
        if (!provider) {
            return;
        }
        provider.then(function (emojiProvider) {
            emojiProvider.getAsciiMap().then(function (map) {
                matcher = new RecordingAsciiEmojiMatcher(emojiProvider, map);
            });
        });
    };
    providerFactory.subscribe('emojiProvider', handleProvider);
}
function inputRuleHandler(state, matchParts, start, end) {
    if (!matcher) {
        return null;
    }
    if (!isEnabled(state)) {
        return null;
    }
    var match = matcher.match(matchParts);
    if (match) {
        var transactionCreator = new AsciiEmojiTransactionCreator(state, match, start, end);
        return transactionCreator.create();
    }
    return null;
}
function isEnabled(state) {
    var emojiQuery = state.schema.marks.emojiQuery;
    var isEmojiQueryActive = state.selection.$from
        .marks()
        .some(function (mark) { return mark.type === emojiQuery; });
    return (isEmojiQueryActive || utils_1.isMarkTypeAllowedInCurrentSelection(emojiQuery, state));
}
var REGEX_LEADING_CAPTURE_INDEX = 1;
var REGEX_EMOJI_LEADING_PARENTHESES = 2;
var REGEX_EMOJI_ASCII_CAPTURE_INDEX = 3;
var REGEX_TRAILING_CAPTURE_INDEX = 4;
var getLeadingString = function (match, withParenthesis) {
    if (withParenthesis === void 0) { withParenthesis = true; }
    return match[REGEX_LEADING_CAPTURE_INDEX] +
        (withParenthesis ? match[REGEX_EMOJI_LEADING_PARENTHESES] : '');
};
var getLeadingStringWithoutParentheses = function (match) {
    return getLeadingString(match, false);
};
var getAscii = function (match, withParentheses) {
    if (withParentheses === void 0) { withParentheses = false; }
    return (withParentheses ? match[REGEX_EMOJI_LEADING_PARENTHESES] : '') +
        match[REGEX_EMOJI_ASCII_CAPTURE_INDEX].trim();
};
var getAsciiWithParentheses = function (matchParts) {
    return getAscii(matchParts, true);
};
var getTrailingString = function (match) {
    return match[REGEX_TRAILING_CAPTURE_INDEX] || '';
};
var AsciiEmojiMatcher = /** @class */ (function () {
    function AsciiEmojiMatcher(asciiToEmojiMap) {
        this.asciiToEmojiMap = asciiToEmojiMap;
    }
    AsciiEmojiMatcher.prototype.match = function (matchParts) {
        return (this.getAsciiEmojiMatch(getLeadingStringWithoutParentheses(matchParts), getAsciiWithParentheses(matchParts), getTrailingString(matchParts)) ||
            this.getAsciiEmojiMatch(getLeadingString(matchParts), getAscii(matchParts), getTrailingString(matchParts)));
    };
    AsciiEmojiMatcher.prototype.getAsciiEmojiMatch = function (leading, ascii, trailing) {
        var emoji = this.asciiToEmojiMap.get(ascii);
        return emoji
            ? {
                emoji: emoji,
                leadingString: leading,
                trailingString: trailing,
            }
            : undefined;
    };
    /**
     * This regex matches 2 scenarios:
     * 1. an emoticon starting with a colon character (e.g. :D => 😃)
     * 2. an emoticon not starting with a colon character (e.g. 8-D => 😎)
     *
     * Explanation (${leafNodeReplacementCharacter} is replaced with character \ufffc)
     *
     *  1st Capturing Group ((?:^|[\s\ufffc])(?:\(*?))
     *    Non-capturing group (?:^|[\s\ufffc])
     *      1st Alternative ^
     *        ^ asserts position at start of the string
     *      2nd Alternative [\s\ufffc]
     *        matches a single character present in [\s\ufffc]
     *    Non-capturing group (?:\(*?)
     *      matches the character ( literally between zero and unlimited times, as few times as possible, expanding as needed (lazy)
     *  2nd Capturing Group (\(?)
     *    matches a single ( if present
     *  3rd Capturing Group ([^:\s\ufffc\(]\S{1,3}|:\S{1,3}( ))
     *    1st Alternative [^:\s\ufffc\(]\S{1,3}
     *      matches a single character not present in [^:\s\ufffc\(] between 1 and 3 times, as many times as possible, giving back as needed (greedy)
     *    2nd Alternative :\S{1,3}( )
     *      : matches the character : literally
     *      \S{1,3} matches any non-whitespace character between 1 and 3 times, as many times as possible, giving back as needed (greedy)
     *  4th Capturing Group ( )
     *
     * See https://regex101.com/r/HRS9O2/4
     */
    AsciiEmojiMatcher.REGEX = new RegExp("((?:^|[\\s" + input_rules_1.leafNodeReplacementCharacter + "])(?:\\(*?))(\\(?)([^:\\s" + input_rules_1.leafNodeReplacementCharacter + "\\(]\\S{1,3}|:\\S{1,3}( ))$");
    return AsciiEmojiMatcher;
}());
/**
 * A matcher that will record ascii matches as usages of the matched emoji.
 */
var RecordingAsciiEmojiMatcher = /** @class */ (function (_super) {
    tslib_1.__extends(RecordingAsciiEmojiMatcher, _super);
    function RecordingAsciiEmojiMatcher(emojiProvider, asciiToEmojiMap) {
        var _this = _super.call(this, asciiToEmojiMap) || this;
        _this.emojiProvider = emojiProvider;
        return _this;
    }
    RecordingAsciiEmojiMatcher.prototype.match = function (matchParts) {
        var match = _super.prototype.match.call(this, matchParts);
        if (match && this.emojiProvider.recordSelection) {
            this.emojiProvider.recordSelection(match.emoji);
        }
        return match;
    };
    return RecordingAsciiEmojiMatcher;
}(AsciiEmojiMatcher));
var AsciiEmojiTransactionCreator = /** @class */ (function () {
    function AsciiEmojiTransactionCreator(state, match, start, end) {
        this.state = state;
        this.match = match;
        this.start = start;
        this.end = end;
    }
    AsciiEmojiTransactionCreator.prototype.create = function () {
        return this.state.tr.replaceWith(this.from, this.to, this.createNodes());
    };
    Object.defineProperty(AsciiEmojiTransactionCreator.prototype, "from", {
        get: function () {
            return this.start + this.match.leadingString.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AsciiEmojiTransactionCreator.prototype, "to", {
        get: function () {
            return this.end;
        },
        enumerable: true,
        configurable: true
    });
    AsciiEmojiTransactionCreator.prototype.createNodes = function () {
        var nodes = [this.createEmojiNode()];
        if (this.trailingTextNodeRequired()) {
            nodes.push(this.createTrailingTextNode());
        }
        return nodes;
    };
    AsciiEmojiTransactionCreator.prototype.createEmojiNode = function () {
        var emojiTypeNode = this.state.schema.nodes.emoji;
        return emojiTypeNode.create(this.getEmojiNodeAttrs());
    };
    AsciiEmojiTransactionCreator.prototype.getEmojiNodeAttrs = function () {
        var emoji = this.match.emoji;
        return {
            id: emoji.id,
            shortName: emoji.shortName,
            text: emoji.fallback || emoji.shortName,
        };
    };
    AsciiEmojiTransactionCreator.prototype.trailingTextNodeRequired = function () {
        return this.match.trailingString.length > 0;
    };
    AsciiEmojiTransactionCreator.prototype.createTrailingTextNode = function () {
        return this.state.schema.text(this.match.trailingString);
    };
    return AsciiEmojiTransactionCreator;
}());
exports.stateKey = new prosemirror_state_1.PluginKey('asciiEmojiPlugin');
var plugins = function (schema, providerFactory) {
    return [inputRulePlugin(schema, providerFactory)].filter(function (plugin) { return !!plugin; });
};
exports.default = plugins;
//# sourceMappingURL=ascii-input-rules.js.map