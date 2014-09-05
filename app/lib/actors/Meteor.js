'use strict';

var createSubClass = require('../util/create_subclass')
    , collisionService = require('../collisions')
    , rules = require('../rules')
    , Actor = require('../abstract/Actor')
    , sprites = require('../sprites')
    , Container = createjs.Container;


var Meteor = module.exports = createSubClass(Actor, 'Meteor', {
    initialize: Meteor$initialize,
    tick: Meteor$tick,
    destroy: Meteor$destroy
});


function Meteor$initialize(x, y, size) {
    Actor.prototype.initialize.apply(this, arguments);
    
    this.name = 'meteor';
    this.rotation = Math.random()*360;
    this.size = size || 2;
    
    this.direction = Math.random()*360;
    this.velocity = Math.random()*8 + 2;
    this.speedX = Math.sin((this.direction) * Math.PI / -180);
    this.speedY = Math.cos((this.direction) * Math.PI / -180);

    this.body = sprites.createSprite('meteor'+this.size);
    this.addChild(this.body);

    try { var radius = this.body.spriteSheet.getFrame(this.body.currentFrame).regX } catch(e) {}

    collisionService.addActor(this, 'circle', {radius: radius || 20});

    rules.events.dispatchEvent({
        type: 'registerenemy', 
        data: {self: this}
    });
}


function Meteor$tick() {
    Actor.prototype.tick.apply(this, arguments);
    this.x -= this.speedX * this.velocity;
    this.y -= this.speedY * this.velocity;
}


function Meteor$destroy(event) {
    var newSize = this.size - 1;
    if (newSize) {
        // TODO: investigate exeption being thrown here.
        var meteor1 = new Meteor(this.x, this.y, newSize);
        this.parent.addChild(meteor1);
        var meteor2 = new Meteor(this.x, this.y, newSize);
        this.parent.addChild(meteor2);
    }
    Actor.prototype.destroy.apply(this, arguments);
}
