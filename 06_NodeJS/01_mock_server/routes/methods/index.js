const fs = require('fs');
const apiVersion = require('../../package').version;

const responseStatuses = {
   success: {
     status: `success`,
     data: 'some data if needed'
   },
   fail: {
     status: `fail`,
     errorCode: 'codeID'
   },
   not_found: {
     status: `fail`,
     message: 'This file was not found'
   }
};

const replaceApi = path => path.replace(`/${apiVersion}/`, '/');

const objGenerator = (id, obj, formType) => {
  if (formType === 'posts') {
    return [{
      postId: id,
      imgUrl: obj.imgUrl || 'https://static.tplugin.com/tplugin/img/unknown-user.png',
      likeCount: obj.likeCount || 0,
      description: obj.description || 'No description',
      userId: id
    }];
  } else {
    return [{
      id: id,
      name: obj.name || 'No name',
      password: obj.password || 'No password',
      email: obj.email || 'no@email.com',
      image: obj.imgUrl || 'https://static.tplugin.com/tplugin/img/unknown-user.png',
      following: {
        tags: [{
          name: obj.tags || 'No Tag',
          active: true
        }],
        users: [{
          id: obj.users || 'No user',
          active: true
        }],
      }
    }]
  }
};

const parseId = folderPath => {
  let id = getFoldersName(folderPath).pop();
  const newId = `00${++id}`;
  return newId.substr(newId.length - 3, 3);
};

const deleteFolderRecursive = path => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const getFoldersName = folderPath =>
  folderPath
    ? fs.readdirSync(folderPath)
    : res.send(ANSWER[2]);

const getFilesData = (arr, folderPath) =>
  Array.from(arr, item =>
    JSON.parse(fs.readFileSync(
      `${folderPath}${item}/get.json`, 'utf8'
    ))[0]);

module.exports = {
  apiVersion,
  responseStatuses,
  replaceApi,
  objGenerator,
  parseId,
  deleteFolderRecursive,
  getFilesData,
  getFoldersName
};
