'use strict';

var createSubClass = require('../util/create_subclass')
    , collisionService = require('../collisions')
    , rules = require('../rules')
    , Actor = require('../abstract/Actor')
    , Laser = require('./Laser')
    , sprites = require('../sprites')
    , Container = createjs.Container;


var Saucer = module.exports = createSubClass(Actor, 'Saucer', {
    initialize: Saucer$initialize,
    tick: Saucer$tick,
    fire: Saucer$fire,
    takeDamage: Saucer$takeDamage
});


function Saucer$initialize(x, y) {
    Actor.prototype.initialize.apply(this, arguments);
    
    this.name = 'saucer';
    this.health = 200;

    this.body = sprites.createSprite('saucer');
    this.addChild(this.body);

    try { var radius = this.body.spriteSheet.getFrame(this.body.currentFrame).regX } catch(e) {}

    collisionService.addActor(this, 'circle', {radius: radius || 20});

    rules.events.dispatchEvent({
        type: 'registerenemy', 
        data: {self: this}
    });
}


function Saucer$tick() {
    Actor.prototype.tick.apply(this, arguments);
    this.rotation += 3;
    if (Math.random() < 0.1)
        this.fire();
}


function Saucer$fire() {
    var laser = new Laser(this.x, this.y, Math.random()*360, 'enemy');
    var index = this.parent.getChildIndex(this);
    this.parent.addChildAt(laser, index);
}


function Saucer$takeDamage(damage) {
    this.alpha = 0.5;
    var self = this;
    setTimeout(function() {
        if (self) self.alpha = 1;
    }, 2000);
}
