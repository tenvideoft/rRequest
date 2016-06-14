/**
 *@author   tonicli
 *@date     2016/6/5
 */
define(function (require, exports, module) {
'use strict';
function _toString(v) {
    return Object.prototype.toString.call(v);
}
function _isObject(v) {
    return _toString(v) == '[object Object]';
}
function _trim(v) {
    if (_toString(v) != '[object String]') {
        return v;
    }
    return v.replace(/^\s+|\s+$/g, '');
}
function _buildUrl(url, params, useEncode) {
    var queryStr = '';

    if (!url) {
        throw new Error('[util.url.buildUrl]url is required');
    }
    if (!params || params === null) {
        return url;
    }
    queryStr = _buildParams(params, useEncode);
    if (!queryStr || !queryStr.length) {
        return url;
    }
    return [url , (url.indexOf('?') > -1 ? '&' : '?') , queryStr].join('');
}
function _buildParams(params, useEncode) {
    var k, v, query, r = [];
    for (k in params) {
        v = params[k];
        query = _buildParam(k, v, useEncode);
        if (query != null && query !== '') {
            r.push(query);
        }
    }
    return r.join('&');
}
function _buildParam(k, v, useEncode) {
    var type = typeof v,
        prop,
        i = 0,
        len,
        r = [];

    if (v === '') {
        return '';
    }
    if (type == 'number' || type == 'string' || type == 'boolean') {
        return [k, useEncode ? encodeURIComponent(v) : v].join('=');
    }
    if (_isObject(v)) {
        for (prop in v) {
            r.push(_buildParam([k, '[', prop, ']'].join(''), v[prop], useEncode));
        }
    } else if (Array.isArray(v)) {
        for (len=v.length; i<len; i++) {
            r.push(_buildParam([k, '[', i, ']'].join(''), v[i], useEncode));
        }
    }
    //过滤null, undefined, ''
    r = r.filter(function (item) {
        return (item != null && _trim(item) !== '');
    });
    return r.length ? r.join('&') : '';
}

module.exports = {
    buildUrl: _buildUrl
};
})
