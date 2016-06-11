var gulp = require('gulp'),
    mochaPhantomJs = require('gulp-mocha-phantomjs'),
    transport = require('gulp-seajs-transport'),
    seajsCombo = require('gulp-seajs-combo'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean');

gulp.task('transport', function () {
     return gulp.src('./src/**/*.js')
        .pipe(transport())
        .pipe(gulp.dest('.build'));
});
gulp.task('test', function () {
    return gulp.src('test/runner.html')
        .pipe(mochaPhantomJs());
});
gulp.task('combo', ['clean'], function () {
     return gulp.src('src/rRequest.js')
        .pipe(seajsCombo())
        .pipe(rename('rRequest-debug.js'))
        .pipe(gulp.dest('dist'));
});
gulp.task('uglify', ['combo'], function () {
    return gulp.src('dist/rRequest-debug.js')
        .pipe(rename('rRequest.js'))
        .pipe(uglify({
            mangle: {except: ['require', 'exports', 'module', '$']},
            compress: true
        })).pipe(gulp.dest('dist'));
});
gulp.task('clean', ['test'], function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});
gulp.task('default', ['clean', 'combo', 'uglify']);
