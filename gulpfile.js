var gulp = require('gulp');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');

gulp.task('concat:js', function() {
	return gulp.src([
			'src/AppBundle/Resources/js/**/*.module.js',
			'src/AppBundle/Resources/js/**/*.js'
		])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./web/assets/js/'))
		;
});

gulp.task('concat:html', function() {
	return gulp.src('src/AppBundle/Resources/js/*.html')
		.pipe(templateCache({standalone: true}))
		.pipe(gulp.dest('./web/assets/templates/'))
		;
});

gulp.task('watch', function() {
	gulp.watch('src/AppBundle/Resources/js/**/*.js', ['concat:js']);
	gulp.watch('src/AppBundle/Resources/js/**/*.html', ['concat:html']);
});

gulp.task('default', ['concat', 'watch']);
gulp.task('concat', ['concat:js', 'concat:html']);
