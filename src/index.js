import 'babel-polyfill';

import bodyParser from 'koa-bodyparser';
import middleware from 'koa-webpack';
import Koa from 'koa';
import Rollbar from 'rollbar';
import path from 'path';
import dotenv from 'dotenv';
import Router from 'koa-router';
import Pug from 'koa-pug';
import methodOverride from 'koa-methodoverride';
import session from 'koa-generic-session';

import getWebpackConfig from '../webpack.config.babel';
import getRoutes from './controllers';

dotenv.config();

export default () => {
  const app = new Koa();

  app.keys = ['session secret'];
  app.use(session(app));
  app.use(bodyParser());
  app.use(methodOverride('_method'));
  app.use(async (ctx, next) => {
    ctx.state = {
      isSignedIn: () => ctx.session.id !== undefined,
    };
    await next();
  });

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
  getRoutes(router);

  app.use(router.routes()).use(router.allowedMethods());
  const rollbarAccessToken = process.env.POST_SERVER_ITEM_ACCESS_TOKEN;

  const rollbar = new Rollbar(rollbarAccessToken);

  app.use(rollbar.errorHandler(rollbarAccessToken));

  rollbar.log('Hello world!');

  return app;
};
