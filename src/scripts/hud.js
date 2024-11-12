const arrow = document.querySelector('.weapon');

const arrowX = window.innerWidth/2;
const arrowY = window.innerHeight - 70;

const rotateArrow = (event) => {
    const dx = event.clientX - arrowX;
    const dy = event.clientY - arrowY;


    const angleRadians = Math.atan2(dy, dx);
    const angleDegrees = angleRadians * (180 / Math.PI);


    arrow.style.transform = `rotate(${angleDegrees}deg)`;
}

document.addEventListener('mousemove', rotateArrow);