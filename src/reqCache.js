/**
 *@author   tonicli
 *@date     2016/6/9
 */
define(function (require, exports, module) {
'use strict';
var Response = require('./Response');

var _storage = localStorage;
function _reqCache(key) {
    var content,
        data = null,
        res;

    if (!_storage) {
        return null;
    }
    content = _storage.getItem(key);
    if (!content) {
        return null;
    }
    try {
        data = JSON.parse(content);
    } catch (e) {
        console.warn('[rRequest.reqCache._reqCache]invalid json format', content);
    }
    if (Response.isValid(data)) {
        res = new Response(data);
        res.setIsCache(true);
        return res;
    }
    return null;
}

exports.request = _reqCache;
});
