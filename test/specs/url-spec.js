/**
 *@author   tonicli
 *@date     2016/6/11
 */
define(function (require, exports, module) {
'use strict';
var url = require('src/url');
var expect = chai.expect;
describe('url', function () {
    var _url = 'http://film.qq.com',
        _urlWithQueryString = _url + '?pre=1',
        _params = {p:1},
        _arrParams = {p: [1,2]},
        _objParams = {p1:1, p2:2},
        _nestedObjParams = {
            p1: {
                p2: 1,
                p3: 2
            }
        };

    it('build without params', function () {
        expect(url.buildUrl(_url)).to.equal('http://film.qq.com');
    });
    it('throw error when miss url', function () {
        expect(url.buildUrl).to.throw(Error);
    });
    it('build with empty string value', function () {
        expect(url.buildUrl(_url, {p: ''})).to.equal('http://film.qq.com');
    });
    it('build with simple params', function () {
        expect(url.buildUrl(_url, _params)).to.equal('http://film.qq.com?p=1');
    });
    it('build with array params', function () {
        expect(url.buildUrl(_url, _arrParams)).to.equal('http://film.qq.com?p[0]=1&p[1]=2');
    });
    it('build with object params', function () {
        expect(url.buildUrl(_url, _objParams)).to.equal('http://film.qq.com?p1=1&p2=2');
    });
    it('build with nested object params', function () {
        expect(url.buildUrl(_url, _nestedObjParams)).to.equal('http://film.qq.com?p1[p2]=1&p1[p3]=2');
    });
    it('build url which has query string already', function () {
        expect(url.buildUrl(_urlWithQueryString, _params)).to.equal('http://film.qq.com?pre=1&p=1');
    });
});
});
