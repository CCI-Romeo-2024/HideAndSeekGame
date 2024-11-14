import { debug } from './lib.js';
import { drawAsteroids, getAlienHTML } from './render.js'
import { addNewScore, calculateScore } from "./score.js";
import { updateScore } from './hud.js';

import playSound from './soundManager.js';


const gameDefault = {
    alienID: 0,
    score: 0,
    startTime: 0,
    endTime: 0,
    fireCount: 0,
    difficulty: 50,
    interval: null
}

const game = {...gameDefault}


document.addEventListener("click", (event) => {
    if (!event.target.classList.contains("asteroids-img") || event.target.classList.contains("active")) return;

    const asteroidID = event.target.parentElement.id;
    debug(asteroidID);

    if (game.endTime !== 0) return;

    event.target.classList.add("active");

    if (game.fireCount === 0) {
        game.startTime = Date.now();

        game.interval = setInterval(() => {
            debug('Updating Score Interval')
            game.score = calculateScore(game)

            updateScore(game.score)

            if (game.score === 0) {
                // showLoseScreen(game)
                debug('You lose')
            }
        }, 1000)

        debug('Timer start');
    }

    game.fireCount++

    event.target.style.backgroundImage = `url('../../assets/explosion/explosion2.webp?${new Date().getTime()}')`;

    playSound('explosion')


    if (game.alienID === asteroidID) {
        game.endTime = Date.now();

        clearInterval(game.interval)

        event.target.innerHTML = getAlienHTML();

        game.score = calculateScore(game)

        addNewScore(game.score)

        // showWinScreen(game)

        debug('You win');
    }


    updateScore(calculateScore(game))
})




drawAsteroids(game)

// updateScore(getRandomInt(60000, 100000))