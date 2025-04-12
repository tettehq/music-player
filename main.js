let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let songTitle = document.getElementById("songTitle");
let coverImg = document.getElementById("cover");
let artistes = document.getElementById("artistes");

let playlist = [
    {
        title: "Kilimanjaro",
        artistes: "Tiwa Savage ft Young John ft Black Sheriff",
        image: "./media/kili_thumb.png",
        source: "./media/tiwa_savage_black_sherif_young_jonn_kilimanjaro_official_lyric_video_mp3_66142.mp3"
    },
    {
        title: "Adenuga",
        artistes: "Joeboy ft Qing Madi",
        image: "./media/thumbnail.png",
        source: "./media/joeboy_ft._qing_madi_adenuga_official_music_video_mp3_57631.mp3"
    },
    {
        title: "Kulosa",
        artistes: "Oxlade",
        image: "./media/kulosa_thumb.png",
        source: "./media/oxlade_ku_lo_sa_official_video_mp3_73851.mp3"
    },
    {
        title: "Holy Ghost",
        artistes: "Omah Lay",
        image: "./media/hgf_thumb.png",
        source: "./media/omah_lay_holy_ghost_official_visualizer_mp3_74633.mp3"
    }
];

let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    loadSongData(currentIndex);
});

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
};

function updateSongUI(index) {
    song.innerHTML = `<source id="source" src="${playlist[index].source}" type="audio/mpeg">`;
    songTitle.innerText = playlist[index].title;
    coverImg.src = playlist[index].image;
    artistes.innerText = playlist[index].artistes;
}

async function loadSongData(index) {
    currentIndex = index;
    updateSongUI(index);
    song.load();

    try {
        await song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    } catch (err) {
        console.error("Playback error:", err);
    }
}

function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    } else {
        song.play().then(() => {
            ctrlIcon.classList.remove("fa-play");
            ctrlIcon.classList.add("fa-pause");
        }).catch(err => {
            console.error("Play error:", err);
        });
    }
}

setInterval(() => {
    progress.value = song.currentTime;
}, 500);

let loop = false;

setInterval(() => {
    if (!loop && song.currentTime >= song.duration) {
        nextSong();
    } else if (loop) {
        loopSong();
    }
}, 1000);

progress.onchange = function () {
    song.currentTime = progress.value;
    song.play().then(() => {
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    }).catch(err => console.error("Seek play error:", err));
};

async function nextSong() {
    currentIndex = (currentIndex + 1) % playlist.length;
    updateSongUI(currentIndex);
    song.load();

    try {
        await song.play();
    } catch (err) {
        console.error("Next song play error:", err);
    }
}

async function prevSong() {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    updateSongUI(currentIndex);
    song.load();

    try {
        await song.play();
    } catch (err) {
        console.error("Previous song play error:", err);
    }
}

function loopSong() {
    if (song.currentTime >= song.duration) {
        song.currentTime = 0;
        song.play().catch(err => console.error("Loop play error:", err));
    }
}