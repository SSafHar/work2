'use strict';

const path = require('path'),
  gulp = require('gulp'),
  iconFont = require('gulp-iconfont'),
  filter = require('gulp-filter'),
  {config, generateIconSass}
    = require('gulp-font-icons');

/**
 * BUILD ICONS
 * */
const ROOT = path.resolve(__dirname, 'src');
const root = path.join.bind(path, ROOT);

Object.assign(config, {
  iconSrc: root('assets/icons/*.svg'),
  iconDest: root('assets/fonts/icon-fonts'),
  sassTemplate: root('assets/styles/core/icon.sass.template'),
  sassDest: root('assets/styles/core'),
  sassOutputName: 'icons.scss',
  fontName: 'icons',
  fontPath: '/assets/fonts/icon-fonts',
  options: {
    appendUnicode: false,
    normalize: false,
    fontName: 'icons'
  },
  className: 'icons',
  comment: 'This file auto generated from gulp file'
});

gulp.task('build:icons', () => {
  return gulp.src(['src/assets/icons/*.svg']).pipe(iconFont({
    fontName: 'icons',
    formats: ['woff', 'woff2', 'ttf', 'svg']
  })).on('glyphs', (glyphs, options) => {
    generateIconSass(glyphs, options);
  }).pipe(gulp.dest('src/assets/fonts/icon-fonts'));
});


/**
 * LINT STYLES
 * */
const sassLint = require('gulp-sass-lint');

gulp.task('lint:styles', ['build:icons'], () => {
  return gulp.src(['src/**/*.scss']).pipe(sassLint()).pipe(sassLint.format()).pipe(sassLint.failOnError());
});


/**
 * BUILD SERVER
 * */
const DIST_PATH = `dist`;
const BACKEND_PATH = `${DIST_PATH}/backend`;
const typescript = require('gulp-typescript');
const tsProject = typescript.createProject('tsconfig.json', {rootDir: './'});

const DATA_DEST_PATH = `${BACKEND_PATH}/data`;
const wait = require('gulp-wait');
const clean = require('gulp-clean');

gulp.task('clean:data', () => {
  return gulp.src(`${DATA_DEST_PATH}/**/*`, {read: false})
    .pipe(filter(['**', '!**/*.js']))
    .pipe(wait(2000))
    .pipe(clean());
});

gulp.task('copy:data', ['clean:data'], () => {
  return gulp.src(['backend/data/**/*'])
    .pipe(gulp.dest(DATA_DEST_PATH));
});

gulp.task('build:server', ['copy:data'], () => {
  return gulp.src(['backend/**/*.ts'])
    .pipe(tsProject()).pipe(gulp.dest(BACKEND_PATH));
});


/**
 * WATCH SERVER
 * */
gulp.task('watch:server', ['build:server'], () => {
  gulp.watch(['backend/**/*', 'dist/server/**/*', 'dist/browser/**/*'], ['build:server']);
});


/**
 * RUN SERVER
 * */
const nodemon = require('gulp-nodemon');

gulp.task('serve', ['build:icons'], () => {
  nodemon({
    script: `${BACKEND_PATH}/server.js`,
    watch: ['dist'],
    legacyWatch: true,
    delay: 2000
  });
});
