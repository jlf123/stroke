import * as tslib_1 from "tslib";
import { isSpecialMention } from '@atlaskit/mention';
import { name as packageName, version as packageVersion, } from '../../../package.json';
var componentName = 'mention';
export var buildAnalyticsPayload = function (actionSubject, action, eventType, sessionId, otherAttributes) {
    if (otherAttributes === void 0) { otherAttributes = {}; }
    return ({
        action: action,
        actionSubject: actionSubject,
        eventType: eventType,
        attributes: tslib_1.__assign({ packageName: packageName,
            packageVersion: packageVersion,
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
export var buildTypeAheadCancelPayload = function (duration, upKeyCount, downKeyCount, sessionId, query) {
    var _a = extractAttributesFromQuery(query), queryLength = _a.queryLength, spaceInQuery = _a.spaceInQuery;
    return buildAnalyticsPayload('mentionTypeahead', 'cancelled', 'ui', sessionId, {
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
export var buildTypeAheadInsertedPayload = function (duration, upKeyCount, downKeyCount, sessionId, insertType, mention, mentionList, query) {
    var _a = extractAttributesFromQuery(query), queryLength = _a.queryLength, spaceInQuery = _a.spaceInQuery;
    return buildAnalyticsPayload('mentionTypeahead', isClicked(insertType) ? 'clicked' : 'pressed', 'ui', sessionId, {
        duration: duration,
        position: getPosition(mentionList, mention),
        keyboardKey: isClicked(insertType) ? undefined : insertType,
        queryLength: queryLength,
        spaceInQuery: spaceInQuery,
        isSpecial: isSpecialMention(mention),
        accessLevel: mention.accessLevel || '',
        userType: mention.userType,
        userId: mention.id,
        upKeyCount: upKeyCount,
        downKeyCount: downKeyCount,
    });
};
export var buildTypeAheadRenderedPayload = function (duration, userIds, query) {
    var _a = extractAttributesFromQuery(query), queryLength = _a.queryLength, spaceInQuery = _a.spaceInQuery;
    return {
        action: 'rendered',
        actionSubject: 'mentionTypeAhead',
        eventType: 'ui',
        attributes: {
            packageName: packageName,
            packageVersion: packageVersion,
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