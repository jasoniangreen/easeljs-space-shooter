Easeljs Space Shooter
=====================

A space shooter game written with the canvas framework Easel JS for a tutsplus video course.
The graphics are from the "Space Shooter (Redux)" sprite package by Kenney Vleugels (www.kenney.nl).


Getting Started
---------------

### Install ###
Install node and npm.

Then;
```
npm install -g bower
npm install -g grunt
```
Then from the project folder
```
bower install
npm install
```

### Run ###
```
grunt
```

navigate to localhost:9001 in a modern browser


A Brief Overview
----------------

* [lib/main.js](https://github.com/jasoniangreen/easeljs-space-shooter/blob/master/app/lib/main.js) - The main file that brings everything together. It is responsible for loading and initialising the hud, rules, actions, setting up the camera/background, and building and resetting the levels.

* [lib/rules.js](https://github.com/jasoniangreen/easeljs-space-shooter/blob/master/app/lib/rules.js) - The file where all high level game logic should go. Anything that concerns the interaction of game objects, collisions, game win/loss conditions and the monitoring game state. Individual game objects should be concerned with their own local rules. For example: The Meteor doesn't know which collisions will destroy it, but it knows that when it is destroyed, it should create 2 smaller Meteors. Collision logic is held at the top of this module in the form of an array 'matrix'. Object types are across the top as strings, and their other object in the collision is down the left side. Using this matrix you can see all the various rules for every collision possibility.

* [lib/sprite.js](https://github.com/jasoniangreen/easeljs-space-shooter/blob/master/app/lib/sprite.js) - This module contains all of the sprite data for the entire [SpaceShooterRedux](http://www.kenney.nl) spritesheet. You can add any new sprite by adding it to the names map at the top of the module and calling `sprite.createSprite('name')` in your class definition.

* [lib/hud.js](https://github.com/jasoniangreen/easeljs-space-shooter/blob/master/app/lib/hud.js) - This module controls the 'Heads Up Display', which is the information overlay containing the score and the hero's health. It gets updated by firing `set` and `update` events.

* [lib/config.js](https://github.com/jasoniangreen/easeljs-space-shooter/blob/master/app/lib/config.js) - Global configuration including the hero starting health and the current world width and height.

* [lib/collisions.js](https://github.com/jasoniangreen/easeljs-space-shooter/blob/master/app/lib/collisions.js) - Collisions service that calculates and registers all collidable objects in the game. Objects need to register themselves with a collision type and options (such as radius). Collisions can be processed at any time, usually during the game `tick`, returning an array of all collision events.

* [lib/actions.js](https://github.com/jasoniangreen/easeljs-space-shooter/blob/master/app/lib/actions.js) - Keeps a map of all currently pressed keys and the mouse position, to be used during the `tick` event, rather than setting up key event listeners manually.

* [lib/abstract/](https://github.com/jasoniangreen/easeljs-space-shooter/blob/master/app/lib/abstract/) - Abstract classes.

  * [lib/abstract/Actor.js](https://github.com/jasoniangreen/easeljs-space-shooter/blob/master/app/lib/abstract/Actor.js) - The base class that all game objects should inherit from. May be worthwhile creating some more base classes to manage all the objects that can take damage, or all enemies. It may be better, however, to manage this with mixins and the decorator pattern.

* [lib/actors/](https://github.com/jasoniangreen/easeljs-space-shooter/blob/master/app/lib/actors/) - All game objects, these inherit from Actor class.

  * [lib/actors/Hero.js](https://github.com/jasoniangreen/easeljs-space-shooter/blob/master/app/lib/actors/Hero.js) - The Hero is the main controllable game object. It has health, takes damage, fires lasers, and is responsible for it's own movement, sprites, animation and firing.

  * [lib/actors/Meteor.js](https://github.com/jasoniangreen/easeljs-space-shooter/blob/master/app/lib/actors/Meteor.js) - Meteors are setup with an initial direction and rotation. They move at a constant speed in that direction, and are an obstacle for the Hero. Meteors are with points when destroyed, but this logic is contained within the [rules.js](https://github.com/jasoniangreen/easeljs-space-shooter/blob/master/app/lib/rules.js) module.

  * [lib/actors/Laser.js](https://github.com/jasoniangreen/easeljs-space-shooter/blob/master/app/lib/actors/Laser.js) - Lasers are simple actors that move in the direction they were created in. They have a `BULLET_SPEED` and `BULLET_LIFE_TIME` constants and can be configured with a type to decide if it is an enemy laser or not.

  * [lib/actors/Saucer.js](https://github.com/jasoniangreen/easeljs-space-shooter/blob/master/app/lib/actors/Saucer.js) - In progress. The Saucer is an enemy capable of firing it's own lasers, it takes damage too.

* [lib/levels/](https://github.com/jasoniangreen/easeljs-space-shooter/blob/master/app/lib/levels/) - Level data.

* [lib/util/](https://github.com/jasoniangreen/easeljs-space-shooter/blob/master/app/lib/util/) - Utility functions.
