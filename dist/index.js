'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

require('babel-polyfill');

var _koaWebpack = require('koa-webpack');

var _koaWebpack2 = _interopRequireDefault(_koaWebpack);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaPug = require('koa-pug');

var _koaPug2 = _interopRequireDefault(_koaPug);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _rollbar = require('rollbar');

var _rollbar2 = _interopRequireDefault(_rollbar);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpackConfig = require('../webpack.config.babel');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var app = new _koa2.default();

  if (process.env.NODE_ENV !== 'test') {
    app.use((0, _koaWebpack2.default)({
      config: (0, _webpackConfig2.default)()
    }));
  }

  var router = new _koaRouter2.default();

  var pug = new _koaPug2.default({
    viewPath: _path2.default.join(__dirname, './views')
  });

  pug.use(app);

  router.get('/', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ctx.render('index');

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());

  app.use(router.routes()).use(router.allowedMethods());

  var rollbar = new _rollbar2.default('8af6d3888b364772abefb2b4241d98f3');
  rollbar.log('Hello world!');

  app.use(rollbar.errorHandler('8af6d3888b364772abefb2b4241d98f3'));

  return app;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJhcHAiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJ1c2UiLCJjb25maWciLCJyb3V0ZXIiLCJwdWciLCJ2aWV3UGF0aCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJnZXQiLCJjdHgiLCJyZW5kZXIiLCJyb3V0ZXMiLCJhbGxvd2VkTWV0aG9kcyIsInJvbGxiYXIiLCJsb2ciLCJlcnJvckhhbmRsZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztrQkFFZSxZQUFNO0FBQ25CLE1BQU1BLE1BQU0sbUJBQVo7O0FBRUEsTUFBSUMsUUFBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLE1BQTdCLEVBQXFDO0FBQ25DSCxRQUFJSSxHQUFKLENBQVEsMEJBQVc7QUFDakJDLGNBQVE7QUFEUyxLQUFYLENBQVI7QUFHRDs7QUFFRCxNQUFNQyxTQUFTLHlCQUFmOztBQUVBLE1BQU1DLE1BQU0scUJBQVE7QUFDbEJDLGNBQVUsZUFBS0MsSUFBTCxDQUFVQyxTQUFWLEVBQXFCLFNBQXJCO0FBRFEsR0FBUixDQUFaOztBQUlBSCxNQUFJSCxHQUFKLENBQVFKLEdBQVI7O0FBRUFNLFNBQU9LLEdBQVAsQ0FBVyxHQUFYO0FBQUEsMEVBQWdCLGlCQUFPQyxHQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDZEEsa0JBQUlDLE1BQUosQ0FBVyxPQUFYOztBQURjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQWhCOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUlBYixNQUFJSSxHQUFKLENBQVFFLE9BQU9RLE1BQVAsRUFBUixFQUF5QlYsR0FBekIsQ0FBNkJFLE9BQU9TLGNBQVAsRUFBN0I7O0FBRUEsTUFBTUMsVUFBVSxzQkFBWSxrQ0FBWixDQUFoQjtBQUNBQSxVQUFRQyxHQUFSLENBQVksY0FBWjs7QUFFQWpCLE1BQUlJLEdBQUosQ0FBUVksUUFBUUUsWUFBUixDQUFxQixrQ0FBckIsQ0FBUjs7QUFFQSxTQUFPbEIsR0FBUDtBQUNELEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJztcblxuaW1wb3J0IG1pZGRsZXdhcmUgZnJvbSAna29hLXdlYnBhY2snO1xuaW1wb3J0IEtvYSBmcm9tICdrb2EnO1xuaW1wb3J0IFB1ZyBmcm9tICdrb2EtcHVnJztcbmltcG9ydCBSb3V0ZXIgZnJvbSAna29hLXJvdXRlcic7XG5pbXBvcnQgUm9sbGJhciBmcm9tICdyb2xsYmFyJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgZ2V0V2VicGFja0NvbmZpZyBmcm9tICcuLi93ZWJwYWNrLmNvbmZpZy5iYWJlbCc7XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgY29uc3QgYXBwID0gbmV3IEtvYSgpO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Rlc3QnKSB7XG4gICAgYXBwLnVzZShtaWRkbGV3YXJlKHtcbiAgICAgIGNvbmZpZzogZ2V0V2VicGFja0NvbmZpZygpLFxuICAgIH0pKTtcbiAgfVxuXG4gIGNvbnN0IHJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcblxuICBjb25zdCBwdWcgPSBuZXcgUHVnKHtcbiAgICB2aWV3UGF0aDogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vdmlld3MnKSxcbiAgfSk7XG5cbiAgcHVnLnVzZShhcHApO1xuXG4gIHJvdXRlci5nZXQoJy8nLCBhc3luYyAoY3R4KSA9PiB7XG4gICAgY3R4LnJlbmRlcignaW5kZXgnKTtcbiAgfSk7XG5cbiAgYXBwLnVzZShyb3V0ZXIucm91dGVzKCkpLnVzZShyb3V0ZXIuYWxsb3dlZE1ldGhvZHMoKSk7XG5cbiAgY29uc3Qgcm9sbGJhciA9IG5ldyBSb2xsYmFyKCc4YWY2ZDM4ODhiMzY0NzcyYWJlZmIyYjQyNDFkOThmMycpO1xuICByb2xsYmFyLmxvZygnSGVsbG8gd29ybGQhJyk7XG5cbiAgYXBwLnVzZShyb2xsYmFyLmVycm9ySGFuZGxlcignOGFmNmQzODg4YjM2NDc3MmFiZWZiMmI0MjQxZDk4ZjMnKSk7XG5cbiAgcmV0dXJuIGFwcDtcbn07XG4iXX0=