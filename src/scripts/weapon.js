import { getRotationAngle } from './lib.js';

const arrow = document.querySelector('.weapon');
// const bullet = document.getElementById('bullet');

let arrowPos = {
    x: 0,
    y: 0
};


const updateArrowPosition = () => {
    arrowPos.x = window.innerWidth/2;
    arrowPos.y = window.innerHeight - (200/2 - (100-40));
}


updateArrowPosition()

document.addEventListener('mousemove', (e) => {
    const mousePos = {x: e.clientX, y: e.clientY}

    const rotationAngle = getRotationAngle(mousePos, arrowPos);

    arrow.style.transform = ` rotate(${rotationAngle}deg)`
    // bullet.style.transform = `rotate(${rotationAngle}deg)`

});

window.addEventListener('resize', updateArrowPosition)