'use strict';

var Meteor = require('../actors/Meteor');

module.exports = {
    name: 'Meteor Wave A',
    data: [                     // x    y   size
        { objClass: Meteor, args: [30,  30,  1] },
        { objClass: Meteor, args: [200, 100, 1] },
        { objClass: Meteor, args: [150, 200, 1] },
        { objClass: Meteor, args: [80,  300, 2] },
        { objClass: Meteor, args: [400, 40,  2] },
        { objClass: Meteor, args: [450, 200, 1] }
    ]
};
