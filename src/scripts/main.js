import { getRandomInt, getRandomArbitrary } from "./lib.js";

import "./hud.js";

let game = {
    alienID: 0

}

const generateAsteroidsID = (id) => {
    return `asteroids-${id}`;
}

const getAsteroidsHTML = (id) => {
    const randAsteroidsAsset = getRandomInt(1, 11);

    const randAsteroidsSize = getRandomArbitrary(0.4, 0.95);

    const asteroidsSize = `(90vh / 8) * ${randAsteroidsSize}`



    return `
            <div id="${generateAsteroidsID(id)}" class="asteroids-card">
                <div 
                    class="asteroids-img asteroids-${randAsteroidsAsset}" 
                    style="height: calc(${asteroidsSize}); top: calc(((90vh / 8) - (${asteroidsSize})) * ${Math.random()});; left: calc(((90vw / 8) - (${asteroidsSize})) * ${Math.random()});"></div>
            </div>`
}

const init = () => {
    const asteroidsContainer = document.getElementById("asteroids-container");

    game.alienID = getRandomInt(0, 64) // 0-63 -> 64 values

    for (let i = 0; i < 64; i++) {
        asteroidsContainer.innerHTML += getAsteroidsHTML(i)
    }
}


const bullets = ['asteroids-38', 'asteroids-39']



document.addEventListener("click", (event) => {
    if (!event.target.classList.contains("asteroids-img") || event.target.classList.contains("active")) return;

    event.target.classList.add("active");

    console.log(event.target.parentElement.id);


    event.target.style.backgroundImage = `url('../../assets/explosion/explosion2.webp?${new Date().getTime()}')`;

    playSound('explosion')


    if (bullets.includes(event.target.parentElement.id)) {
        setTimeout(() => {
            event.target.innerHTML = '<img src="../../assets/bullets/bullet.svg" alt="" />'
        }, 250)
    }

})

init()


const playSound = (soundName) => {
    const urls = {
        explosion: '../../assets/explosion/explosion2.wav'
    }

    const audio = new Audio(urls[soundName]);
    audio.play()
}

