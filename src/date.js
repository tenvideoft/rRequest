/**
 *@author   tonicli
 *@date     2016/6/5
 */
define(function (require, exports, module) {
'use strict';
function _toString(v) {
    return Object.prototype.toString.call(v);
}
function _isDate(v) {
    return _toString(v) == '[object Date]';
}
function _isFunc(v) {
    return _toString(v) == '[object Function]';
}
function _isObject(v) {
    return _toString(v) == '[object Object]';
}
function _isEmptyObject(v) {
    return _isObject(v) && !Object.keys(v).length;
}

var DEFAULT_FORMAT = 'Y-mm-dd H:i:s',
    _patternMap = {
        Y: function(d) {
            return d.getFullYear();
        },
        m: function(d) {
            return d.getMonth() + 1;
        },
        mm: function(d) {
            return _pad(d.getMonth() + 1);
        },
        d: function (d) {
            return d.getDate();
        },
        dd: function(d) {
            return _pad(d.getDate());
        },
        H: function(d) {
            return _pad(d.getHours());
        },
        i: function(d) {
            return _pad(d.getMinutes());
        },
        s: function(d) {
            return _pad(d.getSeconds());
        }
    };
function _format(date, format, patternMap) {
    var dateObj;

    if (/^\d+$/.test(date)) {
        dateObj = new Date(parseInt(date));
    } else if (typeof date == 'string') {
        dateObj = new Date(date.replace(/-/g, '/'));
    } else if (_isDate(date)) {
        dateObj = date;
    }

    if (!dateObj || dateObj.toString() == 'Invalid Date') {
        throw new Error('[util.date.format]the input cannot be converted to date object(' + date + ')');
    }
    format = format || DEFAULT_FORMAT;
    patternMap = (patternMap && _isObject(patternMap)) ? _mergePatternMap(patternMap) : _patternMap;

    return format.replace(_generatePatternReg(patternMap), function(k) {
        if (_isFunc(patternMap[k])) {
            return patternMap[k](dateObj);
        }
        return k;
    });
}

function _pad(n) {
    return n > 9 ? n : '0' + n;
}
function _generatePatternReg(patternMap) {
    var patterns = [],
        k;

    for (k in patternMap) {
        patterns.push(k);
    }
    patterns.sort(function (a, b) {
        return b.length - a.length;
    });

    return new RegExp('(' + patterns.join('|') + ')', 'g');
}
function _mergePatternMap(patternMap) {
    var map,
        k;

    if (_isEmptyObject(patternMap)) {
        return _patternMap;
    }
    map = Object.create(_patternMap);
    for (k in patternMap) {
        if (k.length != 1) {
            throw new Error('[util.date._mergePatterns]invalid pattern key, pattern key must be only one char(' + k + ')');
        }
        if (!_isFunc(patternMap[k])) {
            throw new Error('[util.date._mergePatterns]pattern value must be function(' + k + ')');
        }
        map[k] = patternMap[k];
    }

    return map;
}
module.exports = {
    format: _format
};
});
