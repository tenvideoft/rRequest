/**
 *@author   tonicli
 *@date     2016/6/5
 */
define(function (require, exports, module) {
'use strict';
var urlBuilder = require('./url'),
    md5 = require('./md5'),
    util = require('./util'),
    CacheFirst = require('./strategies/CacheFirst'),
    NetworkFirst = require('./strategies/NetworkFirst'),
    NetworkOnly = require('./strategies/NetworkOnly');

var NETWORK_ONLY = 1,
    NETWORK_FIRST = 2,
    CACHE_FIRST = 3,
    _defaultSettings = {
        cache: true,
        strategy: CACHE_FIRST,
        maxAge: 5000
    },
    _storage = localStorage;

/**
 *@return Promise
 *settings: {
 *cacheKey: 'xx'[default md5(url+params)],
 *strategy: NETWORK_ONLY | CACHE_FIRST | NETWORK_FIRST
 *cache: true|false
 *}
 */
function _request(url, options, cacheSettings) {
    var args = arguments,
        cacheKey,
        reqStrategy,
        $defer = $.Deferred(),
        res;

    if (util.isObject(args[0]) && args.length < 3) {
        cacheSettings = args[1];
        options = args[0];
        url = options.url;
    }
    cacheSettings = $.extend({}, _defaultSettings, cacheSettings || {});
    options = options || {};
    cacheKey = cacheSettings.cacheKey || _genCacheKey(url, options.data),
    options.url = url;
    switch (cacheSettings.strategy) {
        case CACHE_FIRST:
            reqStrategy = new CacheFirst(cacheKey);
            break;
        case NETWORK_FIRST:
            reqStrategy = new NetworkFirst(cacheKey);
            break;
        case NETWORK_ONLY:
        default:
            reqStrategy = new NetworkOnly();
    }
    reqStrategy.request(url, options).done(function (res) {
        $defer.resolve(res.getData());
        if (cacheSettings.cache && !res.isCache()) {
            res.store(cacheKey, cacheSettings.maxAge);
        }
    }).fail(function () {
        $defer.reject.apply($defer, util.args2Array(arguments));
    });

    return $defer.promise();
}
function _genCacheKey(url, params) {
    return md5(urlBuilder.buildUrl(url, params));
}

module.exports = {
    request: _request,
    CACHE_FIRST: CACHE_FIRST,
    NETWORK_FIRST: NETWORK_FIRST,
    NETWORK_ONLY: NETWORK_ONLY
};
});
