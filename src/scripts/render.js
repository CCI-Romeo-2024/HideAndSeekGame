import {debug, getRandomArbitrary, getRandomInt} from './lib.js';
import playSound from './soundManager.js';
import env from './env.js';


/**
 * Return the html id
 * @param {number} id
 * @return string
 * */
const getAsteroidsID = (id) => {
    return `asteroids-${id}`;
}

/**
 * Return HTML for one asteroid
 * @param {number} id
 * @param {string} alienID
 * @return string
 * */
const getAsteroidsHTML = (id, alienID) => {
    const randAsteroidsAsset = getRandomInt(1, 11);

    const asteroidsSize = `(80vh / 8) * ${ getRandomArbitrary(0.4, 0.95).toFixed(3) }`

    return `<div id="${getAsteroidsID(id)}" class="asteroids-card ${alienID === getAsteroidsID(id) && env.DEBUG ? 'him' : ''}">
                <div 
                    class="asteroids-img asteroids-${randAsteroidsAsset}" 
                    style="height: calc(${asteroidsSize}); top: calc(((80vh / 8) - (${asteroidsSize})) * ${Math.random().toFixed(3)}); left: calc(((98vw / 8) - (${asteroidsSize})) * ${Math.random().toFixed(3)}); "></div>
            </div>`
}

/**
 * Return HTML of alien
 * @return string
 * */
const getExplosionHTML = () => {
    return `<img class="" src="assets/explosion/explosion2.webp?${new Date().getTime()}" alt="">`
}

/**
 * Draw all asteroids
 * @param {Object} game
 * @return void
 * */
const drawAsteroids = (game) => {
    const asteroidsContainer = document.getElementById("asteroids-container");

    game.alienID = getAsteroidsID(getRandomInt(0, 64)) // 0-63 -> 64 values
    debug(game.alienID);

    asteroidsContainer.innerHTML = '';

    for (let i = 0; i < 64; i++) {
        asteroidsContainer.innerHTML += getAsteroidsHTML(i, game.alienID)
    }
}

/**
 * Play animation to reveal Alien position
 * @param {string} alienID
 * @return void
 * */
const revealAlien = (alienID) => {
    const asteroidsList = document.querySelectorAll('.asteroids-img:not(.active)')

    const soundPlayed = []

    asteroidsList.forEach(asteroid => {
        const timerOut = getRandomInt(0, 2) * 100

        setTimeout(() => {
            asteroid.style.backgroundImage = `none`;
            asteroid.innerHTML = getExplosionHTML()

            const alienElement = document.querySelector(`#${alienID} > .asteroids-img`)

            alienElement.style.backgroundImage = `url('assets/alien/alien.svg')`
            alienElement.style.backgroundSize = '150%'
            alienElement.style.backgroundPositionX = '50%'
            alienElement.style.backgroundPositionY = '50%'

            alienElement.classList.add('active')

            if (soundPlayed.includes(timerOut)) return;

            soundPlayed.push(timerOut)
            playSound('explosion')

        }, timerOut)

    })
}

/**
 * Return score HTML
 * @param {number=} value
 * @return string
 * */
const getScoreHTML = (value = 0) => {
    return `SCORE: ${value}`
}

/**
 * Return Best score HTML
 * @param {number=} value
 * @return string
 * */
const getBestScoreHTML = (value = 0) => {
    return `BEST: ${value}`
}

export { drawAsteroids, getAsteroidsID, getAsteroidsHTML, getExplosionHTML, revealAlien, getScoreHTML, getBestScoreHTML }


