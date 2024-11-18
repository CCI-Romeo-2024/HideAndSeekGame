import { debug } from './lib.js';
import {drawAsteroids, getExplosionHTML} from './render.js'
import { addNewScore, calculateScore } from "./scoreManager.js";
import { updateScore } from './hud.js';

import playSound from './soundManager.js';
import {EScreen, screenManager} from './screenManager.js';
import {fireBulletAnimation} from './weaponManger.js';


const gameDefault = {
    alienID: 0,
    score: 0,
    startTime: 0,
    endTime: 0,
    fireCount: 0,
    difficulty: 80,
    interval: null,
    currentScreen: EScreen.game
}

let game = {...gameDefault}



/**
 * Start Interval to change the score
 * @return number
 **/
const initScoreIntervalUpdater = () => {
    return setInterval(() => {
        debug('Updating Score Interval')
        game.score = calculateScore(game)

        updateScore(game.score)
    }, 1000)
}

document.addEventListener("click", (event) => {
    if (!event.target.classList.contains("asteroids-img") || event.target.classList.contains("active")) return;

    const asteroidID = event.target.parentElement.id;
    debug(asteroidID);

    if (game.endTime !== 0) return;

    event.target.classList.add("active");

    if (game.fireCount === 0) {
        game.startTime = Date.now();

        game.interval = initScoreIntervalUpdater()

        debug('interval', game.interval)

        debug('Timer start');
    }

    game.fireCount++

    const mousePos = {x: event.clientX, y: event.clientY}

    fireBulletAnimation(mousePos, game)


    setTimeout(() => {
        event.target.style.backgroundImage = `none`;
        event.target.innerHTML = getExplosionHTML()

        playSound('explosion')



        if (game.alienID === asteroidID) {
            game.endTime = Date.now();

            clearInterval(game.interval)

            event.target.style.backgroundImage = `url('assets/alien/alien.svg')`
            event.target.style.backgroundSize = '150%'
            event.target.style.backgroundPositionX = '50%'
            event.target.style.backgroundPositionY = '50%'

            game.score = calculateScore(game)

            addNewScore(parseInt(game.score))

            setTimeout(() => screenManager('win', game), 1500)

            debug('You win');
        }


        updateScore(calculateScore(game))
    }, 100)
})


/**
 * Func to start a new game
 * @return void
 * */
const newGame = () => {
    game = {...gameDefault}
    updateScore(calculateScore(game))
    drawAsteroids(game)
}


newGame()


export { game, newGame }