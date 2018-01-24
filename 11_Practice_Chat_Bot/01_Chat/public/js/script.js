const socket = io();
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const sr = new SpeechRecognition();
sr.lang = 'ru-RU';
sr.interimResults = false;

const h1 = document.getElementsByTagName('h1')[0];

h1.addEventListener('click', ()=> {
  socket.emit('chat message', 'какой топовый танк');
});

socket.on('bot reply', replyText => {
  document.body.insertAdjacentHTML('beforeEnd', `<p>${replyText}</p>`);
})
 '55minyta'
 
