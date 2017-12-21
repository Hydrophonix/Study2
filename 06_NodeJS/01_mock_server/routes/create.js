const express = require('express');
const router = express.Router();
const { apiVersion } = require('./methods/index.js');

router.get(`/:formType/`, (req, res) => {
  res.render(
    req.params.formType,
    {
     title: `New ${req.params.formType}`,
     api: apiVersion
   }
 );
});

module.exports = router;
