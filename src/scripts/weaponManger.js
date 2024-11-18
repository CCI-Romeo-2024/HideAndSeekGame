import {getRotationAngle, getDistance, debug} from './lib.js';

const arrow = document.querySelector('.weapon');
// const bullet = document.getElementById('bullet');

let arrowPos = {
    x: 0,
    y: 0
};


const updateArrowPosition = () => {
    arrowPos.x = window.innerWidth/2;
    arrowPos.y = window.innerHeight - (200/2 - (100-60));
}


document.addEventListener('mousemove', (e) => {
    const mousePos = {x: e.clientX, y: e.clientY}

    const rotationAngle = getRotationAngle(mousePos, arrowPos);

    arrow.style.transform = ` rotate(${rotationAngle}deg)`
});

window.addEventListener('resize', updateArrowPosition)


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


updateArrowPosition()

export { fireBulletAnimation }