import 'babel-polyfill';

import gulp from 'gulp';
import startServer from './src';

gulp.task('server', () =>
  startServer().listen(process.env.PORT || 3000));
