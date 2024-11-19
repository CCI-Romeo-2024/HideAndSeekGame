import {debug, getDistance, getRandomArbitrary, getRandomInt} from './lib.js';
import {EAudio, playSound} from './soundManager.js';
import { arrowPos } from './weaponManger.js';
import env from './env.js';





/**
 * Return the html id
 * @param {Number} id
 * @return String
 * */
const getAsteroidsID = (id) => {
    return `asteroids-${id}`;
}

/**
 * Return HTML for one asteroid
 * @param {String} asteroidsID
 * @param {Boolean} isAlien
 * @return String
 * */
const getAsteroidsHTML = (asteroidsID, isAlien) => {
    const randAsteroidsAsset = getRandomInt(1, 11);

    const asteroidsSize = `(80vh / 8) * ${ getRandomArbitrary(0.4, 0.95).toFixed(3) }`

    return `<div id="${asteroidsID}" class="asteroids-card ${isAlien && env.DEBUG ? 'him' : ''}">
                <div 
                    class="asteroids-img asteroids-${randAsteroidsAsset}" 
                    style="height: calc(${asteroidsSize}); top: calc(((80vh / 8) - (${asteroidsSize})) * ${Math.random().toFixed(3)}); left: calc(((98vw / 8) - (${asteroidsSize})) * ${Math.random().toFixed(3)}); "></div>
            </div>`
}

/**
 * Return HTML of alien
 * @return String
 * */
const getExplosionHTML = () => {
    return `<img class="" src="assets/explosion/explosion2.webp?${new Date().getTime()}" alt="">`
}

/**
 * Draw all asteroids
 * @param {Object} game
 * @param {String} game.alienID
 * @param {Array} game.remainingAsteroid
 * @return void
 * */
const drawAsteroids = (game) => {
    const asteroidsContainer = document.getElementById("asteroids-container");

    game.alienID = getAsteroidsID(getRandomInt(0, 64)) // 0-63 -> 64 values
    debug(game.alienID);

    asteroidsContainer.innerHTML = '';
    game.remainingAsteroid = []

    for (let i = 0; i < 64; i++) {
        const asteroidsID = getAsteroidsID(i)
        game.remainingAsteroid.push(asteroidsID);
        asteroidsContainer.innerHTML += getAsteroidsHTML(asteroidsID, game.alienID === asteroidsID)
    }
}


/**
 * Start fire Animation
 * @param {Object} mousePos
 * @param {number} mousePos.x
 * @param {number} mousePos.y
 * @param {number} fireCount
 *
 * @return {number}
 * */
const fireBulletAnimation = (mousePos, {fireCount}) => {
    const distance = getDistance(mousePos, arrowPos);

    const munitionsElement = document.getElementById('munitions');

    munitionsElement.innerHTML += `<div class="bullet" id="bullet-${fireCount}"></div>`

    const bulletElement = document.getElementById(`bullet-${fireCount}`)


    requestAnimationFrame(() => {
        bulletElement.style.transform = `translateY(-${distance.toFixed(1) - 20}px)`;
    });

    setTimeout(() => {
        bulletElement.remove()
    }, 100)
}


const changeAlienPosition = (game) => {
    const newAlienPositionIndex = getRandomInt(0, game.remainingAsteroid.length)
    const newAlienPosition = game.remainingAsteroid[newAlienPositionIndex]

    if (env.DEBUG) {
        document.getElementById(game.alienID).classList.remove('him')
        document.getElementById(newAlienPosition).classList.add('him')
    }

    game.alienID = newAlienPosition




}

/**
 * Play animation to reveal Alien position
 * @param {String} alienID
 * @return Void
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
            playSound(EAudio.explosion)

        }, timerOut)

    })
}

/**
 * Return score HTML
 * @param {Number=} value
 * @return string
 * */
const getScoreHTML = (value = 0) => {
    return `SCORE: ${value}`
}

/**
 * Return Best score HTML
 * @param {Number=} value
 * @return String
 * */
const getBestScoreHTML = (value = 0) => {
    return `BEST: ${value}`
}

export { drawAsteroids, getAsteroidsID, getAsteroidsHTML, getExplosionHTML, fireBulletAnimation, changeAlienPosition, revealAlien, getScoreHTML, getBestScoreHTML }


