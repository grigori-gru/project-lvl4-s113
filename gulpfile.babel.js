import 'babel-polyfill';

// import repl from 'repl';
import gulp from 'gulp';
// import gutil from 'gulp-util';
import startServer from './src';

// gulp.task('console', () => {
//   gutil.log = gutil.noop;
//   const replServer = repl.start({
//     prompt: 'Application console > ',
//   });
//
//   Object.keys(container).forEach((key) => {
//     replServer.context[key] = container[key];
//   });
// });

gulp.task('server', () =>
  startServer().listen(process.env.PORT || 3000));
