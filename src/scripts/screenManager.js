import { getScoreHTML, getBestScoreHTML } from './render.js';
import { calculateScore, getBestScore } from './scoreManager.js';

const EScreen = {
    start: 0,
    game: 1,
    win: 2,
    lose: 3
}

const EScreenID = {
    start: 'start-screen',
    game: 'game-screen',
    win: 'win-screen',
    lose: 'lose-screen'
}



/**
 * Function to change current screen
 * @param {string} screenKey
 * @param {Object} game
 * @param {number} game.startTime
 * @param {number} game.endTime
 * @param {number} game.fireCount
 * @param {number} game.difficulty
 * @param {number} game.interval
 * @param {string} game.alienID
 * @param {number} game.currentScreen
 * @return void
 * */
const screenManager = (screenKey, game) => {
    if (!EScreen.hasOwnProperty(screenKey)) return;

    game.currentScreen = EScreen[screenKey];


    if ([EScreen.win, EScreen.lose].includes(game.currentScreen)) {
        const score = getScoreHTML(calculateScore(game))
        const bestScore = getBestScoreHTML(getBestScore())

        // Win
        document.getElementById('score-win-screen').innerText = score
        document.getElementById('score-win-screen2').innerText = score

        document.getElementById('best-score-win-screen').innerText = bestScore
        document.getElementById('best-score-win-screen2').innerText = bestScore

        // Lose
        document.getElementById('score-lose-screen').innerText = score
        document.getElementById('score-lose-screen2').innerText = score

        document.getElementById('best-score-lose-screen').innerText = bestScore
        document.getElementById('best-score-lose-screen2').innerText = bestScore
    }

    document.getElementById(EScreenID[screenKey]).style.display = 'flex'


    Object.values(EScreenID).forEach((id) => {
        if (id === EScreenID[screenKey]) return
        document.getElementById(id).style.display = 'none';
    })
}

export { EScreen, screenManager };