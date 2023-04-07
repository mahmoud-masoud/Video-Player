const video = document.querySelector('video');
const playPauseBtn = document.querySelector('.play__pause');
const stopBtn = document.querySelector('.stop');
const currentTime = document.querySelector('.current__time');
const maxTime = document.querySelector('.max__time');
const hiddenPlayPauseBtn = document.querySelector('.hidden__play__pause');
const timeLine = document.querySelector('.time__line');

let isPlaying = false;
video.controls = false;

document.addEventListener('DOMContentLoaded', () => {
  video.addEventListener('click', clickOnVideo);

  function clickOnVideo() {
    if (isPlaying) {
      hiddenPlayPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      hiddenPlayPauseBtn.classList.add('animation');
      hiddenPlayPauseBtn.addEventListener('animationend', () => {
        hiddenPlayPauseBtn.classList.remove('animation');
      });
      pause();
    } else {
      hiddenPlayPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      hiddenPlayPauseBtn.classList.add('animation');
      hiddenPlayPauseBtn.addEventListener('animationend', () => {
        hiddenPlayPauseBtn.classList.remove('animation');
      });
      play();
    }
  }

  playPauseBtn.addEventListener('click', () => {
    isPlaying ? pause() : play();
  });

  stopBtn.addEventListener('click', stop);

  function play() {
    isPlaying = true;
    video.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }

  function pause() {
    isPlaying = false;
    video.pause();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }

  function stop() {
    video.currentTime = 0;
    pause();
  }

  video.addEventListener('timeupdate', () => {
    currentTime.textContent = formatTime(video.currentTime);
    maxTime.textContent = formatTime(video.duration);
    if (video.currentTime === video.duration) {
      pause();
    }
    const progress = (video.currentTime / video.duration) * 100;
    timeLine.value = progress;
  });

  timeLine.addEventListener('input', () => {
    video.currentTime = (+timeLine.value * video.duration) / 100;
  });

  function formatTime(time) {
    if (time && !isNaN(time)) {
      const minutes =
        Math.floor(time / 60) < 10
          ? `0${Math.floor(time / 60)}`
          : Math.floor(time / 60);
      const seconds =
        Math.floor(time % 60) < 10
          ? `0${Math.floor(time % 60)}`
          : Math.floor(time % 60);
      return `${minutes}:${seconds}`;
    }
    return '00:00';
  }
});
