const { src, dest, watch, parallel } = require("gulp");

// Sass
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

// JavaScript
const terser = require("gulp-terser-js");

// Images
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const avif = require("gulp-avif");

function imgMinifier(done) {
  const options = {
    optimizationLevel: 3,
  };
  src("assets/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(options)))
    .pipe(dest("build/img"));
  done();
}

function versionAvif(done) {
  const options = {
    quality: 50,
  };
  src("assets/img/**/*.{png,jpg}").pipe(avif(options)).pipe(dest("build/img"));
  done();
}

function javascript(done) {
  src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/js"));
  done();
}

function css(done) {
  src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/css"));
  done();
}

function watcher(done) {
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", javascript);
  done();
}

exports.imgMinifier = imgMinifier;
exports.versionAvif = versionAvif;
exports.javascript = javascript;
exports.css = css;

exports.dev = parallel(imgMinifier, versionAvif, javascript, css, watcher);
