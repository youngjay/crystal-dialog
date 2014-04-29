module.exports = require('mixin-class')(
    function(dialogOptions, dialogBuilder) {
        this.Base = require('mixin-class')(require('./lib/model')((require('./lib/build-bootstrap3-dialog-element') || dialogBuilder)(dialogOptions)));
        this.actives = [];
    },
    {
        addToActives: function(dialog) {
            this.actives.push(dialog);
        },

        getActives: function() {
            return this.actives.slice();
        },

        removeFromActives: function(dialog) {
            var index = this.actives.indexOf(dialog);
            if (index !== -1) {
                this.actives.splice(index, 1);
            }
        },

        create: function(component) {
            return this.Base.extend(component).create(this);
        }
    }
)
