const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { apiVersion } = require('./methods/index.js');

router.get(`/:formType/:id/`, (req, res) => {
  const filePath = path.join(__dirname, 'api', req.params.formType, req.params.id, 'get.json');
  const data = JSON.parse(fs.readFileSync(filePath))[0];
  res.render(
    `edit_${req.params.formType}`,
    {
      title: `Edit ${req.params.formType}/${req.params.id}`,
      api: apiVersion,
      type: req.params.formType,
      data: data
    }
  );
});

module.exports = router;
