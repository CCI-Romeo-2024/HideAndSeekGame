import { drawAsteroids, getExplosionHTML, fireBulletAnimation, changeAlienPosition } from './render.js'
import { addNewScore, calculateScore } from "./scoreManager.js";
import { EScreen, screenManager } from './screenManager.js';
import { EAudio, playSound } from './soundManager.js';
import { updateScore } from './hud.js';
import { debug } from './lib.js';



const gameDefault = {
    alienID: 0,
    score: 0,
    startTime: 0,
    endTime: 0,
    fireCount: 0,
    difficulty: 75, // ~= 25 bullet in 10s
    interval: null,
    remainingAsteroid: [],
    currentScreen: EScreen.start
}

let game = {...gameDefault}


/**
 * Start Interval to change the score
 * @return number
 **/
const initGameIntervalUpdater = () => {
    return setInterval(() => {
        debug('Updating Game Interval')
        changeAlienPosition(game)

        game.score = calculateScore(game)
        updateScore(game.score)

    }, 1000)
}

document.addEventListener("click", (event) => {
    if (!event.target.classList.contains("asteroids-img") || event.target.classList.contains("active")) return;

    const asteroidID = event.target.parentElement.id;
    debug(asteroidID);

    if (game.endTime !== 0) return;
    const time = Date.now();

    event.target.classList.add("active");

    const asteroidIndex = game.remainingAsteroid.indexOf(asteroidID);
    if (asteroidIndex > -1) {
        game.remainingAsteroid.splice(asteroidIndex, 1);
    }


    if (game.fireCount === 0) {
        game.startTime = time;

        game.interval = initGameIntervalUpdater()

        debug('interval', game.interval)

        debug('Timer start');
    }

    game.fireCount++

    const mousePos = {x: event.clientX, y: event.clientY}

    fireBulletAnimation(mousePos, game)
    playSound(EAudio.fire)


    setTimeout(() => {
        event.target.style.backgroundImage = `none`;
        event.target.innerHTML = getExplosionHTML()

        playSound(EAudio.explosion)



        if (game.alienID === asteroidID) {
            game.endTime = time;

            clearInterval(game.interval)

            event.target.style.backgroundImage = `url('assets/alien/alien.svg')`
            event.target.style.backgroundSize = '100%'
            event.target.style.backgroundPositionX = '50%'
            event.target.style.backgroundPositionY = '50%'

            game.score = calculateScore(game)

            playSound(EAudio.win)

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