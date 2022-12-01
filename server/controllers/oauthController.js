const axios = require('axios');
const querystring = require('querystring');
// const db = require('../models/userModels');

const oauthController = {};

oauthController.getToken = async (req, res, next) => {
  console.log(req.body);
  const codeForReq = req.body.code;
  console.log(codeForReq);
  //  (code);
  console.log(process.env.CLIENT_ID);
  console.log(process.env.CLIENT_SECRET);
  const githubToken = await axios
    .post(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${codeForReq}`)
    .then((response) => response.data);
  const decoded = querystring.parse(githubToken);
  console.log('decode ------------------------------------------');
  console.log(decoded);
  const accessToken = decoded.access_token;
  console.log('access ------------------------------------------');
  console.log(accessToken);
  res.locals.token = accessToken;
  // const username = await axios
  //   .get('https://api.github.com/user', {
  //     headers: { Authorization: `token ${accessToken}` }
  //   })
  //   .then((response) => console.log(response));
  // console.log('USERNAME ------------------------------------------');
  // console.log(username);
  return next();
};

module.exports = oauthController;
