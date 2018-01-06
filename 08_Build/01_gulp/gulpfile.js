const gulp = require('gulp');
const requireDir = require('require-dir');
requireDir('./gulp');

// <--------------- RUN TASKS --------------->
gulp.task('default', gulp.parallel('css', 'js', 'templates', 'images', 'html', 'favicon'));

gulp.task('codestyle', gulp.parallel('codestyle:html', 'codestyle:css', 'codestyle:js'));

gulp.task('start', gulp.parallel('default', 'webServer', 'watch'));
