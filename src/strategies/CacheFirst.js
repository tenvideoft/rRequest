/**
 *@author   tonicli
 *@date     2016/6/9
 */
define(function (require, exports, module) {
'use strict';
var reqCache = require('../reqCache'),
    util = require('../util'),
    Response = require('../Response');

function CacheFirst(cacheKey) {
    this._cacheKey = cacheKey;
}
CacheFirst.prototype = {
    _cacheKey: '',
    request: function (url, options) {
        var $defer = $.Deferred(),
            res = reqCache.request(this._cacheKey);
    
        if (res != null && !res.isExpire()) {
            $defer.resolve(res);
        } else {
            options.url = url;
            $.ajax(options).done(function (data) {
                $defer.resolve(Response.create(data));
            }).fail(function () {
                if (res != null) {
                    $defer.resolve(res);
                } else {
                    $defer.reject.appy($defer, util.args2Array(arguments));
                }
            });
        }

        return $defer.promise();
    }
};
module.exports = CacheFirst;
})
