require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

// const path = require('path');
const express = require('express');

const app = express();
const { PORT } = process.env;
const { auth } = require('./models/userModels');

const oauthController = require('./controllers/oauthController');

auth();

// app.use(express.static('stylesheets'));
app.use(express.json());
app.use(bodyParser.json());

app.use(cors());
/**
 * require routers
 */
const apiRouter = require('./routes/api');
const userRouter = require('./routes/user');
// oauthController.getToken,
app.get('/token', (req, res, next) => { console.log(req.query.code); return next(); }, oauthController.getToken, (req, res) => res.sendStatus(200));
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
