/* eslint no-console: off */


const config = require('./config');
const envConfig = require('../config');

const path = require('path');
const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const useref = require('gulp-useref');
const ngAnnotate = require('gulp-ng-annotate');
const babel = require('gulp-babel');
const lazypipe = require('lazypipe');
const gulpif = require('gulp-if');
const gulpfile = require('gulp-file');
const gulpSize = require('gulp-size');
const templateCache = require('gulp-angular-templatecache');
const browserSync = require('browser-sync').create();
const gulpReplace = require('gulp-replace');
const revAll = require('gulp-rev-all');
const uglify = require('gulp-uglify');
// const jsValidate = require('gulp-jsvalidate');
// const cleanCSS = require('gulp-clean-css');

const inject = `window.env = ${JSON.stringify(envConfig.get('inject'))};`;

const assetPipeline = lazypipe()
  .pipe(sourcemaps.init, config.sourcemaps.init)
  .pipe(() => gulpif(['**/*.js', '!**/node_modules/**'], gulpfile('environment.js', inject)))
  .pipe(() => gulpif(['**/*.js', '!**/node_modules/**'], gulpReplace('__API_ENDPOINT_URL__', envConfig.get('api'))))
  .pipe(() => gulpif(['**/*.js', '!**/node_modules/**'], babel(config.babel)))
  .pipe(() => gulpif(['**/*.js', '!**/node_modules/**'], ngAnnotate(config.ngAnnotate)))
  .pipe(() => gulpif(['**/*.js', '!**/node_modules/**'], uglify(config.uglify)));


gulp.task('clean', () => del(path.join(config.paths.public, '/**/*')));


gulp.task('styles', () => gulp.src(config.paths.stylesheets.in)
  .pipe(sourcemaps.init(config.sourcemaps.init))
  .pipe(sass(config.sass).on('error', sass.logError))
  .pipe(autoprefixer(config.autoprefixer))
  // .pipe(cleanCSS(config.cleanCSS))
  .pipe(sourcemaps.write(config.sourcemaps.write))
  .pipe(gulp.dest(path.join(config.paths.public, config.paths.stylesheets.out)))
  .pipe(gulpSize({ title: 'Stylesheets:', showFiles: true }))
  .pipe(browserSync.stream({ once: true }))
);


gulp.task('application', () => gulp.src(config.paths.application.in)
  .pipe(useref(config.useref, assetPipeline))
  .pipe(sourcemaps.init(config.sourcemaps.init))
  .pipe(sourcemaps.write(config.sourcemaps.write))
  .pipe(gulp.dest(path.join(config.paths.public, config.paths.application.out)))
  .pipe(gulpSize({ title: 'Application:', showFiles: false }))
  .pipe(browserSync.stream({ once: true }))
);


gulp.task('images', () => gulp.src(config.paths.images.in)
  .pipe(gulp.dest(path.join(config.paths.public, config.paths.images.out)))
  .pipe(gulpSize({ title: 'Images:', showFiles: false }))
  .pipe(browserSync.stream({ once: true }))
);


gulp.task('fonts', () => gulp.src(config.paths.fonts.in)
  .pipe(gulp.dest(path.join(config.paths.public, config.paths.fonts.out)))
  .pipe(gulpSize({ title: 'Fonts:', showFiles: false }))
  .pipe(browserSync.stream({ once: true }))
);


gulp.task('templates', () => gulp.src(config.paths.templates.in)
  .pipe(sourcemaps.init(config.sourcemaps.init))
  .pipe(templateCache(config.templateCache))
  .pipe(sourcemaps.write(config.sourcemaps.write))
  .pipe(gulp.dest(path.join(config.paths.public, config.paths.templates.out)))
  .pipe(gulpSize({ title: 'Templates:', showFiles: false }))
);


gulp.task('revision', () => gulp.src(config.paths.revisionedFiles.in)
  .pipe(revAll.revision(config.revision.revOptions))
  // .pipe(revDelete())
  .pipe(gulp.dest(config.paths.revisionedFiles.out))
  .pipe(gulpSize({ title: 'Cache Busting:', showFiles: true }))
);


gulp.task('serve', done => {
  browserSync.init(config.browsersync);
  return done();
});

gulp.task('serve:test', done => {
  const options = Object.assign({}, config.browsersync, {
    ui: false,
    ghostMode: false,
    notify: false,
    codeSync: false,
    port: envConfig.get('test.port'),
  });
  browserSync.init(options);
  return done();
});


gulp.task('notify', done => {
  browserSync.notify('Rebuilding...');
  return done();
});


gulp.task('watch', () => {
  config.watchers.forEach(watcher =>
    gulp.watch(watcher.glob, gulp.series('notify', gulp.series(watcher.tasks)))
  );
});


gulp.task('build', gulp.series([
  'clean',
  gulp.parallel(['images', 'fonts', 'templates', 'styles']),
  'application',
  'revision',
]));

gulp.task('test', gulp.series('serve:test'));
gulp.task('default', gulp.series(['build', 'serve', 'watch']));
