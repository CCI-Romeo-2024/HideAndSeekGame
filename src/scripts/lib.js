import env from './env.js';

/**
 * Return random number between 2 numbers
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

/**
 * Return random 'float' between 2 numbers
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
const getRandomArbitrary = (min, max) =>{
    return Math.random() * (max - min) + min;
}

/**
 * Return angle to fix point from a point
 * @param {Object} pos1
 * @param {number} pos1.x
 * @param {number} pos1.y
 *
 * @param {Object} pos2
 * @param {number} pos2.x
 * @param {number} pos2.y
 *
 * @return {number}
 */
const getRotationAngle = (pos1, pos2) => {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;

    const angleRadians = Math.atan2(dy, dx);
    return angleRadians * (180 / Math.PI) + 90;
}


/**
 * Return distance between 2 point
 * @param {Object} pos1
 * @param {number} pos1.x
 * @param {number} pos1.y
 *
 * @param {Object} pos2
 * @param {number} pos2.x
 * @param {number} pos2.y
 *
 * @return {number}
 */
const getDistance = (pos1, pos2) => {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;

    return Math.sqrt(dx * dx + dy * dy);
}


/**
 * Debug function, edit env file to activate/deactivate all message in console !
 * @param {...any} args
 * @return void
 */
const debug = (...args) => {
    if (env.DEBUG) console.log(...args)
}

export { getRandomInt, getRandomArbitrary, getRotationAngle, getDistance, debug };
