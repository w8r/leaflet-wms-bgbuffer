"use strict";

var gulp = require('gulp');
var karma = require('karma').server;
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

/**
 * Run test once and exit
 */
gulp.task('test', function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('autotest', function() {
  return gulp.watch(['src/**/*.js', 'test/**/*.js'], ['test']);
});

gulp.task('compress', function() {
  gulp.src('src/**/*.js')
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js',
      dirname: '.'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function() {
  gulp.src('src/**/*.js')
    .pipe(rename({
      dirname: '.'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['copy', 'compress']);

gulp.task('default', ['test', 'build']);
