const gulp = require('gulp');
const argv = require('yargs').argv;
const isDevelopment = argv.release;
const p = require('gulp-load-plugins')({ lazy: true });
const { pathTo, handleError } = require('./pathFunc.js');

// <--------------- GENERAL TASKS --------------->
gulp.task('css', function () {
  return gulp.src(pathTo.src.folder('./**/*.less'))
    .pipe(p.if(isDevelopment, p.sourcemaps.init()))
    .pipe(p.concat('style.css'))
    .pipe(p.less({ paths: [pathTo.src.folder()] }))
    .on('error', handleError)
    .pipe(p.autoprefixer())
    .pipe(p.cssnano())
    .pipe(p.if(isDevelopment, p.sourcemaps.write({ sourceRoot: '/_map/css', includeContent: true })))
    .pipe(gulp.dest(pathTo.dist.style()));
});

gulp.task('js', () => {
  return gulp.src(pathTo.src.folder('./**/*.js'))
    .pipe(p.if(isDevelopment, p.sourcemaps.init()))
    .pipe(p.if(isDevelopment, p.babel({
      presets: ['env']
    })))
    // .pipe(p.concat('app.js'))
    .pipe(p.if(isDevelopment, p.uglify()))
    .pipe(p.if(isDevelopment, p.sourcemaps.write({ sourceRoot: '/_map/js', includeContent: true })))
    .pipe(gulp.dest(pathTo.dist.js()));
});

gulp.task('templates', () => {
  return gulp.src(pathTo.src.folder('./**/*.handlebars'))
    .pipe(p.handlebars())
    .pipe(p.wrap('Handlebars.template(<%= contents %>)'))
    // .pipe(p.declare({
    //   namespace: 'App.templates',
    //   noRedeclare: true
    // }))
    .pipe(p.concat('templates.js'))
    .pipe(gulp.dest(pathTo.dist.templates()));
});

gulp.task('html', () => {
  return gulp.src(pathTo.src.folder('./**.html'))
    .pipe(gulp.dest(pathTo.dist.folder()));
});

// <--------------- PICTURES TASKS --------------->
gulp.task('images', function () {
  return gulp.src(pathTo.src.folder('./**/*.{png,gif,jpg,jpeg}'))
    .pipe(p.imagemin())
    .pipe(gulp.dest(pathTo.dist.img()));
});

gulp.task('svg', () => {
  return gulp.src(pathTo.src.folder('./**/*.svg'))
    .pipe(p.svgo())
    .pipe(gulp.dest(function (file) {
      return file.base;
    }));
});

gulp.task('svg:sprites', () => {
  return gulp.src(pathTo.src.folder('./**/*.svg'))
    .pipe(p.svgSprite())
    .pipe(gulp.dest(pathTo.bin.folder()));
});

gulp.task('favicon', () => {
  return gulp.src(pathTo.src.folder('./favicon.ico'))
    .pipe(gulp.dest(pathTo.dist.folder()));
});
