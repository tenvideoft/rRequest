define(function (require, exports, module) {
'use strict';
var rebuild = require('src/rebuild');
var expect = chai.expect;
describe('rebuild aid', function () {
    var fullLevelAid = '$1:1$2:2$3:3$4:4$5:5$6:6$7:7$8:8$9:9$10:10$11:11$12:12$13:13$14:14abc$15:wx.user',
        missLevelOnlyAid = '$1:1$2:2$3:3$14:14abc$15:wx.user',
        missValueOnlyAid = '$1:1$2:$3:3$4:4$5:5$6:6$7:7$8:8$9:9$10:10$11:11$12:12$13:13$14:14abc$15:wx.user',
        missLevelAndValueAid = '$1:1$2:$3:$14:14abc$15:wx.user';
    // rebuilt order 2, 4, 5, 12, 13, 1, 7, 11, 15, 6, 3, 8, 9, 10, 14
    it('rebuild full level', function () {
        expect(rebuild.build(fullLevelAid)).to.equal('$2:2$4:4$5:5$12:12$13:13$1:1$7:7$11:11$15:wx.user$6:6$3:3$8:8$9:9$10:10$14:14abc');
    });
    it('rebuild when missing some level only', function () {
        expect(rebuild.build(missLevelOnlyAid)).to.equal('$2:2$1:1$15:wx.user$3:3$14:14abc');
    });
    it('rebuild when missing value of some level only', function () {
        expect(rebuild.build(missValueOnlyAid)).to.equal('$2:$4:4$5:5$12:12$13:13$1:1$7:7$11:11$15:wx.user$6:6$3:3$8:8$9:9$10:10$14:14abc');
    });
    it('rebuild when missing both level and value', function () {
        expect(rebuild.build(missLevelAndValueAid)).to.equal('$2:$1:1$15:wx.user$3:$14:14abc');
    });
});
});
