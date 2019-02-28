"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mention_1 = require("@atlaskit/mention");
var package_json_1 = require("../../../package.json");
var componentName = 'mention';
exports.buildAnalyticsPayload = function (actionSubject, action, eventType, sessionId, otherAttributes) {
    if (otherAttributes === void 0) { otherAttributes = {}; }
    return ({
        action: action,
        actionSubject: actionSubject,
        eventType: eventType,
        attributes: tslib_1.__assign({ packageName: package_json_1.name,
            packageVersion: package_json_1.version,
            componentName: componentName,
            sessionId: sessionId }, otherAttributes),
        source: 'unknown',
    });
};
var emptyQueryResponse = {
    queryLength: 0,
    spaceInQuery: false,
};
var extractAttributesFromQuery = function (query) {
    if (query) {
        return {
            queryLength: query.length,
            spaceInQuery: query.indexOf(' ') !== -1,
        };
    }
    return emptyQueryResponse;
};
exports.buildTypeAheadCancelPayload = function (duration, upKeyCount, downKeyCount, sessionId, query) {
    var _a = extractAttributesFromQuery(query), queryLength = _a.queryLength, spaceInQuery = _a.spaceInQuery;
    return exports.buildAnalyticsPayload('mentionTypeahead', 'cancelled', 'ui', sessionId, {
        duration: duration,
        downKeyCount: downKeyCount,
        upKeyCount: upKeyCount,
        queryLength: queryLength,
        spaceInQuery: spaceInQuery,
    });
};
var getPosition = function (mentionList, selectedMention) {
    if (mentionList) {
        var index = mentionList.findIndex(function (mention) { return mention.id === selectedMention.id; });
        return index === -1 ? undefined : index;
    }
    return;
};
var isClicked = function (insertType) { return insertType === 'selected'; };
exports.buildTypeAheadInsertedPayload = function (duration, upKeyCount, downKeyCount, sessionId, insertType, mention, mentionList, query) {
    var _a = extractAttributesFromQuery(query), queryLength = _a.queryLength, spaceInQuery = _a.spaceInQuery;
    return exports.buildAnalyticsPayload('mentionTypeahead', isClicked(insertType) ? 'clicked' : 'pressed', 'ui', sessionId, {
        duration: duration,
        position: getPosition(mentionList, mention),
        keyboardKey: isClicked(insertType) ? undefined : insertType,
        queryLength: queryLength,
        spaceInQuery: spaceInQuery,
        isSpecial: mention_1.isSpecialMention(mention),
        accessLevel: mention.accessLevel || '',
        userType: mention.userType,
        userId: mention.id,
        upKeyCount: upKeyCount,
        downKeyCount: downKeyCount,
    });
};
exports.buildTypeAheadRenderedPayload = function (duration, userIds, query) {
    var _a = extractAttributesFromQuery(query), queryLength = _a.queryLength, spaceInQuery = _a.spaceInQuery;
    return {
        action: 'rendered',
        actionSubject: 'mentionTypeAhead',
        eventType: 'ui',
        attributes: {
            packageName: package_json_1.name,
            packageVersion: package_json_1.version,
            componentName: componentName,
            duration: duration,
            userIds: userIds,
            query: query,
            queryLength: queryLength,
            spaceInQuery: spaceInQuery,
        },
    };
};
//# sourceMappingURL=analytics.js.map