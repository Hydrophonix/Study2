const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Validation form ', errors: req.session.errors, data: '' });
});

module.exports = router;
