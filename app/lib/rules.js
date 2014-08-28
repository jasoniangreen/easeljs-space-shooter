'use strict';

var collisions = {
    types:    [   'meteor',     'hero',    'laser',    'enemy', 'modifier' ],
    meteor:   [           , takeDamage,    destroy,           ,            ],
    hero:     [    destroy,           ,           , takeDamage,    destroy ],
    laser:    [    destroy,           ,           , takeDamage,            ],
    enemy:    [           , takeDamage,    destroy,           ,            ],
    modifier: [           ,      apply,           ,           ,            ]
};

module.exports = {
    collisions: transformCollisions(),
    destroyed: {
        meteor: addPoints,
        enemy: addPoints,
        hero: resetGame
    }
};


function transformCollisions() {
    var map = {};
    var types = collisions.types;
    types.forEach(function (self, index) {
        map[self] = {};
        types.forEach(function (other) {
            map[self][other] = collisions[other][index];
        });
    });
    console.log(map);
    return map;
}


function destroy(data) {
    console.log('destroy');
    //data.self && data.self.destory && data.self.destory();
}


function takeDamage(data) {
    console.log('takeDamage');
    // //use partial to pass different vals
    // var self = data.self;
    // self.takeDamage && self.takeDamage(20);

    // if (self.health <= 0)
    //     self.destroy && self.destroy();
}


function addPoints(self) {
    console.log('addPoints');
}


function resetGame(self) {
    console.log('resetGame');
}


function apply(self) {
    console.log('self');
}

