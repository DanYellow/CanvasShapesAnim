var gulp = require('gulp');
var swig = require('gulp-swig');
var data = require('gulp-data');


gulp.task('templates', function() {
  return gulp.src(['./dev/*.html', './dev/*.swig'])
    .pipe(swig())
    .pipe(gulp.dest('./public'));
});

gulp.task('scripts', function() {
  return gulp.src('./dev/assets/javascripts/main.js')
    .pipe(gulp.dest('./public/assets/javascripts'));
});

gulp.task('default', ['templates']);