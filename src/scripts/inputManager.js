import { game, newGame } from './game.js'
import { debug } from './lib.js';
import { EScreen, screenManager } from './screenManager.js';

document.addEventListener('keyup', (event) => {
    debug(game.currentScreen);
    switch(event.key) {
        case 'f':
            if (![EScreen.win, EScreen.lose].includes(game.currentScreen)) break;

            newGame()

            screenManager('game', game)

            break;
    }
})


document.addEventListener('click', (event) => {
    debug('click');
    if (game.currentScreen !== EScreen.start) return;

    newGame()

    screenManager('game', game)
})