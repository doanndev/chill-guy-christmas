const music = document.getElementById('background-music');
const controlBtn = document.getElementById('control-btn');
const IconSound = document.getElementById('icon-sound')

let isPlaying = false;


window.addEventListener('load', () => {
    if (music.paused) {
        music.play().catch((error) => {
            console.log("Tự động phát bị chặn: " + error.message);
        });
    }
});


controlBtn.addEventListener('click', () => {
    if (isPlaying) {
        music.pause();
        IconSound.src = 'assets/svgs/sound-off-svgrepo-com.svg'; 
    } else {
        music.play().catch((error) => {
            console.log("Lỗi khi phát nhạc: ", error);
        });
        IconSound.src = 'assets/svgs/sound-volume-2-svgrepo-com.svg'; 
    }
    isPlaying = !isPlaying;
});