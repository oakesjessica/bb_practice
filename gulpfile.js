var gulp = require('gulp');
var concat = require('gulp-concat');
// var copy = require('gulp-copy');5
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var watch = require('gulp-watch');

var path = {
  node_scripts: [
    './node_modules/font-awesome/css/font-awesome.min.css',
    './node_modules/font-awesome/fonts/*',
    './node_modules/backbone/backbone-min.js',
    './node_modules/backbone/backbone.js',
    './node_modules/backbone/backbone-min.map',
    './node_modules/backbone.marionette/lib/backbone.marionette.min.js',
    './node_modules/backbone.marionette/lib/backbone.marionette.min.js.map',
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/jquery/dist/jquery.min.map',
    './node_modules/underscore/underscore-min.js',
    './node_modules/underscore/underscore-min.js.map'
  ]
};

//  Minify SCSS file, relocate and change extension
gulp.task('sass', function() {
  return gulp.src('client/styles.scss')
    .pipe(sass().on('sass error', sass.logError))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./server/public/assets/styles'))
    .pipe(notify({
      message: 'Successfully sassed files'
    }));
});

//  Minify JS file, relocate and change extension
gulp.task('uglify', function() {
  return gulp.src('client/*.js')
    .pipe(uglify().on('error', util.log))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('./server/public/assets/js'))
    .pipe(notify({
      message: 'Successfully uglified files'
    }));
});

//  Copy files to vendors folder
gulp.task('copy', function() {
  return gulp.src(path.node_scripts, {base: 'node_modules'})
    // .pipe(copy().on('error', util.log))
    .pipe(gulp.dest('server/public/vendors'))
    .pipe(notify({
      message: 'Successfully copied files'
    }));
});

//  Watch files and perform tasks
gulp.task('watch', function() {
  gulp.watch('gulpfile.js', ['sass', 'uglify', 'copy']);
  gulp.watch('client/*.scss', ['sass']);
  gulp.watch('client/*.js', ['uglify']);
});

gulp.task('default', ['sass', 'uglify', 'copy', 'watch']);
