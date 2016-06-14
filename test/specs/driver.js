var sw = require('selenium-webdriver');
var driver = new sw.Builder()
    .withCapabilities(sw.Capabilities.phantomjs())
    .build();
var chai = require('chai');
var chaiWebdriver = require('chai-webdriver');
chai.use(chaiWebdriver(driver));

describe('driver', function () {
    before(function (done) {
        this.timeout(0);
        driver.get('https://www.baidu.com').then(done);
    });
    it('test', function () {
        chai.expect('aaa').dom.to.be.visible();
    });
});
