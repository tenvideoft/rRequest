/**
 *@author   tonicli
 *@date     2016/6/10
 */
define(function (require, exports, module) {
'use strict';
var reqCache = require('../reqCache'),
    util = require('../util'),
    Response = require('../Response');

function NetworkFirst(cacheKey) {
    this._cacheKey = cacheKey;
}
NetworkFirst.prototype = {
    _cacheKey: '',
    request: function (url, options) {
        var $defer = $.Deferred(),
            that = this;

        options.url = url;
        $.ajax(options).done(function (data) {
            $defer.resolve(Response.create(data));
        }).fail(function () {
            var res = reqCache.request(that._cacheKey);
            if (res != null) {
                $defer.resolve(res);
            } else {
                $defer.reject.apply($defer, util.args2Array(arguments));
            }
        });

        return $defer.promise();
    }
};
module.exports = NetworkFirst;
})
