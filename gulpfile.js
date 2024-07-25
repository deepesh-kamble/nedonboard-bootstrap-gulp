const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');


gulp.task('sass', function() {
  return gulp.src('./scss/**/*.scss')        
    .pipe(sass().on('error', sass.logError)) 
    .pipe(cleanCSS())                        
    .pipe(rename({ suffix: '.min' }))        
    .pipe(gulp.dest('./css'));               
    
});
gulp.task('default', function() {
  gulp.watch('./scss/**/*.scss', gulp.series('sass')); 
});

function style(){
  return gulp.src('./scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.stream());
}

function watch(){
  browserSync.init({
    server:{
      baseDir: './'
    }
  });
  gulp.watch('./scss/**/*.scss',style);
  gulp.watch('./*.html').on('change',browserSync.reload);

}
exports.watch=watch;
exports.style = style;