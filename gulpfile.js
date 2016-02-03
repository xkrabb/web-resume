var gulp = require('gulp'),
    glp = require('gulp-load-plugins')(),
    path = require('path');

var srcPath = {
    i18n: './src/i18n/',
    img: './src/images/*',
    js: './src/js/*.js',
    vendor: './src/vendor/**',
    scss: './src/scss/**/*.scss',
    views: './src/views/*.jade',
    indexpage: './src/index.jade',
    config: './resume.config.json',
    resumeinfo: './src/resumeinfo.json'
};

var desPath = {
    js: './dist/js/',
    css: './dist/css/',
    vendor: './dist/vendor',
    img: './dist/images'
};

// get config info from json files 
// or concat the files first then require the one total file
function getConfigInfo() {
    var resumeData = require(srcPath.resumeinfo),
        configInfo = require(srcPath.config),
        localTitle = require(srcPath.i18n + configInfo.lang_type + '.dict.json');

    // update resume info
    delete require.cache[require.resolve(srcPath.resumeinfo)];
    delete require.cache[require.resolve(srcPath.config)];
    delete require.cache[require.resolve(srcPath.i18n + configInfo.lang_type + '.dict.json')];

    // copy the info to one obj 
    for (var key in localTitle) {
        resumeData[key] = localTitle[key];
    }
    for (var key in configInfo) {
        resumeData[key] = configInfo[key];
    }
    return resumeData;
}

gulp.task('copysrc', function() {
    gulp.src(srcPath.vendor)
        .pipe(gulp.dest(desPath.vendor));
});

gulp.task('copypic', function() {
    gulp.src(srcPath.img)
        .pipe(gulp.dest(desPath.img));
});

gulp.task('script', function() {
    gulp.src(srcPath.js)
        .pipe(gulp.dest(desPath.js));
})

gulp.task('jade2html', function() {
    gulp.src(srcPath.indexpage)
        .pipe(glp.data({
            resumeinfo: getConfigInfo()
        }))
        .pipe(glp.jade({
            pretty: true
        }))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('sass', function() {
    return gulp.src(srcPath.scss)
        .pipe(glp.sourcemaps.init())
        .pipe(glp.sass().on('error', glp.sass.logError))
        .pipe(glp.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(desPath.css))
        .pipe(glp.rename({
            suffix: '.min'
        }))
        .pipe(glp.cssnano())
        .pipe(glp.sourcemaps.write('.'))
        .pipe(gulp.dest(desPath.css));
});

// watch task with livereload
gulp.task('watch', function() {
    glp.livereload.listen();
    gulp.watch(['dist/**', '!dist/vendor/**']).on('change', glp.livereload.changed);
    gulp.watch('./src/**/*.jade', ['jade2html']);
    gulp.watch(srcPath.scss, ['sass']);
    gulp.watch(srcPath.js, ['script']);
});

// server task
gulp.task('connect', function() {
    glp.connect.server({
        root: 'dist',
        port: '8100',
        livereload: true
    });
});

// deaault task for develop
gulp.task('default', ['copypic', 'copysrc', 'jade2html', 'script', 'sass', 'watch', 'connect']);
