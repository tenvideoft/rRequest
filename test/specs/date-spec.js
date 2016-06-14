/**
 *@author   tonicli
 *@date     2016/6/14
 */
define(function (require, exports, module) {
'use strict';
var date = require('src/date');
var expect = chai.expect;

describe('date', function () {
    var _strDate = '2016-6-14',
        _objDate = new Date('2016/6/14'),
        _tsDate = _objDate.getTime(),
        _invalidStrDate = '2016xx6x14',
        _format = 'Y-m-d H:i:s',
        _patternMap = {
            w: function (d) {
                return ['Sun', 'Mon', 'Tue', 'Wed', 'The', 'Fri', 'Sat'][d.getDay()];
            }
        },
        _invalidPatternMap1 = {
            xx: function () {
                return 'some thing';
            }
        },
        _invalidPatternMap2 = {
            x: 'x'
        };

    it('format string format', function () {
        expect(date.format(_strDate, _format)).to.equal('2016-06-14 00:00:00');
    });
    it('format object format', function () {
        expect(date.format(_objDate, _format)).to.equal('2016-06-14 00:00:00');
    });
    it('format timestamp format', function () {
        expect(date.format(_tsDate, _format)).to.equal('2016-06-14 00:00:00');
    });
    it('format invalid string format', function () {
        expect(date.format.bind(date, _invalidStrDate, _format)).to.throw(Error);
    });
    it('format with default date format', function () {
        expect(date.format(_strDate)).to.equal('2016-06-14 00:00:00');
    });
    it('format with custom pattern map', function () {
        expect(date.format(_strDate, 'Y-m-d w', _patternMap)).to.equal('2016-06-14 Tue');
    });
    it('format with invalid pattern map', function () {
        expect(date.format.bind(date, _strDate, 'Y-m-d xx', _invalidPatternMap1)).to.throw(Error);
        expect(date.format.bind(date, _strDate, 'Y-m-d xx', _invalidPatternMap2)).to.throw(Error);
    });
});
})
