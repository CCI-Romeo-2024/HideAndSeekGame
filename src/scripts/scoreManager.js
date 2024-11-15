import { debug } from './lib.js';
import {EScreen, screenManager} from './screenManager.js';
import { revealAlien } from './render.js';


/**
 * Return the score of Player
 * @param {Object} game
 * @param {number} game.startTime
 * @param {number} game.endTime
 * @param {number} game.fireCount
 * @param {number} game.difficulty
 * @param {number} game.interval
 * @param {string} game.alienID
 * @param {number} game.currentScreen
 * @return number
 * */
const calculateScore = (game) => {
    const timer = ((game.endTime ? game.endTime : Date.now()) - (game.startTime ? game.startTime : Date.now())) / 1000

    const score = (100000 - ((1000 + game.difficulty*10) * game.fireCount > 1 ? game.fireCount-1 : 0) - (timer) * (game.difficulty*50))


    if (score <= 0 && game.currentScreen === EScreen.game) {

        clearInterval(game.interval)

        revealAlien(game.alienID)

        setTimeout(() => screenManager('lose', game), 3000)

        debug('You lose')
    }

    return score <= 0 ? 0 : score
}



/**
 * Return history of scores
 * @return [number]
 **/
const getScores = () => {
    const scores = JSON.parse(localStorage.getItem('scores'))

    if (!scores) localStorage.setItem('scores', JSON.stringify([]))

    return scores ? scores : []
}

/**
 * Return the best score of scores history
 * @return number
 **/
const getBestScore = () => {
    const score = getScores().sort((a, b) => a - b).pop()
    return score ? score : 0
}

/**
 * Add new score to the scores history
 * @param {number} value
 * @return void
 **/
const addNewScore = (value) => {
    const scores = getScores()

    scores.push(value)

    localStorage.setItem('scores', JSON.stringify(scores))
}


export { calculateScore, getScores, getBestScore, addNewScore }