import Koa from 'koa';
import Router from 'koa-router';
import Rollbar from "rollbar";

const app = new Koa();
const router = new Router();

// include and initialize the rollbar library with your access token
const rollbar = new Rollbar("8af6d3888b364772abefb2b4241d98f3");

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

router.get('/', async (ctx) => {
  ctx.body = 'Router World';
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3000;
app.use(rollbar.errorHandler("8af6d3888b364772abefb2b4241d98f3"));

app.listen(3000);
