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
        image: "/media/kili_thumb.png",
        source: "/media/tiwa_savage_black_sherif_young_jonn_kilimanjaro_official_lyric_video_mp3_66142.mp3"
    },
    {
        title: "Adenuga",
        artistes: "Joeboy ft Qing Madi",
        image: "/media/thumbnail.png",
        source: "/media/joeboy_ft._qing_madi_adenuga_official_music_video_mp3_57631.mp3"
    },
    {
        title: "Kulosa",
        artistes: "Oxlade",
        image: "/media/kulosa_thumb.png",
        source: "/media/oxlade_ku_lo_sa_official_video_mp3_73851.mp3"
    },
    {
        title: "Holy Ghost",
        artistes: "Omah Lay",
        image: "/media/hgf_thumb.png",
        source: "/media/omah_lay_holy_ghost_official_visualizer_mp3_74633.mp3"
    }
]
// const playlist1 = ["/media/tiwa_savage_black_sherif_young_jonn_kilimanjaro_official_lyric_video_mp3_66142.mp3", "/media/joeboy_ft._qing_madi_adenuga_official_music_video_mp3_57631.mp3"]

function loadSongData() {
    song.innerHTML = `<source id="source" src=${playlist[0].source} type="audio/mpeg">`;
    songTitle.innerText = playlist[0].title;
    coverImg.src = playlist[0].image;
    artistes.innerText = playlist[0].artistes;
    playPause();
}

document.addEventListener('load', loadSongData());

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
}

function playPause() {
    if (ctrlIcon.classList.contains("fa-pause") && song.play()) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
    else {
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    }
}

if (song.play()) {
    setInterval(() => {
        progress.value = song.currentTime;
    },500)
}

let loop = false;
let interval = parseInt(song.duration * 1000);;
console.log(typeof interval);

setInterval(() => {
    if (!loop && song.currentTime == song.duration) {
        nextSong();
    }
    else {
        loopSong();
    }
}, 1000);

progress.onchange = function() {
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");

    console.log("changed")
}

function nextSong() {
    song.currentTime = 0;
    let source = document.getElementById("source").src;
    for (let i = 0; i < playlist.length; i++ ) {
        if (source.includes(playlist[i].source) == true && i + 1 < playlist.length) {
            song.innerHTML = `<source id="source" src=${playlist[i + 1].source} type="audio/mpeg">`
            songTitle.innerText = playlist[i + 1].title;
            coverImg.src = playlist[i + 1].image;
            artistes.innerText = playlist[i + 1].artistes;
            break;
        }
        else {
            song.innerHTML = `<source id="source" src=${playlist[0].source} type="audio/mpeg">`;
            songTitle.innerText = playlist[0].title;
            coverImg.src = playlist[0].image;
            artistes.innerText = playlist[0].artistes;
        }
    }
    song.load();
    song.play();
}

function prevSong() {
    song.currentTime = 0;
    let lastIndex = playlist.length - 1
    let source = document.getElementById("source").src;
    for (let i = lastIndex; i > -1; i-- ) {
        if (source.includes(playlist[i].source) == true && i - 1 > -1) {
            song.innerHTML = `<source id="source" src=${playlist[i - 1].source} type="audio/mpeg">`
            songTitle.innerText = playlist[i - 1].title;
            coverImg.src = playlist[i - 1].image;
            artistes.innerText = playlist[i - 1].artistes;
            break;
        }
        else {
            song.innerHTML = `<source id="source" src=${playlist[i].source} type="audio/mpeg">`;
            songTitle.innerText = playlist[i].title;
            coverImg.src = playlist[i].image;
            artistes.innerText = playlist[i].artistes;
        }
    }
    song.load();
    song.play();
}

function loopSong() {
    if (song.currentTime == song.duration) {
        song.currentTime = 0;
        song.play();
    }
}