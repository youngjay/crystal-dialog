var mixin = require('mixin-class');
var noop = function() {};
var ko = require('knockout');

var parseTemplate = function(html) {
    var fragments = ko.utils.parseHtmlFragment(html);
    for (var i = 0; i < fragments.length; i++) {
        if (fragments[i].nodeType === 1) {
            return fragments[i];
        }
    }
};


module.exports = require('mixin-class')(
    function(dialogOptions, dialogBuilder) {
        var actives = this.actives = [];

        var buildDialogElement = (require('./lib/build-bootstrap3-dialog-element') || dialogBuilder)(dialogOptions);

        this._mixins = {
            _open: function(callback) {
                if (!this.__dialog) {
                    this._render();
                }
                actives.push(this);
                this.__dialogCallback = callback || noop;
                this.__dialog.show();
            },

            close: function() {
                var index = actives.indexOf(this);
                if (index !== -1) {
                    actives.splice(index, 1);
                }
                this.__dialog.hide();
                this.__dialogCallback.apply(this, arguments);
            },

            _render: function() {
                var element = parseTemplate(this.__view);
                document.body.appendChild(element);

                ko.applyBindings(this, element);
                this.__dialog = buildDialogElement(element);
            }
        };

        this.cache = {};
    },
    {
        getActives: function() {
            return this.actives.slice();
        },

        add: function(type, component, handleOpen) {
            this.cache[type] = {
                handleOpen: handleOpen,
                dialog: component.mix(this._mixins)
            };
        },

        open: function(type, data, callback) {
            var o = this.cache[type];
            o.handleOpen(data);
            o.dialog._open(callback);
        }
    }
)
