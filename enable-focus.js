var $ = require('jquery');

module.exports = function(dialog, $element) {
    var focusSelector = $element.attr('data-dialog-focus');

    if (focusSelector) {
        var showDialog = dialog.show;

        var tryAutoFocus = function(tryAutoFocusCount) {
            if (tryAutoFocusCount-- === 0) {
                return;
            }       

            setTimeout(function() {
                var elemToFucus = $element.find(focusSelector)[0];

                if (elemToFucus) {
                    try {
                        elemToFucus.focus();
                    } catch (e) {
                        // do nothing
                    }                        
                } else {
                    tryAutoFocus(tryAutoFocusCount);
                }                   
            }, 300);
        };

        dialog.show = function() {
            showDialog.apply(this, arguments);
            tryAutoFocus(5);
        };
    }
};   