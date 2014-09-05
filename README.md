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

* [rules.js](#) - The file where all high level game logic should go. 

* [Actor.js](#) - The base class that all game objects should inherit from.

* [sprite.js](#) - This module contains all of the sprite data for the entire [SpaceShooterRedux](http://www.kenney.nl) spritesheet. You can add any new sprite by adding it to the names map at the top of the module and calling `sprite.createSprite('name')` in your Actor class definition.


