import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import streamify from 'gulp-streamify';

import PATH from './path';
import { scriptAlias } from './alias';

const scriptsServe = () => {
  PATH.src.scripts.forEach((entry, index) => {
    const bundle = browserify({
      entries: entry,
      global: true
    });

    bundle.transform(babelify, {
      global: true
    });
    bundle.bundle()
      .pipe(source(scriptAlias[index]))
      .pipe(gulp.dest(PATH.dest.scripts));
  });
};

const scriptsBuild = () => {
  PATH.src.scripts.forEach((entry, index) => {
    const bundle = browserify({
      entries: entry,
      global: true
    });

    bundle.transform(babelify, {
      global: true
    });
    bundle.bundle()
      .pipe(source(scriptAlias[index]))
      .pipe(streamify(uglify()))
      .pipe(gulp.dest(PATH.dest.scripts));
  });
};

const scriptsWatch = () => {
  gulp.watch(PATH.watch.scripts, ['scripts']);
};

module.exports =  { scriptsServe, scriptsBuild, scriptsWatch };