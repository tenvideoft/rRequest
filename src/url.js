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
    var p = '';

    if (!url) {
        throw new Error('[util.url.buildUrl]url is required');
    }
    if (!params || params === null) {
        return url;
    }
    useEncode = useEncode !== undefined ? useEncode : false;
    p = _buildParams(params, useEncode);
    if (!p || !p.length) {
        return url;
    }
    return [url , (url.indexOf('?') > -1 ? '&' : '?') , p].join('');
}
function _buildParams(params, useEncode) {
    var k, v, p, r = [];
    for (k in params) {
        v = params[k];
        p = _buildParam(k, v, useEncode);
        if (p != null && p != '') {
            r.push(p);
        }
    }
    return r.join('&');
}
function _buildParam(k, v, useEncode) {
    var type = typeof v,
        p,
        i = 0,
        len,
        r = [];
    if (type == 'number' || type == 'string' || type == 'boolean') {
        return [k, useEncode ? encodeURIComponent(v) : v].join('=');
    }
    if (_isObject(v)) {
        for (p in v) {
            r.push(_buildParam([k, '[', p, ']'].join(''), v[p], useEncode));
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
