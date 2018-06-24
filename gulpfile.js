var gulp = require("gulp");
var ts = require("gulp-typescript");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var tsProject = ts.createProject("tsconfig.json");
var es = require("event-stream");
var inject = require("gulp-inject");

gulp.task("dev-build", function() {
  var tsfiles = gulp
    .src(["pokemon-essentials/**/*.ts", "bootstrap.ts"])
    .pipe(sourcemaps.init())
    .pipe(
      tsProject({
        noImplicitAny: false
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./dist"));
  gulp
    .src("./project/index.html")
    .pipe(inject(es.merge(tsfiles), { relative: true }))
    .pipe(gulp.dest("./project"));
});

gulp.task("watch", function() {
  gulp.watch("pokemon-essentials/**/*.ts", ["dev-build"]);
});

gulp.task("default", ["watch"]);
