/**
 * Created by 212474815 on 4/30/16.
 */
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json', { sortOutput: true });
var sourcemaps = require('gulp-sourcemaps');
const target = 'build';
const toGulpTarget = function() {
    return gulp.dest(target)
};
const paths = {
    tocopy: ['package.json', 'src/main/typescript/**/*.ts'],
    images: 'client/img/**/*'
};

gulp.task('jshint', function () {
   return gulp.src('src/main/javascript/**/*.js')
       .pipe(jshint())
       .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('copy', function () {
    gulp.src(paths.tocopy).pipe(toGulpTarget())
});

gulp.task('compile', ['copy'], function () {
   gulp.src('src/main/javascript/**/*.js')
       .pipe(toGulpTarget())
   ;

   tsProject.src()
       .pipe(sourcemaps.init())
       .pipe(ts(tsProject))
       .pipe(sourcemaps.write())
       .pipe(toGulpTarget())
   ;
   gulp.src('src/main/html/**')
       .pipe(toGulpTarget())
   ;
});

gulp.task('build', ['compile'], function() {
   console.log("Build task.");
});

gulp.task('default', ['build'], function() {
   console.log("Default task.");
});

gulp.task('watch', function() {
    gulp.watch('src/main/javascript/**/*.js', ['jshint']);
});

