const express = require('express');
// const oauthController = require('../controllers/oauthController');

const router = express.Router();
//  oauthController.getCode,
router.post(
  '/',
  (req, res) => {
    res
      .header('Access-Control-Allow-Origin', '*')
      .status(200)
      .send(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.gitHubRedirectURL}?path=${'/'}&scope=user:email`);
  }
);

// router.post(
//   '/?code',
//   oauthController.getToken,
//   (req, res) => {
//     res
//       .setHeader('Access-Control-Allow-Origin', '*')
//       .status(200)
//       .json(res.locals.code);
//   }
// );

module.exports = router;
