const express = require('express');
const router = express.Router();
const { apiVersion } = require('./methods/index.js');

router.get('/', (req, res, next) => {
  res.render(
    'index',
    {
      title: 'Main',
      api: apiVersion
    });
});

module.exports = router;
