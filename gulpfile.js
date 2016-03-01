"use strict";

var gulp =require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	jade = require('gulp-jade'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect');

gulp.task('templates', function () {
	var YOUR_LOCALS = {};
 
  gulp.src('./app/jade/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true
    }))
    .pipe(gulp.dest('./app/'))
});

gulp.task('connect', function() {
  connect.server({
    livereload: true,
    root: 'app',
    port: 8087
  });
});

gulp.task('sass', function(){
	gulp.src('./app/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions', '> 1%', 'ie9'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./app/css'))
		.pipe(rename('style.min.css'))
		.pipe(connect.reload());
});

gulp.task('html', function () {
	gulp.src('./app/*.html')
		.pipe(connect.reload());
});

gulp.task('watch', function () {
  	gulp.watch('./app/sass/*.scss', ['sass']);
  	gulp.watch('./app/*.html', ['html']);
  	gulp.watch('./app/jade/*.jade', ['templates']);
  	gulp.watch('./app/jade/parts/*.jade', ['templates']);

});

gulp.task('default', ['connect', 'sass', 'html','templates', 'watch']);
