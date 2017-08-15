import 'babel-polyfill';

import middleware from 'koa-webpack';
import Koa from 'koa';
import Pug from 'koa-pug';
import Router from 'koa-router';
import Rollbar from 'rollbar';
import path from 'path';
import dotenv from 'dotenv';

import getWebpackConfig from '../webpack.config.babel';

dotenv.config();

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
  const rollbarAccessToken = process.env.POST_SERVER_ITEM_ACCESS_TOKEN;

  const rollbar = new Rollbar(rollbarAccessToken);
  rollbar.log('Hello world!');

  app.use(rollbar.errorHandler(rollbarAccessToken));

  return app;
};
