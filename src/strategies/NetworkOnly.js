/**
 *@author   tonicli
 *@date     2016/6/10
 */
define(function (require, exports, module) {
'use strict';
var reqCache = require('../reqCache'),
    util = require('../util'),
    Response = require('../Response');

function NetworkOnly() {

}
NetworkOnly.prototype = {
    request: function (url, options) {
        var $defer = $.Deferred();

        options.url = url;
        $.ajax(options).done(function (data) {
            $defer.resolve(Response.create(data));
        }).fail(function () {
            $defer.reject.apply($defer, util.args2Array(arguments));
        });

        return $defer.promise();
    }
};
module.exports = NetworkOnly;
})
