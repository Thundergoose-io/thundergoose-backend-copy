const express = require('express');
const oauthController = require('../controllers/oauthController');

const router = express.Router();

router.get(
  '/',
  oauthController.getCode,
  (req, res) => {
    res
      .setHeader('Access-Control-Allow-Origin', '*')
      .status(200)
      .json(res.locals.code);
  }
);

router.post(
  '/code',
  oauthController.getToken,
  (req, res) => {
    res
      .setHeader('Access-Control-Allow-Origin', '*')
      .status(200)
      .json(res.locals.code);
  }
);

module.exports = router;
