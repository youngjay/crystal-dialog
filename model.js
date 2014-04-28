var ko = require('knockout');
var noop = function() {};

var parseTemplate = function(html) {
    var fragments = ko.utils.parseHtmlFragment(html);
    for (var i = 0; i < fragments.length; i++) {
        if (fragments[i].nodeType === 1) {
            return fragments[i];
        }
    }
}

module.exports = {
    open: function(data, callback) {
        this.__dialogCallback = callback || noop;
        this.handleOpen(data);
        this.__dialog.show();
    },

    // override
    handleOpen: function(data) {
    },

    
    // override
    getConfirmData: function() {
        return true;
    },

    buildDialogElement: function() {
        throw new Error('to be implement');
    },

    callback: function() {
        this.__dialog.hide();
        this.__dialogCallback.apply(this, arguments);
    },

    close: function() {
        this.callback(false);
    },

    confirm: function() {            
        this.callback(this.getConfirmData());
    },


    render: function() {
        var element = parseTemplate(this.__view);
        document.body.appendChild(element);

        ko.applyBindings(this, element);
        this.__dialog = this.buildDialogElement(element);
    }
};