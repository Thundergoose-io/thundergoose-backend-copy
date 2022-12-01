require('dotenv').config();
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const cors = require('cors');

const path = require('path');
const express = require('express');

const app = express();
const { PORT } = process.env;


const oauthController = require('./controllers/oauthController');
const { constants } = require('buffer');
const { auth } = require('./models/userModels');
const session = require('express-session');

app.use(cookieParser());

auth();

// app.use(express.static('stylesheets'));
app.use(express.json());
app.use(bodyParser.json());

app.use(cors());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));
/**
 * require routers
 */
const apiRouter = require('./routes/api');
const userRouter = require('./routes/user');

// oauthController.getToken,
app.post(
  '/token',
  oauthController.getToken,
  (req, res) => res.send(res.locals.token)
);

// route handler to respond with main app
app.use('/api', apiRouter);

app.use('/user', userRouter);

app.use('*', (req, res, next) => {
  const errorObj = {
    log: 'Page not found',
    status: 404,
    message: { err: 'Error 404: Page not Found' },
  };
  next(errorObj);
});

app.use((err, req, res) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign(defaultErr, err);
  // console.log(errorObj.log);

  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
