var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	prettify = require('gulp-html-prettify'),
	gls = require('gulp-live-server'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish');

gulp.task('default', ['sass','js','prettify','image','watch','serve']);

// SASS com CONCAT
gulp.task('sass', function () {
 return gulp.src('assets/src/sass/**/*.scss')
   .pipe(concat('styles.min.css'))
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('assets/css'));
});




//UGLIFY JS com CONCAT
gulp.task('js', function() {
  return gulp.src('assets/src/js/**/*.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
});

//HTML Prettify
gulp.task('prettify', function() {
  gulp.src(['_html/**/*.html'])
    .pipe(prettify())
    .pipe(gulp.dest('.'));
});


//IMAGEFY
gulp.task('image', () =>
	gulp.src('assets/src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('assets/images'))
);


//WATCH
gulp.task('watch', function() {
  gulp.watch('assets/src/sass/**/*.scss',['sass']);
  gulp.watch('assets/src/js/**/*.js',['js']);
  gulp.watch('assets/src/images/*',['image']);
  gulp.watch('_html/**/*.html',['prettify']);
});


//Live Reload - SERVER
gulp.task('serve', function(){
	var server = gls.static('./','8000');
	server.start();
	
	gulp.watch('assets/css/**/*.css', function(file){
		gls.notify.apply(server,[file]);
	});
	gulp.watch('assets/js/**/*.js', function(file){
		gls.notify.apply(server,[file]);
	});
	gulp.watch('assets/images/*', function(file){
		gls.notify.apply(server,[file]);
	});
	gulp.watch('./*.html', function(file){
		gls.notify.apply(server,[file]);
	});
	
});


//
gulp.task('lint', function() {
  return gulp.src('assets/src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});