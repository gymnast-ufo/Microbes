import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'gulp-autoprefixer';
import include from 'gulp-include';
import browserslist from 'browserslist';

import PATH from './path';

const sassServe = () => {
  return gulp.src(PATH.src.sass)
    .pipe(include({
      includePaths: [
        __dirname + "/node_modules",
        __dirname + "/css"
      ]
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss())
    .pipe(gulp.dest(PATH.dest.sass));
};

const sassBuild = () => {
  return gulp.src(PATH.src.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss())
    .pipe(gulp.dest(PATH.dest.sass));
};

const sassWatch = () => {
  gulp.watch(PATH.watch.sass, ['sass']);
};

export { sassServe, sassBuild, sassWatch };