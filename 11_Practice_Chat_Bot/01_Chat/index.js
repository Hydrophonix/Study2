const express = require('express');
const path = require('path');
const { APIAI_TOKEN } = require('./config');
const apiai = require('apiai')(APIAI_TOKEN);
const uuidv4 = require('uuid/v4');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('user connected');

  socket.on('chat message', text => {
    console.log(`User said: ${text}`);

    let apiaiReq = apiai.textRequest(text, { sessionId: uuidv4() });

    apiaiReq.on('response', response => {
      let aiText = response.result.fulfillment.speech;

      console.log(`Bot reply: ${aiText}`);

      socket.emit('bot reply', aiText);
    });

    apiaiReq.on('error', error => console.log(error));
    apiaiReq.end();
  });

})

app.get('/', (req, res) => {
  res.render('index');
})
