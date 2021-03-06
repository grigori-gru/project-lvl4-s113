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
import flash from 'koa-flash-simple';
import koaLogger from 'koa-logger';
import _ from 'lodash';

import getWebpackConfig from '../webpack.config.babel';
import getRoutes from './controllers';
import container from './container';

dotenv.config();

export default () => {
  const app = new Koa();

  app.keys = ['session secret'];
  app.use(session(app));
  app.use(flash());
  app.use(async (ctx, next) => {
    ctx.state = {
      flash: ctx.flash,
      signedId: ctx.session.id || false,
      signedEmail: ctx.session.email || false,
    };
    await next();
  });
  app.use(bodyParser());
  app.use(methodOverride((req) => {
    // return req?.body?._method;
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      return req.body._method; // eslint-disable-line
    }
    return null;
  }));

  if (process.env.NODE_ENV !== 'test') {
    app.use(middleware({
      config: getWebpackConfig(),
    }));
  }

  app.use(koaLogger());
  const router = new Router();

  const pug = new Pug({
    viewPath: path.join(__dirname, './views'),
    debug: true,
    pretty: true,
    compileDebug: true,
    locals: [],
    basedir: path.join(__dirname, 'views'),
    helperPath: [
      { _ },
      { urlFor: (...args) => router.url(...args) },
    ],
  });

  pug.use(app);
  getRoutes(router, container);

  app.use(router.routes()).use(router.allowedMethods());
  const rollbarAccessToken = process.env.POST_SERVER_ITEM_ACCESS_TOKEN;

  const rollbar = new Rollbar(rollbarAccessToken);

  app.use(rollbar.errorHandler(rollbarAccessToken));

  rollbar.log('Hello world!');

  return app;
};
