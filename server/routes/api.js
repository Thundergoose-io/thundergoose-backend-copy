const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();


// Madeline and Cameron:
// Added timeComplexity middleware
router.post(
  '/',
  apiController.getTranslation, apiController.getTimeComplexity, 
  (req, res, next) => {
    res
      .setHeader('Access-Control-Allow-Origin', '*')
      .status(200)
      .json( {text: res.locals.text, complexityText : res.locals.complexityText});
  }
);

module.exports = router;
