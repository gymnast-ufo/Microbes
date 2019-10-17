import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import PATH from './path';

const images = () => {
	return gulp.src(PATH.src.images)
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(gulp.dest(PATH.dest.images));
};

const imagesWatch = () => {
  gulp.watch(PATH.watch.images, ['images']);
};

export { images, imagesWatch };