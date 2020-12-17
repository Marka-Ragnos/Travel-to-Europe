const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const server = require("browser-sync").create();
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
// const concatWithUseStrict = [
//    "source/js/file1.js",
//    "source/js/file2.js",
//    "source/js/file3.js",
// ];

const css = () => {
   return (
      gulp
         .src("source/sass/style.scss")
         .pipe(plumber())
         .pipe(sourcemap.init())
         .pipe(sass())
         .pipe(
            postcss([
               autoprefixer({
                  grid: true,
                  overrideBrowserslist: ["last 5 versions"],
                  cascade: true,
               }),
            ])
         )
         // .pipe(gulp.dest("build/css"))
         .pipe(csso())
         .pipe(rename("style.min.css"))
         .pipe(sourcemap.write("."))
         .pipe(gulp.dest("build/css"))
         .pipe(server.stream())
   );
};

exports.css = css;

const watch = () => {
   server.init({
      server: "build/",
      notify: false,
      open: true,
      cors: true,
      ui: false,
   });
   gulp.watch("source/sass/**/*.scss", gulp.series(css));
   gulp.watch("source/img/sprite/*.svg", gulp.series(sprite, html, refresh));
   gulp.watch("source/*.html", gulp.series(html, refresh));
   gulp.watch("source/parts/**/*.html", gulp.series(html, refresh));
   gulp.watch("source/js/*.js", gulp.series(js, refresh));
};

exports.watch = watch;

const refresh = (done) => {
   server.reload();
   done();
};

exports.refresh = refresh;

const images = () => {
   return gulp
      .src("source/img/**/*.{jpg,png,svg}")
      .pipe(
         imagemin([
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 3 }),
            imagemin.svgo(),
         ])
      )
      .pipe(gulp.dest("source/img"));
};

exports.images = images;

const getWebp = () => {
   return gulp
      .src("source/img/**/*.{png,jpg}")
      .pipe(webp({ quality: 90 }))
      .pipe(gulp.dest("source/img"));
};

exports.getWebp = getWebp;

const sprite = () => {
   return gulp
      .src("source/img/sprite/*.svg")
      .pipe(
         svgstore({
            inlineSvg: true,
         })
      )
      .pipe(rename("sprite.svg"))
      .pipe(gulp.dest("build/img/sprite"));
};

exports.sprite = sprite;

const html = () => {
   return gulp
      .src("source/*.html")
      .pipe(posthtml([include()]))
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest("build"));
};

exports.html = html;

const copy = () => {
   return gulp
      .src(
         [
            "source/fonts/**/*.{woff,woff2}",
            "source/img/*.*",
            // "source/js/*.js",
            "source/libs/**/*.*",
            "source/*.ico",
         ],
         {
            base: "source",
         }
      )
      .pipe(gulp.dest("build"));
};

exports.copy = copy;

const clean = () => {
   return del("build");
};

exports.clean = clean;

const js = () => {
   return (
      gulp
         // .src("source/js/**.js")
         .src("source/js/!(vendor.js)*.js")
         .pipe(sourcemap.init())
         .pipe(babel())
         .pipe(uglify())
         .pipe(concat("script.min.js"))
         // .pipe(rename("script.min.js"))
         .pipe(sourcemap.write("."))
         .pipe(gulp.dest("build/js"))
   );
};

const jsVendor = () => {
   return (
      gulp
         .src("source/js/vendor.js")
         .pipe(uglify())
         .pipe(rename("vendor.min.js"))
         .pipe(gulp.dest("build/js"))
   );
};

exports.jsVendor = jsVendor;

exports.build = gulp.series(clean, copy, css, js, jsVendor, sprite, html);

exports.start = gulp.series(clean, copy, css, js, jsVendor, sprite, html, watch);
