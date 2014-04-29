var $ = require('jquery');
var _ = require('lodash');

var Dialog = $.fn.modal.Constructor;

module.exports = function(options) {
    return function(element) {
        var $element = $(element);

        var dialog = new Dialog($element, options);

        $element.hide();

        return dialog;
    };
}
