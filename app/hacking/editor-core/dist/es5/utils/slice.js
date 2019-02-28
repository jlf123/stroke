"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var prosemirror_model_1 = require("prosemirror-model");
/**
 * A helper to get the underlying array of a fragment.
 */
function getFragmentBackingArray(fragment) {
    return fragment.content;
}
exports.getFragmentBackingArray = getFragmentBackingArray;
function mapFragment(content, callback, parent) {
    if (parent === void 0) { parent = null; }
    var children = [];
    for (var i = 0, size = content.childCount; i < size; i++) {
        var node = content.child(i);
        var transformed = node.isLeaf
            ? callback(node, parent, i)
            : callback(node.copy(mapFragment(node.content, callback, node)), parent, i);
        if (transformed) {
            if (transformed instanceof prosemirror_model_1.Fragment) {
                children.push.apply(children, tslib_1.__spread(getFragmentBackingArray(transformed)));
            }
            else if (Array.isArray(transformed)) {
                children.push.apply(children, tslib_1.__spread(transformed));
            }
            else {
                children.push(transformed);
            }
        }
    }
    return prosemirror_model_1.Fragment.fromArray(children);
}
exports.mapFragment = mapFragment;
function mapSlice(slice, callback) {
    var fragment = mapFragment(slice.content, callback);
    return new prosemirror_model_1.Slice(fragment, slice.openStart, slice.openEnd);
}
exports.mapSlice = mapSlice;
function flatmap(fragment, callback) {
    var fragmentContent = [];
    for (var i = 0; i < fragment.childCount; i++) {
        var child = callback(fragment.child(i), i, fragment);
        if (Array.isArray(child)) {
            fragmentContent.push.apply(fragmentContent, tslib_1.__spread(child));
        }
        else {
            fragmentContent.push(child);
        }
    }
    return prosemirror_model_1.Fragment.fromArray(fragmentContent);
}
exports.flatmap = flatmap;
function mapChildren(node, callback) {
    var array = [];
    for (var i = 0; i < node.childCount; i++) {
        array.push(callback(node.child(i), i, node.content));
    }
    return array;
}
exports.mapChildren = mapChildren;
//# sourceMappingURL=slice.js.map