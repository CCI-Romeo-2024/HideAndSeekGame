import {debug} from './lib.js';

/**
 * Return the score of Player
 * @param {number} startTime
 * @param {number} endTime
 * @param {number} fireCount
 * @param {number} difficulty
 * @return number
 * */
const calculateScore = ({startTime, endTime , fireCount, difficulty}) => {
    const timer = ((endTime ? endTime : Date.now()) - (startTime ? startTime : Date.now())) / 1000

    const score = (100000 - (1000 * fireCount) - (timer) * (difficulty*10))
    return score < 0 ? 0 : score
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
    const score = getScores().sort((a, b) => a - b).shift()
    return score ? score : 0
}

/**
 * Add new score to the scores history
 * @param {number} value
 * @return void
 **/
const addNewScore = (value) => {
    localStorage.setItem('scores', JSON.stringify(getScores().push(value)))
}


export { calculateScore, getScores, getBestScore, addNewScore }