/**
 *@author   tonicli
 *@date     2016/6/11
 */
define(function (require, exports, module) {
'use strict';
var url = require('src/url');
var expect = chai.expect;
describe('url', function () {
    var _url = 'http://film.qq.com';

    it('build without params', function () {
        expect(url.buildUrl(_url)).to.equal('http://film.qq.com');
    })
});
});
