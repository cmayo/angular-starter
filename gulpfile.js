var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var angularFilesort = require('gulp-angular-filesort');
var ngAnnotate = require('gulp-ng-annotate');
var ngHtml2Js = require('gulp-ng-html2js');
var minifyHtml = require('gulp-minify-html');

var APP_FOLDER = './app',
    LIBS_FOLDER = './app/libs',
    DEST_FOLDER = './www/dist';

var PATHS = {
    less: [APP_FOLDER+'/css/**/*.less'],
    js: [APP_FOLDER+'/js/**/*.js'],
    css: [APP_FOLDER+'/css/*.css'],
    templates: [APP_FOLDER+'/templates/**/*.html'],
    fonts: [LIBS_FOLDER+'/bootstrap/dist/fonts/*']
};

var vendorFiles = [
    LIBS_FOLDER+'/angular/angular.js',
    LIBS_FOLDER+"/angular-animate/angular-animate.js",
    LIBS_FOLDER+"/angular-resource/angular-resource.js",
    LIBS_FOLDER+"/angular-sanitize/angular-sanitize.js",
    LIBS_FOLDER+"/angular-ui-router/release/angular-ui-router.js",
    LIBS_FOLDER+"/angular-bootstrap/ui-bootstrap.js",
    LIBS_FOLDER+"/angular-bootstrap/ui-bootstrap-tpls.js"
];

var vendorCssFiles = [
    LIBS_FOLDER+'/bootstrap/dist/css/bootstrap.css'
];

gulp.task('default', ['js', 'css', 'vendor', 'fonts', 'templates']);

gulp.task('vendor', function (done) {
    gulp.src(vendorFiles)
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(DEST_FOLDER+'/js/'))
        .on('end', done);
});

gulp.task('css', function (done) {
    gulp.src(PATHS.css.concat(vendorCssFiles))
        .pipe(concat('styles.css'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(DEST_FOLDER+'/css/'))
        .on('end', done);
});

gulp.task('js', function (done) {
    gulp.src(PATHS.js)
        .pipe(angularFilesort())
        .pipe(concat('all.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(DEST_FOLDER+'/js/'))
        .on('end', done);
});

gulp.task('fonts', function () {
    return gulp.src(PATHS.fonts)
        .pipe(gulp.dest(DEST_FOLDER+'/fonts'));
});

gulp.task('templates', function (done) {
    gulp.src(PATHS.templates)
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2Js({
            moduleName: 'templates'
        }))
        .pipe(concat('templates.js'))
        .pipe(ngAnnotate())
        //.pipe(gulp.dest('./www/js/'))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(uglify())
        .pipe(gulp.dest(DEST_FOLDER+'/js/'))
        .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch(PATHS.js, ['js']);
    gulp.watch(PATHS.css, ['css']);
    gulp.watch(PATHS.templates, ['templates']);
});
