window.location = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Redirections"
import { Game } from './scenes/Game.js';
import {TheLine} from './scenes/TheLine.js';
import {Clipboard} from './scenes/Clipboard.js'
import {WinGame} from "./scenes/WinGame.js"
import {GameOver} from "./scenes/GameOver.js"
import {Instructions} from "./scenes/Instructions.js"
import {Home} from "./scenes/Home.js"
const config = {
    type: Phaser.AUTO,
    title: 'Trombone Run',
    description: '',
    parent: 'game-container',
    width: 1200,
    height: 700,
    backgroundColor: '#7F0037',
    pixelArt: false,
    physics:{
        default: "arcade",
        arcade: {
            debug: false,
        }
    },
    scene: [Home, Instructions, Game, TheLine, Clipboard, GameOver, WinGame,],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            
