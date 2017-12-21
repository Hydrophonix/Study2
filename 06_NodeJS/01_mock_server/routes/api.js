const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const {
  apiVersion,
  responseStatuses,
  replaceApi,
  objGenerator,
  parseId,
  deleteFolderRecursive,
  getFilesData,
  getFoldersName
} = require('./methods/index.js');

const getFilePath = reqPath =>
  path.join(__dirname, 'api', replaceApi(reqPath));

router.get(`/${apiVersion}/:entity/*`, (req, res) => {
  const filePath = getFilePath(req.path);
  res.append('Access-Control-Allow-Origin', ['*']);
  res.render(
    req.params.entity,
    {data: getFilesData(getFoldersName(filePath), filePath)}
  );
});

router.post(`/${apiVersion}/:formType/`, (req, res) => {
  const filePath = getFilePath(req.path);
  const newID = parseId(filePath);
  const jsonFile = JSON.stringify(
    objGenerator(newID, req.body, req.params.formType)
  ) + '\n';
  fs.mkdirSync(filePath + newID);
  fs.writeFileSync(path.join(filePath, newID, `get.json`), jsonFile);
  res.redirect(`/api/${apiVersion}/${req.params.formType}/`);
});

router.put(`/:formType/`, (req, res) => {
  const filePath = getFilePath(req.path);
  if (fs.statSync(filePath).isDirectory()) {
    const jsonFile = JSON.stringify(
      objGenerator(req.body.id, req.body, req.params.formType)
    ) + '\n';
    fs.writeFileSync(path.join(filePath, req.body.id, 'get.json'), jsonFile);
    res.send(responseStatuses.success);
  } else {
    res.send(responseStatuses.fail);
  }
});

router.delete(`/${apiVersion}/*`, (req, res) => {
  const filePath = getFilePath(req.path);
  if (fs.statSync(filePath).isDirectory()) {
    deleteFolderRecursive(filePath);
    res.send(responseStatuses.success);
  } else {
    res.send(responseStatuses.fail);
  }
});

module.exports = router;
