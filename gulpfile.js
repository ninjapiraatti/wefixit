var gulp = require('gulp');

var clean           = require('gulp-clean');
var rename          = require('gulp-rename');
var jshint          = require('gulp-jshint');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');

var destDir = 'ProcessWire/site';

gulp.task('clean', function() {
    return gulp.src([destDir + '/templates', destDir + '/modules'], {read: false})
        .pipe(clean());
});

gulp.task('assets', function() {
    return gulp.src(['src/**/*', '!src/**/*.js', '!src/**/*.css', '!src/**/*.scss'])
        .pipe(gulp.dest(destDir));
});

gulp.task('css', function() {
    return gulp.src('src/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(destDir));
});


gulp.task('lint', function() {
    return gulp.src(['src/**/*.js', '!src/**/*-min.js', '!src/**/picturefill.js', '!src/**/jssor.slider.min.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('js', function() {
    var jsDest = destDir + '/templates/js';

    return gulp.src('src/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename({
            suffix: '-min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('watch', function() {
    gulp.watch(['src/**/*', '!src/**/*.js', '!src/**/*.css', '!src/**/*.scss'], ['assets']);
    gulp.watch('src/**/*.scss', ['css']);
    gulp.watch('src/**/*.js', ['lint', 'js']);
});

gulp.task('default', ['assets', 'css', 'lint', 'js', 'watch']);
