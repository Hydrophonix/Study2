const gulp = require('gulp');

const p = require('gulp-load-plugins')({ lazy: true });
const { pathTo, handleError } = require('./pathFunc.js');

// <--------------- CODE STYLE --------------->
gulp.task('codestyle:html', () => {
  return gulp.src([pathTo.src.folder('./**/*.html'),'!node_modules/**'])
    .pipe(p.htmlhint('.htmlhintrc'))
    .pipe(p.htmlhint.reporter())
    .pipe(gulp.dest(function (file) {
      return file.base;
    }));
});

gulp.task('codestyle:css', () => {
  return gulp.src([pathTo.src.folder('./**/*.{css,less}'),'!node_modules/**'])
    .pipe(p.csscomb().on('error', handleError))
    .pipe(gulp.dest(function (file) {
      return file.base;
    }));
});

gulp.task('codestyle:js', () => {
  return gulp.src([pathTo.src.folder('./**/*.js'),'!node_modules/**'])
    .pipe(p.eslint({
      fix: true
    }))
    .pipe(p.eslint.format())
    .pipe(p.eslint.failOnError())
    .pipe(gulp.dest(function (file) {
      return file.base;
    }));
});
