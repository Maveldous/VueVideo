let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    ulify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserify = require('browserify'),
    vueify = require('vueify'),
    envify = require('envify/custom'),
    source = require('vinyl-source-stream');


gulp.task('scss', function(){
    return gulp.src('app/scss/**/index.scss')
        .pipe(sass( {outputStyle : 'compressed'}))
        .pipe(rename({ suffix: '.min'}))
        .pipe(gulp.dest('dest/css'))
        .pipe(browserSync.reload({stream: true}));
})

gulp.task('script', function(){
    browserify('app/js/index.js')
        .transform(vueify)
        .transform(
            { global: true },
            envify({ NODE_ENV: 'production' })
        )
        .bundle()
        .pipe(source('scripts.all.js'))
        .pipe(gulp.dest('dest/js'))
        .pipe(browserSync.reload({stream: true}));
})

gulp.task('html', function(){
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dest/'))
        .pipe(browserSync.reload({stream: true}));
})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dest"
        }
    });
});


gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', ['scss'])
    gulp.watch('app/*.html', ['html'])
    gulp.watch('app/js/**/*.js', ['script'])
    gulp.watch('app/vue/**/*.vue', ['script'])
})

gulp.task('default', ['scss', 'html', 'script' ,'browser-sync', 'watch'])