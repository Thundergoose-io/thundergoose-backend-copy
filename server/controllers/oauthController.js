const axios = require('axios');
const querystring = require('querystring');
// const db = require('../models/userModels');

const oauthController = {};
// oauthController.getCode = async (req, res, next) => {
//   console.log('WE ARE IN GET CODE OF OAUTHCONTROLLER');
//   res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri${process.env.gitHubRedirectURL}?path='/'&scope=user:email`);
//   return next();
// };
oauthController.getToken = async (req, res, next) => {
  console.log('WE R IN GET TOKEN OAUTH CONTROLLER');
  const { code } = req.query.code;
  //  (code);
  const githubToken = await axios
    .post(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client__secret=${process.env.CLIENT_SECRET}&code=${code}`)
    .then((response) => response.data);
  const decoded = querystring.parse(githubToken);
  const accessToken = decoded.access_token;

  // res.locals.user = axios
  //   .get('https://api.github.com/user', {
  //     headers: { Authorization: `Bearer ${accessToken}` }
  //   })
  //   .then((user) => user.data);
  return next();
};

module.exports = oauthController;
