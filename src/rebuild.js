define(function (require, exports, module) {
'use strict';
var REBUILD_ORDER = "$2$4$5$12$13$1$7$11$15$6$3$8$9$10$14";//最后拼接成aid的顺序

function _genMap(aid) {
    var map = {},
        match,
        reg = /(\$\d+):[^$]*/g;
    while ((match = reg.exec(aid)) != null) {
        map[match[1]] = match[0];
    }

    return map;
}
function _build(aid) {
    var map = _genMap(aid);
    return REBUILD_ORDER.replace(/\$\d+/g, function (k) {
        return map[k] || '';
    });
}

exports.build = _build;
});
