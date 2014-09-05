'use strict';

var A = require('./wave_a')
    , B = require('./wave_b')
    , T = require('./wave_test')
    , H = require('./home');

module.exports = [
    {
        name: 'The Morthanveld Nest',
        cellWidth: 500,
        cellHeight: 500,
        data: [
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,T,H,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]
        ]
    },
    {
        name: 'Idiran Space',
        cellWidth: 500,
        cellHeight: 500,
        data: [
            [0,0,0,0,0,0,0,0,0],
            [0,0,A,0,0,0,B,A,0],
            [0,0,0,A,0,0,0,0,0],
            [0,B,0,0,H,0,A,0,0],
            [0,0,B,0,0,0,0,0,0],
            [0,0,0,0,0,B,0,A,0],
            [0,0,0,A,0,0,0,0,0]
        ]
    },
    {
        name: 'The Affront',
        cellWidth: 500,
        cellHeight: 500,
        data: [
            [0,0,B,B,B,B,B,0,0],
            [0,0,A,0,0,0,A,0,0],
            [0,0,A,0,0,0,A,0,0],
            [0,0,A,0,H,0,A,0,0],
            [0,0,A,0,0,0,A,0,0],
            [0,0,B,B,B,B,B,0,0],
            [0,0,0,0,0,0,0,0,0]
        ]
    }
];
