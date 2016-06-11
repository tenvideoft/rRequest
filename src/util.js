/**
 *@author   tonicli
 *@date     2016/6/5
 */
define(function (require, exports, module) {
'use strict';
function _toString(v) {
    return Object.prototype.toString.call(v);
}
function _args2Array(args) {
    return Array.prototype.slice.call(args);
}

module.exports = {
    isFunc: function (v) {
        return _toString(v) == '[object Function]';
    },
    isDate: function (v) {
        return _toString(v) == '[object Date]';
    },
    isObject: function (v) {
        return _toString(v) == '[object Object]';
    },
    trim: function (v) {
        return v.replace(/^\s+|\s+$/g, '');
    },
    mix: function (dest, source) {

    },
    args2Array: _args2Array,
    arraylize: function () {
        return Array.prototype.concat.apply([], _args2Array(arguments));
    }
};
});
