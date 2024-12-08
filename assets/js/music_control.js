const music = document.getElementById('background-music');
const controlBtn = document.getElementById('control-btn');
const IconSound = document.getElementById('icon-sound')

let isPlaying = true;
music.play()

document.addEventListener('scroll', () => {
    if (music.paused) {
        music.play().catch((error) => {
            console.log(error.message);
        });
    }
}
)

window.addEventListener('load', () => {
    if (music.paused) {
        music.play().catch((error) => {
            console.log(error.message);
        });
    }
});


controlBtn.addEventListener('click', () => {
    if (isPlaying) {
        music.pause();
        IconSound.src = 'assets/svgs/sound-off-svgrepo-com.svg';
    } else {
        music.play().catch((error) => {
            console.log(error);
        });
        IconSound.src = 'assets/svgs/sound-volume-2-svgrepo-com.svg';
    }
    isPlaying = !isPlaying;
});