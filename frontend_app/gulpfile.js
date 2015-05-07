var browserSync = require('browser-sync').create();

var browserify = require('browserify');
var gulp = require('gulp');
var source = require("vinyl-source-stream");
var reactify = require('reactify');

// current bug in uglify prevents in working with vinly source stream
var uglify = require('gulp-uglify');

var reload = browserSync.reload;

var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');

gulp.task('main-build', function(){
  var b = browserify();
  b.transform(reactify); // use the reactify transform
  b.add('./app/main.jsx');
  return b.bundle()
    .pipe(source('compiled.js'))
    .pipe(reload({stream: true}))
    .pipe(gulp.dest('../public/js'))
});

gulp.task('minify', function(){
  gulp
    .src('../public/js/compiled.js')
    .pipe(uglify())
    .pipe(gulp.dest('../public/js/min'))
})

gulp.task('style-build', function(){
  gulp.src('./scss/main.scss')
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(gulp.dest('../public/css'))
})

gulp.task('reload-after', ['main-build', 'minify'], reload);

gulp.task('default', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.start(['main-build', 'minify', 'style-build']);
    gulp.watch('./app/**/*.*', ['reload-after']);
    gulp.watch('./scss/**/*.*', ['style-build']);
    gulp.watch("css/main.css").on('change', reload);
});