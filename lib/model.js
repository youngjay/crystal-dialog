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

module.exports = function(buildDialogElement) {
    return [
        function(manager) {
            this.manager = manager;
        },
        {
            open: function(data, callback) {
                if (!this.__dialog) {
                    this.render();
                }
                this.manager.addToActives(this);
                this.__dialogCallback = callback || noop;
                this.handleOpen(data);
                this.__dialog.show();
            },

            // tp be override
            handleOpen: function(data) {
            },            

            close: function() {
                this.manager.removeFromActives(this);
                this.__dialog.hide();
                this.__dialogCallback.apply(this, arguments);
            },

            render: function() {
                var element = parseTemplate(this.__view);
                document.body.appendChild(element);

                ko.applyBindings(this, element);
                this.__dialog = buildDialogElement(element);
            }
        }
    ];
}