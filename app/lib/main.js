'use strict';

var domReady = require('./util').domReady
    , Hero = require('./actors/Hero')
    , actionService = require('./actions')
    , levels = require('./levels')
    , rules = require('./rules')
    , hud = require('./hud')
    , collisionService = require('./collisions')
    , config = require('./config')
    , wConfig = config.world;

var _W = 500
    , _H = 700
    , xCentre = _W / 2
    , yCentre = _H / 2
    , currentLevel = 0
    , c = createjs
    , hero
    , stage
    , world
    , canvas;


domReady(function init() {
    stage = new c.Stage('main');
    canvas = stage.canvas;
    actionService.init(window, stage);
    hud.init(_W, _H);
    rules.events.on('resetgame', onResetGame);
    prepareWorld();

    c.Ticker.addEventListener('tick', function() {
        cameraMove();
        updateBackground();
        var collisions = collisionService.process();
        rules.executeCollisions(collisions);
        stage.update();
    });
});


function onResetGame(event) {
    stage.removeChild(world);
    // TODO: reset hud
    if (event.data.isWin)
        currentLevel++;
    prepareWorld();
}


function prepareWorld() {
    world = new c.Container();
    world.x = 0; world.y = 0;
    stage.addChild(world);
    stage.addChild(hud.get());

    var level = levels[currentLevel];
    
    if (!level) return console.info('You win the game!');

    wConfig.height = level.data.length * level.cellHeight;
    wConfig.width = level.data[0].length * level.cellWidth;

    level.data.forEach(function(row, rowIndex) {
        row.forEach(function(cell, cellIndex) {
            if (cell) {
                console.log('Building cell: ' + cell.name);
                
                var xOffset = cellIndex * level.cellWidth;
                var yOffset = rowIndex * level.cellHeight;
                
                cell.data.forEach(function(item) {
                    var C = item.objClass;
                    var args = [C].concat(item.args);
                    var inst = new (C.bind.apply(C, args));
                    inst.x = inst.x + xOffset;
                    inst.y = inst.y + yOffset;
                    if (C == Hero) {
                        hero = inst;
                        window.hero = inst;
                    }
                    world.addChild(inst);
                });
            }
        });
    });
}


function cameraMove() {
    if (wConfig.width > _W) {
        if (hero.x < wConfig.width - xCentre && hero.x > xCentre)
            world.x = -hero.x + xCentre;
        else if (hero.x >= wConfig.width - xCentre)
            world.x = -(wConfig.width - _W);
        else
            world.x = 0;
    }

    if (wConfig.height > _H) {
        if (hero.y < wConfig.height - yCentre && hero.y > yCentre)
            world.y = -hero.y + yCentre;
        else if (hero.y >= wConfig.height - yCentre)
            world.y = -(wConfig.height - _H);
        else
            world.y = 0;
    }
}


function updateBackground() {
    var x = world.x
        , y = world.y;

    canvas.style.backgroundPositionX = x/2 + 'px';
    canvas.style.backgroundPositionY = y/2 + 'px';
}
