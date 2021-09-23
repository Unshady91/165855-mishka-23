const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const del = require("del");
const svgStore = require("gulp-svgstore");
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");
const processhtml = require("gulp-processhtml");
const webp = require("gulp-webp");
const squoosh = require("gulp-libsquoosh");

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

// Удаляет папку build

const clear = () => {
  return del("build");
};

exports.clear = clear;

// Копирует файлы в build

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
};

exports.copy = copy;

// html

const html = () => {
  return gulp.src("source/*.html")
    .pipe(processhtml())
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest("build/"));
};

exports.html = html;

// scripts

const scripts = () => {
  return gulp.src("source/js/index.js")
    .pipe(terser())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"));
};

exports.scripts = scripts;

// sprites

const createSvgSprite = () => {
  return gulp.src("source/img/icons/*.svg")
  .pipe(rename({prefix: 'icon-'}))
    .pipe(svgStore({inlineSvg: true}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
};

exports.createSvgSprite = createSvgSprite;

// images

const copyImages = () => {
  return gulp.src("source/**/*.{jpg,png,svg}")
    .pipe(gulp.dest("build/"));
};

exports.copyImages = copyImages;

const optimizeImages = () => {
  return gulp.src("source/img/*.{jpg,png}")
    .pipe(squoosh())
    .pipe(gulp.dest("build/"));
};

// webp

const convertImagesToWebp = () => {
  return gulp.src("source/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/"))
};

exports.convertImagesToWebp = convertImagesToWebp;

// server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// reload

const reload = (done) => {
  sync.reload();
  done();
};

// watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series(styles));
  gulp.watch("source/js/*.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html, reload));
};

// build

const build = gulp.series(
  clear,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    createSvgSprite,
    convertImagesToWebp,
  )
);

exports.build = build;

exports.default = gulp.series(
  clear,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    createSvgSprite,
    convertImagesToWebp,
  ),
  gulp.series(
    server,
    watcher
  )
);
