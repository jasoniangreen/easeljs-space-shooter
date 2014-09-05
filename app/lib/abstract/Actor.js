'use strict';

// Should make Meteor not aware of scoring?

var createSubClass = require('../util/create_subclass')
    , collisionService = require('../collisions')
    , hudService = require('../hud')
    , rules = require('../rules')
    , config = require('../config')
    , world = config.world
    , Container = createjs.Container;


var Actor = module.exports = createSubClass(Container, 'Actor', {
    initialize: Actor$initialize,
    destroy: Actor$destroy,
    isDestroyed: Actor$isDestroyed,
    tick: Actor$tick,
    collision: Actor$collision
});


function Actor$initialize(x, y) {
    if (this.constructor == Actor) 
        return console.error('This is an abstract class and should be subclassed');

    Container.prototype.initialize.apply(this, arguments);

    this.x = x;
    this.y = y;

    this.on('collision', this.collision);
    this.on('tick', this.tick);
}


function Actor$destroy() {
    if (this.parent) {
        rules.events.dispatchEvent({
            type: 'destroyed', 
            data: { self: this }
        });
        collisionService.removeActor(this);
        this.parent.removeChild(this);
        this._destroyed = true;
    }
}


function Actor$isDestroyed() {
    return this._destroyed;
}


function Actor$tick() {
    if (this.x > world.width) this.x = 0;
    if (this.x < 0) this.x = world.width;
    if (this.y > world.height) this.y = 0;
    if (this.y < 0) this.y = world.height;
}


function Actor$collision(event) {
    // To be implemented in subclass
}
