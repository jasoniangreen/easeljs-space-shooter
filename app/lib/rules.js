'use strict';

var hudService = require('./hud');
var rulesEvents = new createjs.EventDispatcher();

var takeDmg20 = takeDamage(20)
    , takeDmg40 = takeDamage(40);

var enemies = [];

init();
function init() {
    rulesEvents.on('destroyed', onDestroyed);
    rulesEvents.on('registerenemy', onRegisterEnemy);
}

var collisions = {
    selves:   [   'meteor',     'hero',    'laser',   'elaser', 'modifier', 'saucer'  ],
 // others
    meteor:   [           ,  takeDmg20,    destroy,           ,                       ],
    hero:     [    destroy,           ,           ,    destroy,    destroy, takeDmg20 ],
    laser:    [    destroy,           ,           ,           ,           , takeDmg20 ],
    elaser:   [           ,  takeDmg20,           ,           ,           ,           ],
    saucer:   [           ,  takeDmg40,    destroy,           ,           ,           ],
    modifier: [           ,      apply,           ,           ,           ,           ]
};

var rules = module.exports = {
    collisions: transformCollisions(),
    destroyed: {
        meteor: addPoints(20),
        enemy: addPoints(50),
        hero: resetGame,
        saucer: addPoints(100)
    },
    events: rulesEvents,
    executeCollisions: executeCollisions
};


function executeCollisions(collisions) {
    collisions.forEach(function (eventObj) {
        var event = eventObj.event;
        var target = eventObj.target;
        
        try {
            var self = event.data.self;
            var selfName = event.data.self.name;
            var otherName = event.data.other.name;
            var ruleFunc = rules.collisions[selfName][otherName];
        } catch(e) {console.info('Unknown collision rule or bad variable assignment.')}

        if (typeof ruleFunc == 'function') ruleFunc(event.data);
        if (target) target.dispatchEvent(event);
    });
}


function onRegisterEnemy(event) {
    var enemy = event.data && event.data.self;
    if (enemy)
        enemies.push(enemy);
}


function onDestroyed(event) {
    var actor = event.data && event.data.self;
    var destroyedFunc = actor && rules.destroyed[actor.name];
    destroyedFunc && destroyedFunc();

    if (actor) {
        var index = enemies.indexOf(actor);
        if (index > -1) enemies.splice(index, 1);
        if (!enemies.length /*checkwin*/)
            rulesEvents.dispatchEvent({
                type: 'resetgame', 
                data: { isWin: true }
            });
    }
}

function transformCollisions() {
    var map = {};
    var selves = collisions.selves;
    selves.forEach(function (self, index) {
        map[self] = {};
        selves.forEach(function (other) {
            map[self][other] = collisions[other][index];
        });
    });
    return map;
}


function destroy(data) {
    if (data.self)
        data.self.destroy && data.self.destroy();
}


function takeDamage(damage) {
    return function _takeDamage(data) {
        var self = data.self;
        if (self) {
            if (self.health) self.health -= damage;
            self.takeDamage && self.takeDamage(damage);

            if (self.name == 'hero') {
                hudService.dispatchEvent({
                    type: 'set', 
                    data: { property: 'health', value: self.health}
                });
            }

            if (self.health <= 0)
                self.destroy && self.destroy();
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
    console.log('hero death: resetGame to be implemented');
    rulesEvents.dispatchEvent({
        type: 'resetgame', 
        data: { isWin: false }
    });
}


function apply(self) {
    console.log('powerups to be implemented');
}

