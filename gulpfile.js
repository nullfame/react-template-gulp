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
	MINIFIED_OUT: 'app.min.js',
	OUT: 'app.js',
	DEST: 'public',
	DEST_BUILD: 'public/js',
	DEST_SRC: 'public/js',
	ENTRY_POINT: './src/js/app.js'
};

gulp.task('copy', function(){
	gulp.src(path.HTML)
	.pipe(gulp.dest(path.DEST))
	.pipe(livereload());
});

function compile(bundle) {
	bundle
	.transform(babelify, {presets: ["es2015", "react"]})
	.bundle()
	.pipe(source(path.OUT))
	.pipe(gulp.dest(path.DEST_SRC))
	.pipe(livereload());

	gutil.log('react-template-gulp:',  gutil.colors.cyan('compiled'));
}

gulp.task('watch', function() {
	// Listen to livereload
	livereload.listen();

	// Watch index.html
	gulp.watch(path.HTML, ['copy']);

	// Compile our bundle
	var bundle = browserify(path.ENTRY_POINT);
	compile(bundle);

	// Re-compile on change
	var watcher = watchify(bundle);
	watcher.on('update', function () {
		compile(bundle);
	});
});

gulp.task('build', function(){
	browserify(path.ENTRY_POINT)
	.transform(babelify, {presets: ["es2015", "react"]})
	.bundle()
	.pipe(source(path.MINIFIED_OUT))
	.pipe(streamify(uglify()))
	.pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('default', ['copy', 'watch']);