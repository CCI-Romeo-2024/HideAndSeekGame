import { drawAsteroids } from './render.js'
import playSound from './soundManager.js';
import { updateScore } from './hud.js';
import { getRandomInt } from './lib.js';

const gameDefault = {
    alienID: 0,
    startTime: 0,
    endTime: 0,
    fireCount: 0
}

const game = {...gameDefault}


document.addEventListener("click", (event) => {
    if (!event.target.classList.contains("asteroids-img") || event.target.classList.contains("active")) return;

    event.target.classList.add("active");

    game.fireCount++

    console.log(event.target.parentElement.id);



    event.target.style.backgroundImage = `url('../../assets/explosion/explosion2.webp?${new Date().getTime()}')`;

    playSound('explosion')
})


const calculateScore = ({startTime, endTime, fireCount}) => {
    return (100_000 - (1_000 * (fireCount) - ((endTime - startTime)/1_000) * 1_000))
}


drawAsteroids(game)