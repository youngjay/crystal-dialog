module.exports = require('mixin-class')(
    function(dialogOptions, dialogBuilder) {
        this.Base = require('mixin-class')(require('./lib/model')((require('./lib/build-bootstrap3-dialog-element') || dialogBuilder)(dialogOptions)));
        this.cache = {};
        this.actives = [];
    },
    {
        _removeFromActiveDialogs: function(dialog) {
            var index = this.actives.indexOf(dialog);
            if (index !== -1) {
                this.actives.splice(index, 1);
            }
        },

        add: function(type, component) {
            this.cache[type] = component;
        },

        open: function(type, data, callback, context) {
            var dialog = this.cache[type];
            if (!dialog) {
                throw new Error('dialog:' + type + ' not exists')
            }
            if (!dialog.__dialog) {
                dialog = this.Base.extend(dialog).create()
                dialog.render();
                this.cache[type] = dialog;
            }
            this.actives.push(dialog);
            var self = this;
            dialog.open(data, function() {
                self._removeFromActiveDialogs(dialog);
                callback.apply(context, arguments);
            })
        }
    }
)
