var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var streamify = require('gulp-streamify');
var reactify = require('reactify');
var es6ify = require('es6ify');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

var path = {
	HTML: 'src/index.html',
	DEST: 'public',

	JS_ENTRY: 'src/js/app.js',
	JS_SRC_OUT: 'app.js',
	JS_MIN_OUT: 'app.min.js',
	JS_SRC_DEST: 'public/js',
	JS_MIN_DEST: 'public/js',
	LIVERELOAD_ENTRY: 'src/js/livereload.js',
	LIVERELOAD_MIN_OUT: 'livereload.min.js',

	SASS_ENTRY: 'src/sass/app.scss',
	SASS_SRC_OUT: 'app.css',
	SASS_MIN_OUT: 'app.min.css',
	SASS_SRC_DEST: 'public/css',
	SASS_MIN_DEST: 'public/css',
};

var browserifyConfig = {
	entries: path.JS_ENTRY,
	transform: [reactify, es6ify],
	debug: true,
	cache: {}, packageCache: {}, fullPaths: true
};

gulp.task('copy', function() {
	gulp.src(path.HTML)
	.pipe(gulp.dest(path.DEST))
	.pipe(livereload());
});

gulp.task('sass', function() {
	var bundle = gulp.src(path.SASS_ENTRY)
	.pipe(sourcemaps.init())
	.pipe(sass.sync().on('error', sass.logError))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(path.SASS_SRC_DEST))
	.pipe(livereload());

	gutil.log('react-template-gulp:',  gutil.colors.cyan('Compiled SASS'));

	return bundle;
});

// Compiles JS
function compile(bundle) {
	bundle
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

	return bundle;
}
gulp.task('compile', function() {
	var bundle = browserify(browserifyConfig);
	return compile(bundle);
});

function compileLiveReload() {
	gutil.log('compileLiveReload');
	return browserify({
		entries: path.LIVERELOAD_ENTRY,
		transform: [es6ify],
		debug: true,
		cache: {}, packageCache: {}, fullPaths: true
	})
	.bundle()
	.on('error', function(err) {
		gutil.log('react-template-gulp:',  gutil.colors.red('livereload compilation error'));
		gutil.log(gutil.colors.bgBlack(gutil.colors.white(err.message)));
		gutil.beep();
		this.emit('end');
	})
	.pipe(source(path.LIVERELOAD_MIN_OUT))
	.pipe(streamify(uglify()))
	.pipe(gulp.dest(path.JS_MIN_DEST));
}
gulp.task('compile-livereload', function() {
	return compileLiveReload();
});

gulp.task('watch', function() {
	// Watch index.html
	gulp.watch(path.HTML, ['copy']);

	// Watch SASS
	gulp.watch('src/sass/**/*.scss', ['sass']);

	// Compile our bundle
	var bundle = browserify(browserifyConfig);
	compile(bundle);

	// Re-compile on change
	var watcher = watchify(bundle);
	watcher.on('update', function () {
		compile(bundle);
	});

	// Listen to livereload
	compileLiveReload();
	livereload.listen();

	return watcher;
});

gulp.task('build-js', function() {
	return browserify(browserifyConfig)
	.bundle()
	.on('error', function(err) {
		gutil.log('react-template-gulp:',  gutil.colors.red('compilation error'));
		gutil.log(gutil.colors.bgBlack(gutil.colors.white(err.message)));
		gutil.beep();
		this.emit('end');
	})
	.pipe(source(path.JS_MIN_OUT))
	.pipe(streamify(uglify()))
	.pipe(gulp.dest(path.JS_MIN_DEST));
});

gulp.task('build-sass', function() {
	return gulp.src(path.SASS_ENTRY)
	.pipe(sass())
	.pipe(sass.sync().on('error', sass.logError))
	.pipe(rename(path.SASS_MIN_OUT))
	.pipe(cssnano())
	.pipe(gulp.dest(path.SASS_MIN_DEST));
});

gulp.task('build', ['build-js', 'build-sass']);
gulp.task('default', ['copy', 'sass', 'watch']);