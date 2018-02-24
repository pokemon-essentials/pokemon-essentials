var gulp = require("gulp");
var ts = require("gulp-typescript");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var tsProject = ts.createProject("ts/tsconfig.json");

gulp.task("build", function () {
  return gulp.src('ts/**/*.ts')
    .pipe(sourcemaps.init()) // This means sourcemaps will be generated
    .pipe(ts({
      noImplicitAny: false,
      outFile: 'pokemon_essentials.js'
    }))
    .pipe(uglify()) // You can use other plugins that also support gulp-sourcemaps
    .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
    .pipe(gulp.dest('dist'));
});

gulp.task("dev-build", function () {
  return gulp.src('ts/**/*.ts')
    .pipe(ts({
      noImplicitAny: false,
      outFile: 'pokemon_essentials.js'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task("watch", function () {
  gulp.watch('ts/**/*.ts', ['dev-build']);
});

gulp.task('default', ['watch']);
