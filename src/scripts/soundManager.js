const EAudio = {
    explosion: 'explosion',
    music: 'music',
    start: 'start',
    fire: 'fire',
    lose: 'lose',
    win: 'win'
}

let LAudio = {
    explosion: {
        url: '../../assets/sounds/explosion.wav',
        volume: 0.8,
        loop: false
    },
    music: {
        url: '../../assets/sounds/music.wav',
        volume: 0.3,
        loop: true
    },
    start: {
        url: '../../assets/sounds/start.wav',
        volume: 1,
        loop: false
    },
    fire: {
        url: '../../assets/sounds/fire.wav',
        volume: 0.3,
        loop: false
    },
    lose: {
        url: '../../assets/sounds/lose.wav',
        volume: 1,
        loop: false
    },
    win: {
        url: '../../assets/sounds/win.wav',
        volume: 1,
        loop: false
    }
};


/**
 * Play audio from list
 * @param {EAudio} soundName
 * @return HTMLAudioElement
 */
const playSound = (soundName) => {
    if (!EAudio[soundName]) return null;

    const currentAudioSettings = LAudio[soundName]

    const audio = new Audio(currentAudioSettings.url);
    audio.play().then(() => {
        audio.volume = currentAudioSettings.volume
        audio.loop = currentAudioSettings.loop
    })

    return audio
}

export { playSound, EAudio, LAudio }