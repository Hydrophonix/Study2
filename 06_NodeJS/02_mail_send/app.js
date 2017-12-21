const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const port = 3000;

const app = express();

const index = require('./controllers/index');
const mail = require('./controllers/mail');
const success = require('./controllers/success');


app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));
app.use(expressSession({secret: 'Hydrophonix', saveUninitialized: false, resave: false}));

app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

app.use('/', index);
app.use('/mail', mail);
app.use('/success', success);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
