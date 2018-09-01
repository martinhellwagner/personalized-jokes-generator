var babelify = require("babelify");
var gulp = require("gulp");
var gulpLiveServer = require("gulp-live-server");
var rename = require('gulp-rename');
var browserify = require("browserify");
var source = require("vinyl-source-stream");

gulp.task("build", ["copyHTMLFiles", "bundleJSFiles", "startServer"]);

gulp.task("copyHTMLFiles", function() {
  return gulp.src([
    "src/html/main.html",
    "src/html/main.css"
  ])
  .pipe(rename(function(path) {
    path.basename = "index";
  }))
  .pipe(gulp.dest("build"));
});

gulp.task("bundleJSFiles", ["copyHTMLFiles"], function() {
  return browserify({
    entries: "src/html/main.js"
  })
  .transform(babelify.configure({
    presets : ["es2015", "react"]
  }))
  .bundle()
  .pipe(source("app.js"))
  .pipe(gulp.dest("build"));
});

gulp.task("startServer", ["copyHTMLFiles", "bundleJSFiles"], function() {
  const server = gulpLiveServer("server.js", undefined, false);
  server.start();
});
