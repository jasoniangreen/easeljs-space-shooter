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


A Brief Overview - in progress
------------------------------

* [main.js](#) - The main file that brings everything together. It is responsible for loading and initialising the hud, rules, actions, setting up the camera/background, and building and resetting the levels.

* [rules.js](#) - The file where all high level game logic should go. Anything that concerns the interaction of game objects, collisions, game win/loss conditions and the monitoring game state. Individual game objects should be concerned with their own local rules. For example: The Meteor doesn't know which collisions will destroy it, but it knows that when it is destroyed, it should create 2 smaller Meteors. Collision logic is held at the top of this module in the form of an array 'matrix'. Object types are across the top as strings, and their other object in the collision is down the left side. Using this matrix you can see all the various rules for every collision possibility.

* [sprite.js](#) - This module contains all of the sprite data for the entire [SpaceShooterRedux](http://www.kenney.nl) spritesheet. You can add any new sprite by adding it to the names map at the top of the module and calling `sprite.createSprite('name')` in your class definition.

* [hud.js](#) - This module controls the 'Heads Up Display', which is the information overlay containing the score and the hero's health. It gets updated by firing `set` and `update` events.

* [config.js](#) - Global configuration including the hero starting health and the current world width and height.

* [collisions.js](#) - Collisions service that calculates and registers all collidable objects in the game. Objects need to register themselves with a collision type and options (such as radius). Collisions can be processed at any time, usually during the game `tick`, returning an array of all collision events.

* [actions.js](#) - Keeps a map of all currently pressed keys and the mouse position, to be used during the `tick` event, rather than setting up key event listeners manually.

* [abstract/](#) - Abstract classes.

  * [abstract/Actor.js](#) - The base class that all game objects should inherit from. May be worthwhile creating some more base classes to manage all the objects that can take damage, or all enemies. It may be better, however, to manage this with mixins and the decorator pattern.

* [actors/](#) - All game objects, these inherit from Actor class.

  * [actors/Hero.js](#) - The Hero is the main controllable game object. It has health, takes damage, fires lasers, and is responsible for it's own movement, sprites, animation and firing.

  * [actors/Meteor.js](#) - Meteors are setup with an initial direction and rotation. They move at a constant speed in that direction, and are an obstacle for the Hero. Meteors are with points when destroyed, but this logic is contained within the [rules.js](#) module.
