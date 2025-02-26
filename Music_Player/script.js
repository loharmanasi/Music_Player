const musicContainer = document.getElementById("music-container");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

const songs = ["Summer of Love", "Ghost", "Happier Than Ever", "Heat Waves", "Mood Ring", "Peaches"];
let songIndex = 1;

function getSongTitle(song) {
    return song.replace(/\s+/g, "").toLowerCase();
}

function loadSong(song) {
    title.innerText = song;
    audio.src = `assests/${getSongTitle(song)}.mp3`;
    cover.src = `assests/${getSongTitle(song)}.jpg`;
}


function playSong() {
    musicContainer.classList.add("play");
    playButton.querySelector("i.fas").classList.remove("fa-play");
    playButton.querySelector("i.fas").classList.add("fa-pause");
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove("play");
    playButton.querySelector("i.fas").classList.remove("fa-pause");
    playButton.querySelector("i.fas").classList.add("fa-play");
    audio.pause();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playButton.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play");
    isPlaying ? pauseSong() : playSong();
});

prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);

// Init
loadSong(songs[songIndex]);