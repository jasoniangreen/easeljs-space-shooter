'use strict';

var Meteor = require('../actors/Meteor')
    , Saucer = require('../actors/Saucer');

module.exports = {
    name: 'Meteor Wave Test',
    data: [                     // x    y   size
        { objClass: Meteor, args: [30,  30,  2] },
        { objClass: Saucer, args: [300,  300] }
    ]
};
