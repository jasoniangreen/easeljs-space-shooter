'use strict';

var hudService = require('./hud');

var takeDmg20 = takeDamage(20)
    , takeDmg40 = takeDamage(40);


var collisions = {
    types:    [   'meteor',     'hero',    'laser',    'enemy', 'modifier' ],
    meteor:   [           ,  takeDmg20,    destroy,           ,            ],
    hero:     [    destroy,           ,           ,  takeDmg40,    destroy ],
    laser:    [    destroy,           ,           ,  takeDmg20,            ],
    enemy:    [           ,  takeDmg40,    destroy,           ,            ],
    modifier: [           ,      apply,           ,           ,            ]
};

var rules = module.exports = {
    collisions: transformCollisions(),
    destroyed: {
        meteor: addPoints(20),
        enemy: addPoints(50),
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
    if (data.self) {
        data.self.destroy && data.self.destroy();
        var destroyedFunc = rules.destroyed[data.self.name];
        destroyedFunc && destroyedFunc();
    }

    //data.self && data.self.destory && data.self.destory();
}


function takeDamage(damage) {
    return function _takeDamage(data) {
        var self = data.self;
        if (self) {
            self.takeDamage && self.takeDamage(damage);
            if (self.health <= 0) {
                self.destroy && self.destroy();
                var destroyedFunc = rules.destroyed[self.name];
                destroyedFunc && destroyedFunc();
            }
        }
    }
}


function addPoints(points) {
    return function _addPoints() {
        hudService.dispatchEvent({
            type: 'update', 
            data: { property: 'score', value: points}
        });
    }
}


function resetGame(self) {
    console.log('resetGame');
}


function apply(self) {
    console.log('self');
}

