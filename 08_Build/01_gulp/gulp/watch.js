const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const { pathTo } = require('./pathFunc.js');

// <--------------- SERVER --------------->
const serverConfig = {
  server: {
    baseDir: './dist'
  },
  host: 'localhost',
  port: 3000,
  notify: false
};

gulp.task('webServer', function() {
  browserSync.init(serverConfig);
});

gulp.task('watch', () => {
  gulp.watch(pathTo.src.folder('./**/*.less'), gulp.parallel('css')).on("change", reload);
  gulp.watch(pathTo.src.folder('./**/*.js'), gulp.parallel('js')).on("change", reload);
  gulp.watch(pathTo.src.folder('./**/*.{png,gif,jpg,jpeg}'), gulp.parallel('images')).on("change", reload);
  gulp.watch(pathTo.src.folder('./**/*.html'), gulp.parallel('html')).on("change", reload);
});
