var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var babel = require('gulp-babel');
var ngAnnotate = require('gulp-ng-annotate');

// sass preprocesor
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream())
});

// html templates
gulp.task('templates', function() {
  return gulp.src('app/templates/**/*.html')
    .pipe(gulp.dest('dist/templates'));
});

// minify js, css and get all together
gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpif('js/my.js', babel({ presets: ['es2015'] })))
    .pipe(gulpif('js/my.js', ngAnnotate()))
    .pipe(gulpif('js/my.js', uglify()))
    .pipe(gulpif('css/my.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// run server (need for browser reloading)
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
});

// image optimazing
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|svg|gif|jpg|jpeg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
});

// clean dist folder (before building production version)
gulp.task('clean:dist', function() {
  return del.sync('dist');
});

// watch file changes and do some things
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', ['useref', browserSync.reload]);
  gulp.watch('app/templates/*.html', ['templates','useref', browserSync.reload]);
  gulp.watch('app/js/**/*.js', ['useref', browserSync.reload]);
});

/**********************************************************************/

// run development mode
gulp.task('default', function(callback) {
  runSequence('sass', ['useref', 'templates', 'browserSync', 'images'], 'watch',
    callback
    )
});

// run production mode
gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass',
    ['templates', 'useref', 'images'],
    callback
  )
});