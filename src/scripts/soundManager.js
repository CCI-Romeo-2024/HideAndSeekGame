const urls = {
    explosion: '../../assets/explosion/explosion2.wav'
}


/**
 * Play audio from list
 * @param {string} soundName
 */
const playSound = (soundName) => {
    if (!urls[soundName]) return;

    const audio = new Audio(urls[soundName]);
    audio.play()
}

export default playSound