// Require plugins
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    rigger = require('gulp-rigger'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    tinypng = require('gulp-tinypng');

// Define path
var htmlSource = [
    'html/**'
]
var scssSource = [
    'libs/uikit/sass/uikit.scss',
    'css/sass/**.scss',
];
var sassOutput = 'css/src';
var cssSource = [
    'css/src/uikit.css',
    'css/src/styles.css'
];
var jsSource = [
    // Dependencies
    'libs/jquery/jquery.js',
    // Core UIKit
    'libs/uikit/js/core/core.js',
    'libs/uikit/js/core/touch.js',
    'libs/uikit/js/core/utility.js',
    'libs/uikit/js/core/smooth-scroll.js',
    'libs/uikit/js/core/scrollspy.js',
    'libs/uikit/js/core/toggle.js',
    'libs/uikit/js/core/alert.js',
    'libs/uikit/js/core/button.js',
    'libs/uikit/js/core/dropdown.js',
    'libs/uikit/js/core/grid.js',
    'libs/uikit/js/core/modal.js',
    'libs/uikit/js/core/nav.js',
    'libs/uikit/js/core/offcanvas.js',
    'libs/uikit/js/core/switcher.js',
    'libs/uikit/js/core/tab.js',
    'libs/uikit/js/core/cover.js',
    // Components UIKit
    'libs/uikit/js/components/grid.js',
    'libs/uikit/js/components/accordion.js',
    'libs/uikit/js/components/slideset.js'
];
var imgSource = './img/src/**';

// Compile HTML
gulp.task('html', function() {
    return gulp.src('html/*.html')
    .pipe(rigger())
    .pipe(gulp.dest("./"))
    .pipe(browserSync.reload({stream: true}));
});

// Compile SCSS
gulp.task('sass', function() {
    return gulp.src(scssSource)
    // .pipe(sourcemaps.init())
    .pipe(sass())
    // .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(sassOutput))
    .pipe(browserSync.reload({stream: true}));
});

// Concat and minify CSS
gulp.task('css', function() {
    return gulp.src(cssSource)
    .pipe(concat('main.min.css'))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleanCSS())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({stream: true}));
});

// Concat and minify JavaScript
gulp.task('js', function() {
    return gulp.src(jsSource)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(browserSync.reload({stream: true}));
});

// Optimize images
gulp.task('img', function () {
    gulp.src(imgSource)
    .pipe(tinypng('rrltU3pcUq2ZN9ca7myZnSsFEeqpTTvK'))
    .pipe(gulp.dest('./img'));
});

// Setup Browsersync
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
        },
    });
});

// Watchers
gulp.task('watch', ['html', 'sass', 'css', 'js', 'browser-sync'], function() {
    gulp.watch(htmlSource, ['html']);
    gulp.watch(scssSource, ['sass']);
    gulp.watch(cssSource, ['css']);
    gulp.watch(jsSource, ['js']);
    gulp.watch(htmlSource, browserSync.reload);
});

// Default Task
gulp.task('default', ['watch']);