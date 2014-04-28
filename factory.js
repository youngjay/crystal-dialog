var Base = require('mixin-class')(require('./model'));

module.exports = function(componentFactory, buildDialogElement) {
    var cache = {};
    var activeDialogs = [];
    Base.mix({
        buildDialogElement: buildDialogElement
    });

    var removeFromActiveDialogs = function(dialog) {
        var index = activeDialogs.indexOf(dialog);
        if (index !== -1) {
            activeDialogs.splice(index, 1);
        }
    };

    var openDialog = function(type, data, callback, context) {
        var dialog = cache[type];
        if (!dialog) {
            dialog = Base.extend(componentFactory(type)).create();
            dialog.render();
            cache[type] = dialog;
        }
        activeDialogs.push(dialog);
        dialog.open(data, function() {
            removeFromActiveDialogs(dialog);
            callback.apply(context, arguments);
        });
    };

    openDialog.activeDialogs = activeDialogs;

    return openDialog;
};

