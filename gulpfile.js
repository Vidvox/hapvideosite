var gulp = require('gulp'),
    sass = require('gulp-sass'),
    ejs = require('gulp-ejs'),
    runSequence = require('run-sequence'),
    sitemap = require('gulp-sitemap')

gulp.task('sass', function () {
  return gulp.src('src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('docs/styles'))
})

gulp.task('scripts', function() {  
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('docs/scripts'))
})

gulp.task('ejs',function(){  
  return gulp.src('src/views/*.ejs')
    .pipe(ejs({},{}, {ext:'.html'}))
    .pipe(gulp.dest('docs/'))
})

gulp.task('images',function(){  
  return gulp.src('src/images/**/*.*')
    .pipe(gulp.dest('docs/images/'))
})

gulp.task('videos',function(){  
  return gulp.src('src/videos/**/*.*')
    .pipe(gulp.dest('docs/videos/'))
})

gulp.task('move-google-verification', function(){  
  return gulp.src('google8e356c7d3c1d1496.html')
    .pipe(gulp.dest('docs/'))
})

gulp.task('sitemap', function () {
  gulp.src('docs/**/*.html', {
          read: false
      })
      .pipe(sitemap({
          siteUrl: 'https://hap.video'
      }))
      .pipe(gulp.dest('./docs'))
})

gulp.task('watch', function() {  
    gulp.watch('src/styles/**/*.scss', ['sass'])
    gulp.watch('src/js/**/*.js', ['scripts'])
    gulp.watch('src/views/**/*.ejs', ['ejs'])
    gulp.watch('src/images/**/*.*', ['images'])
    gulp.watch('src/videos/**/*.*', ['videos'])
})

gulp.task('build', ['sass', 'scripts', 'ejs', 'images', 'videos', 'move-google-verification'], function (cb) {
  runSequence(['sitemap'], cb);
})

gulp.task('default', ['build', 'watch'])