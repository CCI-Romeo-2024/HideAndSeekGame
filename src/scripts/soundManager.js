const urls = {
    explosion: '../../assets/sounds/explosion.wav',
    start: '../../assets/sounds/start.wav',
    fire: '../../assets/sounds/fire.wav',
    lose: '../../assets/sounds/lose.wav',
    win: '../../assets/sounds/win.wav'
}


/**
 * Play audio from list
 * @param {string} soundName
 * @return HTMLAudioElement
 */
const playSound = (soundName) => {
    if (!urls[soundName]) return null;

    const audio = new Audio(urls[soundName]);
    audio.play()
    return audio
}

export default playSound