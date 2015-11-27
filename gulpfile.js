var merge = require('merge-stream');

//Requiring Gulp
var gulp = require('gulp');

//Requires the gulp-sass plugin
var sass = require('gulp-sass');

//Requiring autoprefixer
var autoprefixer = require('gulp-autoprefixer');

//Requiring Sourcemaps
var sourcemaps = require('gulp-sourcemaps');

//Auto refresh browser on file save
var browserSync = require('browser-sync');

//Requiring Plumber
var plumber = require('gulp-plumber');

//Requires the gulp-jade plugin
var jade = require('gulp-jade');

gulp.task('task-name', function () {
    gulp.src('src')//Get source files with gulp.src
    .pipe(somePlugin())//Sends it through a gulp plugin
    .pipe(gulp.dest('dest'))//Outputs the file in the destination folder
} );

// Start browserSync server
gulp.task('browserSync', function() {
 browserSync({
  server: {
    baseDir: 'app'
  }
 });
});

gulp.task('templates', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('app/jade/*.+(jade)')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('app/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('sass', function() {

return gulp.src('app/sass/styles.sass') // Get the styles.sass file
.pipe(sourcemaps.init())//Initialize sourcemap plugin
.pipe(plumber())
.pipe(sass.sync().on('error', sass.logError)) //Passes it through a gulp-sass task
.pipe(autoprefixer())//Passes it through gulp-autoprefixer
.pipe(sourcemaps.write())//Writing sourcemaps
.pipe(gulp.dest('app/css')) //Outputs it in the folder
// Reloading the stream
.pipe(browserSync.reload({
    stream: true
    }));
});

gulp.task('watch', ['browserSync', 'templates', 'sass'], function() {
gulp.watch('app/sass/**/*.+(scss|sass)', ['sass']);
gulp.watch('app/jade/**/*.jade', ['templates']);
gulp.watch('app/*.html', browserSync.reload({
    stream: true
    }));
});    

gulp.task('prod', function(){
var html=gulp.src('app/*.html')
.pipe(gulp.dest('dist'))
var css=gulp.src('app/css/*.css')

.pipe(gulp.dest('dist/css'))

var img=gulp.src('app/img/**/*.+(png|jpg|gif|svg)')

.pipe(gulp.dest('dist/img'))

var js=gulp.src('app/js/*.js')

.pipe(gulp.dest('dist/js'))

return merge(html, css, img, js);

});
    

// Creating a default task
gulp.task('default', ['sass', 'templates', 'watch','prod']);