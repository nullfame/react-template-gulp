var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var streamify = require('gulp-streamify');
var babelify = require('babelify');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');

var path = {
	HTML: 'src/index.html',
	DEST: 'public',

	JS_ENTRY: 'src/js/app.js',
	JS_SRC_OUT: 'app.js',
	JS_MIN_OUT: 'app.min.js',
	JS_SRC_DEST: 'public/js',
	JS_MIN_DEST: 'public/js',
};

gulp.task('copy', function() {
	gulp.src(path.HTML)
	.pipe(gulp.dest(path.DEST))
	.pipe(livereload());
});

// Compiles JS
function compile(bundle) {
	bundle
	.transform(babelify, {presets: ["es2015", "react"]})
	.bundle()
	.on('error', function(err) {
		gutil.log('react-template-gulp:',  gutil.colors.red('compilation error'));
		gutil.log(gutil.colors.bgBlack(gutil.colors.white(err.message)));
		gutil.beep();
		this.emit('end');
	})
	.pipe(source(path.JS_SRC_OUT))
	.pipe(gulp.dest(path.JS_SRC_DEST))
	.pipe(livereload());

	gutil.log('react-template-gulp:',  gutil.colors.cyan('Compiled JavaScript'));
}

gulp.task('watch', function() {
	// Watch index.html
	gulp.watch(path.HTML, ['copy']);

	// Compile our bundle
	var bundle = browserify(path.JS_ENTRY);
	compile(bundle);

	// Re-compile on change
	var watcher = watchify(bundle);
	watcher.on('update', function () {
		compile(bundle);
	});

	// Listen to livereload
	livereload.listen();
});

gulp.task('build', function() {
	browserify(path.JS_ENTRY)
	.transform(babelify, {presets: ["es2015", "react"]})
	.bundle()
	.pipe(source(path.JS_MIN_OUT))
	.pipe(streamify(uglify()))
	.pipe(gulp.dest(path.JS_MIN_DEST));
});

gulp.task('default', ['copy', 'watch']);