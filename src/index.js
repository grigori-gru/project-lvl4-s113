import 'babel-polyfill';

import middleware from 'koa-webpack';
import Koa from 'koa';
import Pug from 'koa-pug';
import Router from 'koa-router';
import Rollbar from 'rollbar';
import path from 'path';

import getWebpackConfig from '../webpack.config.babel';

export default () => {
  const app = new Koa();

  if (process.env.NODE_ENV !== 'test') {
    app.use(middleware({
      config: getWebpackConfig(),
    }));
  }

  const router = new Router();

  const pug = new Pug({
    viewPath: path.join(__dirname, './views'),
  });

  pug.use(app);

  router.get('/', async (ctx) => {
    ctx.render('index');
  });

  app.use(router.routes()).use(router.allowedMethods());

  const rollbar = new Rollbar('8af6d3888b364772abefb2b4241d98f3');
  rollbar.log('Hello world!');

  app.use(rollbar.errorHandler('8af6d3888b364772abefb2b4241d98f3'));

  return app;
};
