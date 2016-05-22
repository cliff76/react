/**
 * Created by 212474815 on 4/30/16.
 */
var gulp = require('gulp');
var path = require('path');
var del = require('del');
var jshint = require('gulp-jshint');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json', { sortOutput: true });
var sourcemaps = require('gulp-sourcemaps');
const target = 'build';
const toGulpTargetPipe = function(subPath) {
    if(typeof subPath === 'undefined' )
        return gulp.dest(target);
    else if(Object.prototype.toString.call(subPath) === '[object String]' )
        return gulp.dest(path.join(target, subPath));
    else if(Object.prototype.toString.call(subPath) === '[object Array]'){
        subPath.unshift(target);
        return gulp.dest(path.join(...subPath))
    }
};

const paths = {
    client: ['src/main/html/**', 'src/main/www/**'],
    server: ['package.json', 'src/main/typescript/**/*.ts'],
};

gulp.task('jshint', function () {
   return gulp.src('src/main/javascript/**/*.js')
       .pipe(jshint())
       .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function () {
    return del([ 'build' ]);
});

gulp.task('package-client', function () {
    gulp.src(paths.client).pipe(toGulpTargetPipe('www'))
});

gulp.task('compilejs', ['package-client'], function () {
    gulp.src('src/main/javascript/**/*.js')
        .pipe(toGulpTargetPipe())
    ;
});

gulp.task('compilets', ['compilejs'], function () {

   tsProject.src()
       .pipe(sourcemaps.init())
       .pipe(ts(tsProject))
       .pipe(sourcemaps.write())
       .pipe(toGulpTargetPipe())
   ;
});

gulp.task('compile', ['compilets']);

gulp.task('build', ['compile'], function() {
   console.log("Build task.");
});

gulp.task('default', ['build'], function() {
   console.log("Default task.");
});

gulp.task('watch', function() {
    gulp.watch('src/main/javascript/**/*.js', ['jshint']);
});

