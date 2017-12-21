'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')
var cssmin = require('gulp-cssmin')
var rename = require('gulp-rename')
var prefix = require('gulp-autoprefixer')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var imagemin = require('gulp-imagemin')
var browserSync = require('browser-sync').create()


// LIVERELOAD HTML 
gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
})

// Configure CSS tasks.
gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(cssmin())
    .pipe(concat('styles.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
})

// Configure JS.
gulp.task('js', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream())
})

// Configure fonts.
gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*.+(eot|svg|ttf|woff|woff2)')
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.stream())
})

// Configure image stuff.
gulp.task('images', function () {
  return gulp.src('src/img/**/*.+(png|jpg|gif|svg|ico)')
    //.pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.stream())
})

gulp.task('default', ['html', 'sass', 'js', 'fonts', 'images'], function () {
  browserSync.init({
    server: './dist'
  })
  
  gulp.watch('src/*.html', ['html'])
  gulp.watch('src/scss/**/*.scss', ['sass'])
  gulp.watch('src/js/**/*.js', ['js'])
  gulp.watch('src/fonts/**/*.+(eot|svg|ttf|woff|woff2)', ['fonts'])
  gulp.watch('src/img/**/*.+(png|jpg|gif|svg|ico)', ['images'])
  gulp.watch('./dist/*.html').on('change', browserSync.reload)
})
