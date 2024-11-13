import { getRandomArbitrary, getRandomInt } from './lib.js';


/**
 * Return the html id
 * @param {number} id
 * @return string
 * */
const generateAsteroidsID = (id) => {
    return `asteroids-${id}`;
}

/**
 * Return HTML for an asteroid
 * @param {number} id
 * @return string
 * */
const getAsteroidsHTML = (id) => {
    const randAsteroidsAsset = getRandomInt(1, 11);

    const randAsteroidsSize = getRandomArbitrary(0.4, 0.95);

    const asteroidsSize = `(80vh / 8) * ${randAsteroidsSize}`

    return `
            <div id="${generateAsteroidsID(id)}" class="asteroids-card">
                <div 
                    class="asteroids-img asteroids-${randAsteroidsAsset}" 
                    style="height: calc(${asteroidsSize}); top: calc(((80vh / 8) - (${asteroidsSize})) * ${Math.random()}); left: calc(((98vw / 8) - (${asteroidsSize})) * ${Math.random()}); "></div>
            </div>`
}

/**
 * Draw all asteroids
 * @param {Object} game
 * @return void
 * */
const drawAsteroids = (game) => {
    const asteroidsContainer = document.getElementById("asteroids-container");

    game.alienID = getRandomInt(0, 64) // 0-63 -> 64 values

    asteroidsContainer.innerHTML = '';

    for (let i = 0; i < 64; i++) {
        asteroidsContainer.innerHTML += getAsteroidsHTML(i)
    }
}

export { drawAsteroids, generateAsteroidsID, getAsteroidsHTML }


