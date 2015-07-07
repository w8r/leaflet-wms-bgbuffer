"use strict";

var gulp = require('gulp');
var karma = require('karma').server;
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

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

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['copy'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      connect.reload();
    });

  gulp.watch('test/**/*.js', ['test'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('dev', ['watch', 'connect'])

gulp.task('build', ['copy', 'compress']);

gulp.task('default', ['test', 'build']);
