'use strict';

module.exports = createSubclass;

function createSubclass(Superclass, name, methods) {
    var Subclass;
    
    eval('Subclass = function ' + name + '(){ this.initialize.apply(this, arguments) }');
    Subclass.prototype = Object.create(Superclass.prototype);

    for (var key in methods) {
        if (methods.hasOwnProperty(key))
            Subclass.prototype[key] = methods[key];
    }

    return Subclass;
}
