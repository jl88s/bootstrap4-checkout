const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');


// compile scss into css
// add additional pipes below before the 'dest' pipe!
function style() {
    //  where is my scss file?
    return gulp.src('./scss/**/*.scss')

    // automatically compile vendor prefixes
    .pipe(autoprefixer({ cascade: false }))

    // pass that file through sass compiler
    .pipe(sass().on('error', sass.logError))

    // where do I save the compiled css?
    .pipe(gulp.dest('css'))

    //  stream changes to all browser
    .pipe(browserSync.stream())

}

function watch() {
    browserSync.init({
        server: {
            // this saves it in the current directory
            baseDir: './'
        }
    });

    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
