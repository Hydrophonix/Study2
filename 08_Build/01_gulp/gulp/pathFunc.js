const path = require('path');

function makePath(rootPath, relativePath) {
  let args = [...arguments];

  if (!relativePath) {
    args = [rootPath];
  }
  args.unshift(__dirname);
  return path.join.apply(path, args);
}

function getPathTo(obj) {
  if (typeof obj == 'string') {
    return makePath.bind(this, obj);
  }

  let ret = {};

  for (var index in obj) {
    var item = obj[index];
    ret[index] = getPathTo(item);
  }

  return ret;
}

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
  return this;
}

const pathTo = getPathTo({
  root: { folder: '.' },
  src: { folder: '../src' },
  dist: {
    folder: '../dist',
    style: '../dist/assets/',
    js: '../dist/js/',
    templates: '../dist/templates',
    img: '../dist/img'
  }
});

module.exports = { pathTo, handleError };
