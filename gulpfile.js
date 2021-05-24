const { series, src, dest, parallel } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');

    let paths = {
        sass: {
            src: './scss/index.scss',
            watch:'./scss/**/*.scss',
            dest: './src/'
        }
    }

    function scss() { 
        return src(paths.sass.src)
        .pipe(sass({
            outputStyle: 'nested'
        }).on('error', sass.logError))
        .pipe(csso())
        .pipe(dest(paths.sass.dest))  
    }

    function watch() {
        gulp.watch(paths.sass.watch, scss);
    }


exports.css = scss;
exports.default = scss;
exports.watch = watch;