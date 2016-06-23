define(function (require, exports, module) {
'use strict';
var TOTAL_LEVELS = 15,
    REBUILD_ORDER = "$2$4$5$12$13$1$7$11$15$6$3$8$9$10$14",//最后拼接成aid的顺序
    _reg = _genPattern();

function _genPattern() {
    var r = [];
    for (var i=1; i<=TOTAL_LEVELS; i++) {
        r.push('(\\$' + i + ':[^$]*)?');
    }

    return new RegExp(r.join(''));
}
function _build(aid) {
    return aid.replace(_reg, REBUILD_ORDER);
}

exports.build = _build;
});