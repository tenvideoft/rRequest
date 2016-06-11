/**
 *@author   tonicli
 *@date     2016/6/5
 */
define(function (require, exports, module) {
'use strict';
var util = require('./util');

var DEFAULT_FORMAT = 'Y-m-d H:i:s',
    _patternMap = {
        Y: function(d) {
            return d.getFullYear();
        },
        m: function(d) {
            return _pad(d.getMonth() + 1);
        },
        d: function(d) {
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
function _format(date, format) {
    var dateObj;

    if (/^\d+$/.test(date)) {
        dateObj = new Date(parseInt(date));
    } else if (typeof date == 'string') {
        dateObj = new Date(date.replace(/-/g, '/'));
    } else if (util.isDate(date)) {
        dateObj = date;
    }

    if (!dateObj || dateObj.toString() == 'Invalid Date') {
        throw new Error('[util.date.format]the input cannot be converted to date object(' + date + ')');
    }

    return format.replace(_generatePatternReg(_patternMap), function(k) {
        if (util.isFunc(_patternMap[k])) {
            return _patternMap[k](dateObj);
        }
        return k;
    });
}

function _pad(n) {
    return n > 9 ? n : '0' + n;
}
function _generatePatternReg(patternMap) {
    var patterns = (Object.keys ? Object.keys(patternMap) : (function () {
            var k, r = [];
            for (k in patternMap) {
                r.push(k);
            }
            return r.join('');
        })());

    return new RegExp('[' + patterns + ']', 'g');
}
function _mergePatterns(patterns) {
    var o = Object.create(_patternMap),
        k;

    for (k in patterns) {
        if (k.length != 1) {
            throw new Error('[util.date._mergePatterns]invalid pattern key, pattern key must be only one char(' + k + ')');
        }
        if (!util.isFunc(patterns[k])) {
            throw new Error('[util.date._mergePatterns]pattern value must be function(' + k + ')');
        }
        o[k] = patterns[k];
    }

    return o;
}
module.exports = {
    format: _format
};
});
