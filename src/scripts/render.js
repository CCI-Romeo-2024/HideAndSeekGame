import {debug, getRandomArbitrary, getRandomInt} from './lib.js';


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

    return `<div id="${getAsteroidsID(id)}" class="asteroids-card ${alienID === getAsteroidsID(id) ? 'him' : ''}">
                <div 
                    class="asteroids-img asteroids-${randAsteroidsAsset}" 
                    style="height: calc(${asteroidsSize}); top: calc(((80vh / 8) - (${asteroidsSize})) * ${Math.random().toFixed(3)}); left: calc(((98vw / 8) - (${asteroidsSize})) * ${Math.random().toFixed(3)}); "></div>
            </div>`
}

/**
 * Return HTML of alien
 * @return string
 * */
const getAlienHTML = () => {
    return `<img class="" src="../../assets/alien/alien.svg" alt="">`
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

export { drawAsteroids, getAsteroidsID, getAsteroidsHTML, getAlienHTML }


