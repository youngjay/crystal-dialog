var $ = require('jquery');
var ko = require('knockout');
var _ = require('lodash');

var Dialog = $.fn.modal.Constructor;

var $win = $(window);
var DIALOG_COMPONENT_HEIGHT = 50 /* head */ + 60 /* footer */ + 30 /* padding *2 */;
var DIALOG_MARGIN = 50 * 2;
var DEFAULT_DIALOG_MODE = 'auto';

var enableFocus = require('./enable-focus');

module.exports = function(element, options) {
    var $element = $(element);

    var dialog = new Dialog($element, _.extend({
        backdrop: 'static',
        keyboard: false
    }, options));

    $element.css({
        top: '50%'
    });

    var dialogMode = $element.attr('data-dialog-mode') || DEFAULT_DIALOG_MODE;

    if (dialogMode === 'fixed-size') {
        var width = $element.outerWidth();
        var height = $element.outerHeight();

        $element.css({
            marginTop:  -height / 2,
            marginLeft: -width/ 2
        });  
    } else if (dialogMode === 'fixed-position') {
        $element.css({
            top: '10%',
            marginLeft: -$element.outerWidth() / 2
        });
    } else {
        // 内容可能会动态改变大小
        // 所以用设置固定的margin来对齐
        var $body = $element.find('.modal-body');       
        var resize = function() {      
            var dialogHeight = $win.outerHeight() - DIALOG_MARGIN;  
            var dialogBodyHeight = dialogHeight - DIALOG_COMPONENT_HEIGHT;

            $body.css({
                height: dialogBodyHeight,
                maxHeight: dialogBodyHeight
            });

            $element.css({
                marginTop:  -dialogHeight / 2,
                marginLeft: -$element.outerWidth() / 2
            });
        };

        $win.bind('resize', resize);
        resize();   
    }

    $element.hide();

    enableFocus(dialog, $element);

    return dialog;
};

