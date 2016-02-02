var gulp = require('gulp'), 
    glp = require('gulp-load-plugins')(),
    path = require('path');

// get config info from json files 
// or concat the files first then require the one total file
function getConfigInfo() {
    var resumeData = require('./src/resumeinfo.json'),
        configInfo = require('./resume.config.json'); 
        localTitle = require('./src/i18n/' + configInfo.lang_type + '.dict.json'),

    // update resume info
    delete require.cache[require.resolve('./src/resumeinfo.json')];
    delete require.cache[require.resolve('./resume.config.json')];
    delete require.cache[require.resolve('./src/i18n/' + configInfo.lang_type + '.dict.json')];

    // copy the info to one obj 
    for(var key in localTitle) {
        resumeData[key] = localTitle[key];
    }
    for( var key in configInfo) {
        resumeData[key] = configInfo[key];
    }
    return resumeData;
}


gulp.task('jade2html', function() {
    gulp.src('./src/index.jade')
        .pipe(glp.data({resumeinfo: getConfigInfo()}))
        .pipe(glp.jade({
            pretty: true
        }))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(glp.sourcemaps.init())
    .pipe(glp.sass().on('error', glp.sass.logError))
    .pipe(glp.sourcemaps.write())
    .pipe(gulp.dest('./dist/css/'));
});

// watch task with livereload
gulp.task('watch', function() {
    glp.livereload.listen();
    gulp.watch(['dist/**']).on('change', glp.livereload.changed);
    gulp.watch('./src/**/*.jade', ['jade2html']);
});

// server task
gulp.task('connect', function() {
    glp.connect.server({
        root: 'dist',
        port: '8100',
        livereload: true
    });
});

// deaault task
gulp.task('default', ['jade2html','watch', 'connect']);