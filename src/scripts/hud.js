const hudElement = document.getElementById('hud-score');


/**
 * Update score in HUD
 * @param {number} value - new value for the score
 * @return void
 * */
const updateScore = (value) => {
    hudElement.innerText = `${value.toFixed(0)}`;
}

export { updateScore }