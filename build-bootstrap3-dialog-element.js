var $ = require('jquery');
var _ = require('lodash');

var Dialog = $.fn.modal.Constructor;

module.exports = function(element, options) {
    var $element = $(element);

    var dialog = new Dialog($element, _.extend({
        backdrop: 'static',
        keyboard: false
    }, options));

    $element.hide();

    return dialog;
};
