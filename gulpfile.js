const { parallel } = require('gulp')
const gulp = require('gulp'),
	browserSync = require('browser-sync'),
	rename = require('gulp-rename'),
	cleanCSS = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin'),
	htmlmin = require('gulp-htmlmin'),
	del = require('del'),
	ttfToWoff2 = require('gulp-ttf2woff2'),
	webpack = require('webpack-stream');

gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: 'dist',
		},
	})

	gulp.watch('src/*.html').on('change', browserSync.reload)
})

gulp.task('styles', function () {
	return gulp
		.src('src/scss/**/*.+(scss|sass)')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(
			rename({
				prefix: '',
				suffix: '.min',
			})
		)
		.pipe(autoprefixer())
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream())
})

gulp.task('scripts', function () {
	return gulp
		.src('src/js/_script.js')
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream())
})

gulp.task('watch', function () {
	gulp.watch('src/scss/**/*.+(scss|sass|css)', gulp.parallel('styles'))
	gulp.watch(['src/js/**/*.js'], gulp.parallel('scripts'))
	gulp.watch('src/*.html').on('change', gulp.parallel('html'))
	gulp.watch('src/img/**/*').on('add', gulp.parallel('images'))
	gulp.watch('src/icons/**/*').on('add', gulp.parallel('icons'))
	gulp.watch('src/fonts/**/*').on('add', gulp.parallel('fonts'))
})

gulp.task('html', function () {
	return gulp
		.src('src/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist/'))
})

gulp.task('fonts', function () {
	gulp.src('src/fonts/*.ttf')
		.pipe(ttfToWoff2())
		.pipe(gulp.dest('dist/fonts'))
		.pipe(browserSync.stream());
	return gulp.src('src/fonts/icomoon/**')	
		.pipe(gulp.dest('dist/fonts'))
		.pipe(browserSync.stream())
})

gulp.task('icons', function () {
	return gulp
		.src('src/icons/**/*')
		.pipe(gulp.dest('dist/icons'))
		.pipe(browserSync.stream())
})

gulp.task('mailer', function () {
	return gulp.src('src/mailer/*').pipe(gulp.dest('dist/mailer'))
})

gulp.task('images', function () {
	return gulp
		.src('src/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
		.pipe(browserSync.stream())
})

gulp.task('del', function(done) {
	del.sync(['dist']);
	done();
});



gulp.task(
	'default',
	gulp.series(
		'del',
		gulp.parallel(
			'watch',
			'server',
			'styles',
			'scripts',
			'fonts',
			'icons',
			'mailer',
			'html',
			'images'
		)
	)
)
