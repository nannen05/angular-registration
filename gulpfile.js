var gulp = require('gulp'),
	bower = require('gulp-bower'),
	wiredep = require('wiredep').stream,
	connect = require('gulp-connect');

var config = {
	bowerDir: './bower_components'
}

gulp.task('wiredep', function () {
  gulp.src('app/*.html')
    .pipe(wiredep())
    .pipe(gulp.dest('app'));
});

gulp.task('connect', function () {
	connect.server({
		root: 'app',
		livereload:true,
		middleware: function(connect) {
        return [connect().use('/bower_components', connect.static('bower_components'))];
    	}
	});
});

gulp.task('bower', function() {
	return bower()
		.pipe(gulp.dest(config.bowerDir))
		.pipe(connect.reload())
});

gulp.task('default', ['wiredep', 'bower', 'connect'])