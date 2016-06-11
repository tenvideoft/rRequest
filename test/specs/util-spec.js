/**
 *@author   tonicli
 *@date     2016/6/11
 */
define(function (require, exports, module) {
'use strict';
var util = require('src/util');
var expect = chai.expect,
    assert = chai.assert;
describe('util', function () {
    var _func = function () {};

    it('test isFunc', function () {
        assert.isTrue(util.isFunc(_func));
    })
});
});
