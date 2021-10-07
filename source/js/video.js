
// Поигрался с подключением файла все работает.
// Видео контент также присутствует в папке билд
// Разобраться с анимацией, анимация работает через video.js?

// Заменить кастомную кнопку BigPlayButton() на .play__button

const myPlayer = document.getElementById('my-player');
const playButton = document.querySelector('.video__button');
const invokePlayButton = () => myPlayer.play();


playButton.addEventListener(
  'click',
  () => {
    invokePlayButton();
  },
)
