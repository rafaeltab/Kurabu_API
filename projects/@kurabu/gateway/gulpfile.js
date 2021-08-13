var gulp = require('gulp');
var install = require('gulp-install');
var tsconfig = require("./tsconfig.json");
var fs = require('fs');
var path = require('path');
var chug = require('gulp-chug')
var merge = require('merge-stream');

const PROD_DEST = '../../../build/ts/projects/@kurabu/gateway';

gulp.task('default', function () {
    var gulps = []
    gulps.push(
        gulp.src(['./package.json'])
        .pipe(gulp.dest(PROD_DEST))
        .pipe(install({
            args: ['--production']
        }))
    );

    gulps.push(
        gulp.src(['./tsconfig.json'])
        .pipe(gulp.dest(PROD_DEST))
    );

    for (let ref = 0; ref < tsconfig.references.length; ref++) {
        const reference = tsconfig.references[ref].path;
        var stats = fs.statSync(reference);
        var dir = "";
        if (stats.isDirectory()) dir = reference;
        else dir = path.dirname(reference);
        dir = dir.endsWith("/") || dir.endsWith("\\") ? dir : dir + "/";
        if (fs.existsSync(dir + "gulpfile.js")) {
            gulps.push(
                gulp.src(dir + "gulpfile.js")
                    .pipe(chug())
            )
        }
    }

    return merge(...gulps);
});