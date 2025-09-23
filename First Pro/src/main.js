import {Boom} from "./scenes/Start.js"
var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-container',
        backgroundColor: '#028af8',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 500 },
                debug: false
            }
        },
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: Boom
    };


    new Phaser.Game(config);

    