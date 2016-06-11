/**
 *@author   tonicli
 *@date     2016/6/8
 */
define(function (require, exports, module) {
'use strict';
var util = require('./util');
var _storage = localStorage;

function Response(data) {
    if (!Response.isValid(data)) {
        throw new Error('[Response.constructor]invalid response data format');
    }
    this._data = data;
}
Response.prototype = {
    _data: null,
    _isCache: false,
    isExpire: function () {
        if (this._data.maxAge < 0) {
            return false;
        }
        return Date.now() > this._data.timestamp + this._data.maxAge;
    },
    isCache: function () {
        return this._isCache;
    },
    setIsCache: function (isCache) {
        this._isCache = isCache;
    },
    getData: function () {
        return this._data.data;
    },
    store: function (key, maxAge) {
        if (!_storage) {
            console.warn('[rRquest.Response.store]your browser does not support localStorage');
            return false;
        }
        this._data.maxAge = maxAge;
        _storage.setItem(key, this.serialize());
    },
    serialize: function () {
        return JSON.stringify(this._data);
    }
};
Response.isValid = function (res) {
    if (util.isObject(res) && res.hasOwnProperty('timestamp') && res.hasOwnProperty('data')) {
        return true;
    }
    return false;
};
Response.create = function (data) {
    return new Response({
        timestamp: Date.now(),
        data: data
    });
}

module.exports = Response;
})
