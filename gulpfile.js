var gulp = require('gulp');
var swig = require('gulp-swig');
var data = require('gulp-data');
var watch = require('gulp-watch');


gulp.task('templates', function() {
  return gulp.src(['./dev/*.html', './dev/*.swig'])
    .pipe(swig())
    .pipe(gulp.dest('./public'));
});

gulp.task('scripts', function() {
  return gulp.src('./dev/assets/javascripts/main.js')
    .pipe(gulp.dest('./public/assets/javascripts'));
});

gulp.task('images', function () {
  return gulp.src('./dev/assets/images/**/*.svg')
    .pipe(gulp.dest('./public/assets/images/'));
});

gulp.task('default', ['templates', 'scripts', 'images']);

gulp.task('watch', ['default'], function() {
    // gulp.watch('./dev/assets/stylesheets/**/*.scss', ['sass']);
    gulp.watch(['./dev/*.html', './dev/*.swig'], ['templates']);
    gulp.watch('./dev/assets/javascripts/main.js', ['scripts']);
    gulp.watch('./dev/assets/images/**/*.svg', ['images']);
});