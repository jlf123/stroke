"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_model_1 = require("prosemirror-model");
var adf_schema_1 = require("@atlaskit/adf-schema");
var editor_common_1 = require("@atlaskit/editor-common");
var analytics_1 = require("../analytics");
var version_1 = require("../version");
var rank_1 = require("../plugins/rank");
function sortByRank(a, b) {
    return a.rank - b.rank;
}
exports.sortByRank = sortByRank;
function sortByOrder(item) {
    return function (a, b) {
        return rank_1.default[item].indexOf(a.name) - rank_1.default[item].indexOf(b.name);
    };
}
function fixExcludes(marks) {
    var markKeys = Object.keys(marks);
    var markGroups = new Set(markKeys.map(function (mark) { return marks[mark].group; }));
    markKeys.map(function (markKey) {
        var mark = marks[markKey];
        if (mark.excludes) {
            mark.excludes = mark.excludes
                .split(' ')
                .filter(function (group) { return markGroups.has(group); })
                .join(' ');
        }
    });
    return marks;
}
exports.fixExcludes = fixExcludes;
function processPluginsList(plugins, editorProps) {
    /**
     * First pass to collect pluginsOptions
     */
    var pluginsOptions = plugins.reduce(function (acc, plugin) {
        if (plugin.pluginsOptions) {
            Object.keys(plugin.pluginsOptions).forEach(function (pluginName) {
                if (!acc[pluginName]) {
                    acc[pluginName] = [];
                }
                acc[pluginName].push(plugin.pluginsOptions[pluginName]);
            });
        }
        return acc;
    }, {});
    /**
     * Process plugins
     */
    return plugins.reduce(function (acc, plugin) {
        var _a, _b, _c;
        if (plugin.pmPlugins) {
            (_a = acc.pmPlugins).push.apply(_a, tslib_1.__spread(plugin.pmPlugins(plugin.name ? pluginsOptions[plugin.name] : undefined)));
        }
        if (plugin.nodes) {
            (_b = acc.nodes).push.apply(_b, tslib_1.__spread(plugin.nodes(editorProps)));
        }
        if (plugin.marks) {
            (_c = acc.marks).push.apply(_c, tslib_1.__spread(plugin.marks(editorProps)));
        }
        if (plugin.contentComponent) {
            acc.contentComponents.push(plugin.contentComponent);
        }
        if (plugin.primaryToolbarComponent) {
            acc.primaryToolbarComponents.push(plugin.primaryToolbarComponent);
        }
        if (plugin.secondaryToolbarComponent) {
            acc.secondaryToolbarComponents.push(plugin.secondaryToolbarComponent);
        }
        return acc;
    }, {
        nodes: [],
        marks: [],
        pmPlugins: [],
        contentComponents: [],
        primaryToolbarComponents: [],
        secondaryToolbarComponents: [],
    });
}
exports.processPluginsList = processPluginsList;
function createSchema(editorConfig) {
    var marks = fixExcludes(editorConfig.marks.sort(sortByOrder('marks')).reduce(function (acc, mark) {
        acc[mark.name] = mark.mark;
        return acc;
    }, {}));
    var nodes = adf_schema_1.sanitizeNodes(editorConfig.nodes.sort(sortByOrder('nodes')).reduce(function (acc, node) {
        acc[node.name] = node.node;
        return acc;
    }, {}), marks);
    return new prosemirror_model_1.Schema({ nodes: nodes, marks: marks });
}
exports.createSchema = createSchema;
function createPMPlugins(_a) {
    var editorConfig = _a.editorConfig, schema = _a.schema, props = _a.props, dispatch = _a.dispatch, eventDispatcher = _a.eventDispatcher, providerFactory = _a.providerFactory, errorReporter = _a.errorReporter, portalProviderAPI = _a.portalProviderAPI, reactContext = _a.reactContext;
    return editorConfig.pmPlugins
        .sort(sortByOrder('plugins'))
        .map(function (_a) {
        var plugin = _a.plugin;
        return plugin({
            schema: schema,
            props: props,
            dispatch: dispatch,
            providerFactory: providerFactory,
            errorReporter: errorReporter,
            eventDispatcher: eventDispatcher,
            portalProviderAPI: portalProviderAPI,
            reactContext: reactContext,
        });
    })
        .filter(function (plugin) { return !!plugin; });
}
exports.createPMPlugins = createPMPlugins;
function createErrorReporter(errorReporterHandler) {
    var errorReporter = new editor_common_1.ErrorReporter();
    if (errorReporterHandler) {
        errorReporter.handler = errorReporterHandler;
    }
    return errorReporter;
}
exports.createErrorReporter = createErrorReporter;
function initAnalytics(analyticsHandler) {
    analytics_1.analyticsService.handler = analyticsHandler || (function () { });
    analytics_1.analyticsService.trackEvent('atlassian.editor.start', {
        name: version_1.name,
        version: version_1.version,
    });
}
exports.initAnalytics = initAnalytics;
//# sourceMappingURL=create-editor.js.map