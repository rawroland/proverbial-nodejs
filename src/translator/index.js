"use strict";
exports.__esModule = true;
var create = function (translate) {
    return {
        translate: function (text, from, to) {
            return translate(text, to, from).then(function (translation) { return translation; });
        }
    };
};
exports.create = create;
